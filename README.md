# 🧠 MarkMate – AI-Powered Teacher Assistant
        - Let Teacher teach we will do rest

MarkMate is a smart, AI-powered platform built for educators to automate the evaluation of handwritten answer sheets using OCR, NLP, and Retrieval-Augmented Generation (RAG). It streamlines the grading process, saving time and ensuring consistent, instant feedback for students.

---

## 🎥 Demo Video

📺 [Watch Demo Video](https://your-demo-video-link.com)  
🛠 Built for: **Sprint Hack 3.0**

---

## ✨ Key Features

- 📄 Upload handwritten answer sheets, notes, and question papers
- 🧠 AI evaluates answers using RAG & LLM (Gemini/OpenAI)
- 📝 Instant score and detailed feedback generation
- 🔒 Role-based login: Teacher & Student
- 🎯 Track submissions using roll numbers
- 🧾 Submission history dashboard
- 🚫 No third-party storage (e.g., Cloudinary) – direct file handling

---

## 🛠 Tech Stack

| Layer        | Tech                           |
|--------------|--------------------------------|
| Frontend     | React.js, Tailwind CSS, Axios  |
| Backend API  | Node.js, Express, MongoDB      |
| AI Engine    | Python, FastAPI, OCR, Gemini/OpenAI |
| File Upload  | Multer (local handling)        |
| Auth         | JWT (Role-based protection)    |

---

## 🔗 Workflow Diagram

1. Student uploads:
    - Notes PDF
    - Question Paper
    - Answer Sheet Image
    - Roll Number
2. Backend receives all files using `Multer`
3. Backend sends the files to FastAPI via `FormData`
4. FastAPI:
    - Extracts text via OCR
    - Compares answer using embeddings + notes
    - Scores & generates feedback
5. Node backend stores submission in MongoDB
6. Frontend shows result to student

---

## 📦 Project Structure

```

MarkMate/
├── client/             # React frontend
├── server/             # Node.js backend
├── ai-engine/          # FastAPI server (Python)
├── README.md

````

---

## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mukulpythondev/MarkMate.git
cd MarkMate
````

---

### 2. Start AI Engine (FastAPI)

```bash
cd ai-engine
python -m venv venv
source venv/bin/activate    # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Start Backend (Node.js)

```bash
cd server
npm install
cp .env.example .env        # Fill in JWT_SECRET, MONGO_URI
npm start
```

---

### 4. Start Frontend (React)

```bash
cd client
npm install
npm run dev
```


## 🔐 Authentication & Roles

* **Student**:

  * Upload answers
  * View feedback & history

* **Teacher**:

  * View all student submissions
  * Manage class/tests

---


## 🤖 AI Evaluation Process

* OCR: Extracts answer text from image (Tesseract or EasyOCR)
* Embedding: Notes and answer are converted to vector embeddings
* Similarity: RAG-style matching with notes for scoring
* LLM (Gemini/OpenAI): Generates personalized feedback

---

## 📸 Screenshots
## Home
![Screenshot from 2025-05-03 11-45-48](https://github.com/user-attachments/assets/444f694c-c823-4940-bb2d-100c9b2545f4)

![Screenshot from 2025-05-03 11-46-58](https://github.com/user-attachments/assets/83f05622-ffac-47f7-93e9-a650e394553a)

## Upload Screen
>![image](https://github.com/user-attachments/assets/fdf705fe-a3a0-44e0-acc3-b31d0c1d6fa0)

## Student Dashboard
![image](https://github.com/user-attachments/assets/bd92c37a-bf98-43c5-86a1-c51fbb3d988c)

---

## 📬 Team & Submission Info

> Built for **SprintHack 3.0**
> Submitted by:

* 👨‍💻 **Mukul Rana** – Full Stack Developer, AI Integration
* 🧑‍💻 **Manideep Bishnoi** - Frontend Developer
* 🧑‍💻 **Shubhanshi Chaudhary** - UI/UX & Frontend Dev
  

📧 Email: [mukulpythondev@gmail.com](mailto:mukulrana.dev@gmail.com)
🔗 LinkedIn: [linkedin.com/in/mukulrana-webdev](https://linkedin.com/in/mukulrana-webdev)

---

## ✅ Submission Checklist

* [x] Frontend UI & auth completed
* [x] Backend APIs & MongoDB integration
* [x] AI evaluation with OCR and embeddings
* [x] File upload handled without Cloudinary
* [x] Role-based dashboards (student/teacher)
* [x] Video demo linked


## ⭐ Final Notes

MarkMate empowers educators by automating a traditionally manual process using AI. It bridges the gap between paper-based exams and digital grading, reducing workload while improving accuracy and transparency.

> If you like this project, give it a ⭐ on GitHub
