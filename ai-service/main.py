from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from langchain_qdrant import QdrantVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from dotenv import load_dotenv
import pdfplumber
import os
import io
import logging
import pytesseract
from PIL import Image
import pdf2image
import time
import uuid

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(title="MarkMate - Student Answer Evaluation System")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---

class EvaluationResult(BaseModel):
    score: int = Field(description="Score out of 20")
    explanation: str = Field(description="Brief explanation of the score")
    suggestions: List[str] = Field(description="Suggestions for improvement")

class ProcessingStatus(BaseModel):
    job_id: str
    status: str
    message: str

class EvaluationResponse(BaseModel):
    job_id: str
    evaluation: Optional[EvaluationResult] = None
    status: str
    error: Optional[str] = None
    extracted_question_text: Optional[str] = None
    extracted_answer_text: Optional[str] = None

# --- Configuration ---

COLLECTION_NAME = "notes-collection"
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# --- Dependency Injection ---

def get_embeddings():
    try:
        return OpenAIEmbeddings(
            model="text-embedding-3-large",
            api_key=os.getenv("OPENAI_API_KEY")
        )
    except Exception as e:
        logger.error(f"Failed to initialize embeddings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initialize embedding model")

def get_llm():
    try:
        return ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )
    except Exception as e:
        logger.error(f"Failed to initialize LLM: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initialize language model")

def get_vector_store(embeddings=Depends(get_embeddings)):
    try:
        return QdrantVectorStore.from_existing_collection(
            url=QDRANT_URL,
            collection_name=COLLECTION_NAME,
            embedding=embeddings
        )
    except Exception as e:
        logger.error(f"Failed to connect to vector store: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Failed to connect to the vector database. Make sure it's running and the collection exists."
        )

# --- Background tasks storage ---
evaluation_jobs = {}

# --- Utility Functions ---

def extract_text_from_pdf(file_bytes, force_ocr=False):
    """Extract text from PDF using pdfplumber with option to force OCR"""
    try:
        # Try normal text extraction first (unless force_ocr is True)
        if not force_ocr:
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                text = "\n".join([page.extract_text() or "" for page in pdf.pages])
            
            # If decent amount of text was extracted, return it
            if len(text.strip()) > 100:
                logger.info(f"Extracted {len(text)} characters using pdfplumber")
                return text
        
        # For scanned PDFs or if text extraction yielded minimal results or if forced
        logger.info("Using OCR for text extraction")
        return extract_text_with_ocr(file_bytes)
        
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {str(e)}")
        raise HTTPException(status_code=422, detail=f"Failed to extract text from PDF: {str(e)}")

def extract_text_with_ocr(file_bytes):
    """Extract text from scanned PDF using OCR with improved settings for handwriting"""
    try:
        # Convert PDF to images
        images = pdf2image.convert_from_bytes(file_bytes)
        
        # Extract text from each image using OCR
        text_parts = []
        for img in images:
            # Pre-process image for better OCR results
            # For handwritten text, we can try different OCR configurations
            # Default configuration
            text = pytesseract.image_to_string(img)
            
            # If the text is very short, try with different OCR configurations
            if len(text.strip()) < 50:
                # Try with different PSM modes (Page Segmentation Modes)
                # PSM 6: Assume a single uniform block of text
                text_alt1 = pytesseract.image_to_string(
                    img, 
                    config='--psm 6'
                )
                
                # PSM 3: Fully automatic page segmentation, but no OSD
                text_alt2 = pytesseract.image_to_string(
                    img, 
                    config='--psm 3'
                )
                
                # Use the longest text as it might have captured more content
                candidates = [text, text_alt1, text_alt2]
                text = max(candidates, key=lambda x: len(x.strip()))
            
            text_parts.append(text)
            
            # Log the extracted text for debugging
            logger.info(f"OCR extracted text (length: {len(text)}): {text[:100]}...")
        
        full_text = "\n".join(text_parts)
        logger.info(f"Total OCR extracted text length: {len(full_text)}")
        return full_text
    except Exception as e:
        logger.error(f"OCR extraction failed: {str(e)}")
        raise HTTPException(status_code=422, detail=f"OCR text extraction failed: {str(e)}")

def chunk_text(text, chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP):
    """Split text into smaller chunks for processing"""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, 
        chunk_overlap=chunk_overlap
    )
    return splitter.split_text(text)

def create_evaluation_prompt(question_text, student_answer_text, context):
    """Create a prompt for evaluation with a structured output"""
    template = """
You are an expert educational evaluator with years of experience in grading student answers.
Evaluate the following student's answer based on the provided question and reference materials.

Question:
{question}

Student Answer:
{answer}

Reference Notes:
{context}

Evaluate the student's answer based on:
1. Accuracy - How factually correct is the answer based on the reference material?
2. Completeness - How thoroughly does the answer address all aspects of the question?
3. Clarity - How well-organized and clearly explained is the answer?

Please provide:
1. A score out of 20
2. A brief explanation of the score (2-3 lines)
3. Specific suggestions for improvement

{format_instructions}
"""
    
    parser = PydanticOutputParser(pydantic_object=EvaluationResult)
    
    prompt = PromptTemplate(
        template=template,
        input_variables=["question", "answer", "context"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )
    
    return prompt.format(
        question=question_text,
        answer=student_answer_text,
        context=context
    ), parser

# --- Additional Endpoints for Debugging ---

@app.post("/extract-text", response_model=Dict[str, str])
async def extract_text(
    file: UploadFile = File(...),
    force_ocr: bool = Form(False, description="Force OCR extraction")
):
    """Extract text from a PDF file and return it for inspection"""
    try:
        content = await file.read()
        text = extract_text_from_pdf(content, force_ocr=force_ocr)
        
        return {
            "filename": file.filename,
            "extracted_text": text,
            "text_length": str(len(text)),
            "extraction_method": "OCR" if force_ocr or len(text.strip()) < 100 else "pdfplumber"
        }
    except Exception as e:
        logger.error(f"Text extraction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

# --- Main Endpoints ---

@app.post("/upload-notes", response_model=ProcessingStatus)
async def upload_notes(
    file: UploadFile = File(...),
    embeddings=Depends(get_embeddings)
):
    """Upload and embed PDF notes"""
    try:
        start_time = time.time()
        content = await file.read()
        
        logger.info(f"Extracting text from notes: {file.filename}")
        text = extract_text_from_pdf(content)
        
        if not text.strip():
            raise HTTPException(status_code=422, detail="No text could be extracted from the PDF")
        
        logger.info(f"Chunking extracted text ({len(text)} characters)")
        chunks = chunk_text(text)
        
        if not chunks:
            raise HTTPException(status_code=422, detail="Failed to create text chunks")
        
        logger.info(f"Creating {len(chunks)} document chunks")
        docs = [Document(page_content=chunk, metadata={"source": file.filename}) for chunk in chunks]
        
        logger.info("Embedding documents in vector store")
        QdrantVectorStore.from_documents(
            documents=docs,
            embedding=embeddings,
            url=QDRANT_URL,
            collection_name=COLLECTION_NAME
        )
        
        processing_time = time.time() - start_time
        return ProcessingStatus(
            job_id=str(uuid.uuid4()),
            status="completed",
            message=f"Notes uploaded and embedded successfully. Processed {len(chunks)} chunks in {processing_time:.2f}s"
        )
    
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to upload notes: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to upload notes: {str(e)}")

@app.post("/evaluate", response_model=ProcessingStatus)
async def evaluate(
    question_paper: UploadFile = File(...),
    answer_sheet: UploadFile = File(...),
    force_ocr: bool = Form(False, description="Force OCR for text extraction even for digital PDFs"),
    embeddings=Depends(get_embeddings),
    llm=Depends(get_llm)
):
    """Evaluate a student's answer sheet against a question paper and reference notes"""
    try:
        # Generate job ID
        job_id = str(uuid.uuid4())
        
        # Store initial status
        evaluation_jobs[job_id] = {
            "status": "processing",
            "message": "Starting evaluation process"
        }
        
        # Read files
        question_content = await question_paper.read()
        answer_content = await answer_sheet.read()
        
        # Start background processing
        # In a real application, this would be a background task
        # For simplicity, we're doing it in the request
        try:
            # Extract question and student answer
            logger.info("Extracting text from question paper")
            evaluation_jobs[job_id]["message"] = "Extracting text from question paper"
            question_text = extract_text_from_pdf(question_content, force_ocr=force_ocr)
            
            logger.info("Extracting text from answer sheet")
            evaluation_jobs[job_id]["message"] = "Extracting text from answer sheet" 
            # For answer sheets, which are more likely to be handwritten, consider using force_ocr
            student_answer_text = extract_text_from_pdf(answer_content, force_ocr=True)
            
            # Get context from notes
            logger.info("Retrieving relevant context from notes")
            evaluation_jobs[job_id]["message"] = "Retrieving relevant context from notes"
            
            retriever = QdrantVectorStore.from_existing_collection(
                url=QDRANT_URL,
                collection_name=COLLECTION_NAME,
                embedding=embeddings
            )
            
            context_docs = retriever.similarity_search(question_text, k=5)
            context = "\n".join([doc.page_content for doc in context_docs])
            
            # Construct prompt and parse output
            logger.info("Generating evaluation")
            evaluation_jobs[job_id]["message"] = "Generating evaluation"
            
            prompt, parser = create_evaluation_prompt(question_text, student_answer_text, context)
            response = llm.invoke(prompt)
            
            try:
                evaluation_result = parser.parse(response.content)
                evaluation_jobs[job_id] = {
                    "status": "completed",
                    "evaluation": evaluation_result.model_dump(),
                    "message": "Evaluation completed successfully",
                    "extracted_question_text": question_text,
                    "extracted_answer_text": student_answer_text
                }
            except Exception as parse_error:
                logger.error(f"Failed to parse LLM response: {str(parse_error)}")
                logger.debug(f"Raw LLM response: {response.content}")
                
                # Fall back to unstructured response
                evaluation_jobs[job_id] = {
                    "status": "completed",
                    "raw_evaluation": response.content,
                    "message": "Evaluation completed but couldn't be structured properly",
                    "extracted_question_text": question_text,
                    "extracted_answer_text": student_answer_text
                }
            
        except Exception as process_error:
            logger.error(f"Error during evaluation process: {str(process_error)}")
            evaluation_jobs[job_id] = {
                "status": "failed",
                "error": str(process_error),
                "message": "Evaluation process failed"
            }
        
        return ProcessingStatus(
            job_id=job_id,
            status="processing",
            message="Evaluation job submitted. Check status with /evaluation-status endpoint."
        )
        
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to submit evaluation job: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to submit evaluation: {str(e)}")

@app.get("/evaluation-status/{job_id}", response_model=EvaluationResponse)
async def evaluation_status(job_id: str, include_extracted_text: bool = Query(True, description="Include extracted text in response")):
    """Check the status of an evaluation job"""
    if job_id not in evaluation_jobs:
        raise HTTPException(status_code=404, detail="Evaluation job not found")
    
    job = evaluation_jobs[job_id]
    
    # Create response with or without extracted text based on query parameter
    response_data = {
        "job_id": job_id,
        "evaluation": job.get("evaluation"),
        "status": job["status"],
        "error": job.get("error")
    }
    
    if include_extracted_text:
        response_data["extracted_question_text"] = job.get("extracted_question_text")
        response_data["extracted_answer_text"] = job.get("extracted_answer_text")
    
    return EvaluationResponse(**response_data)

@app.get("/ask", response_model=Dict[str, str])
async def ask_question(
    query: str = Query(..., description="Question to ask about the notes"),
    vector_store=Depends(get_vector_store),
    llm=Depends(get_llm)
):
    """Ask a question about the embedded notes"""
    try:
        docs = vector_store.similarity_search(query, k=5)
        
        if not docs:
            return {"response": "I couldn't find any relevant information in the notes to answer your question."}
        
        context = "\n".join([doc.page_content for doc in docs])
        
        prompt = f"""
Use the following reference notes to answer the question. If the question can't be answered based on the provided context, say so clearly.

Reference Notes:
{context}

Question: {query}

Answer:
"""
        
        response = llm.invoke(prompt)
        return {"response": response.content}
        
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Failed to process question: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process question: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)