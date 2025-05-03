import React, { useState } from 'react';
import { CloudUpload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function UploadSection({ classId, testId }: { classId: string; testId: string }) {
  const [uploadStatus, setUploadStatus] = useState({ notes: false, question: false, student: false });
  const [isUploading, setIsUploading] = useState({ notes: false });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ notes: 0, evaluate: 0 });

  const [rollNumber, setRollNumber] = useState('');
  const [files, setFiles] = useState<{ question: File | null; student: File | null }>({ question: null, student: null });
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  // Upload Notes immediately
  const handleNotesUpload = async (file: File) => {
    console.log('Uploading notes file:', file);
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(prev => ({ ...prev, notes: true }));
    setUploadProgress(prev => ({ ...prev, notes: 0 }));

    try {
      await axios.post('/eval/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e: ProgressEvent) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadProgress(prev => ({ ...prev, notes: percent }));
        },
      });
      toast.success('Notes uploaded successfully');
      setUploadStatus(prev => ({ ...prev, notes: true }));
    } catch (err) {
      console.error('Failed to upload notes:', err);
      toast.error('Failed to upload notes');
    } finally {
      setIsUploading(prev => ({ ...prev, notes: false }));
    }
  };

  // Store question and student files selections
  const handleFileSelect = (file: File, type: 'question' | 'student') => {
    console.log(`Selected ${type} file:`, file);
    setFiles(prev => ({ ...prev, [type]: file }));
    setUploadStatus(prev => ({ ...prev, [type]: true }));
    toast.success(`${type === 'question' ? 'Question paper' : 'Student sheet'} selected`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'notes' | 'question' | 'student') => {
    const file = e.target.files?.[0];
    console.log(`Input change for ${type}:`, file);
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid file (JPEG, PNG, PDF)');
      return;
    }

    if (type === 'notes') {
      handleNotesUpload(file);
    } else {
      handleFileSelect(file, type);
    }
  };

  // Evaluate: submit question+student, poll result, then create submission
  const handleEvaluate = async () => {
    if (!files.question || !files.student) {
      toast.error('Question paper and student sheet required');
      return;
    }

    setIsEvaluating(true);
    setUploadProgress(prev => ({ ...prev, evaluate: 0 }));
    toast.loading('Submitting evaluation...');

    try {
      // 1. Initial submit
      const submitForm = new FormData();
      submitForm.append('question_paper', files.question);
      submitForm.append('answer_sheet', files.student);
      submitForm.append('rollNumber', rollNumber);

      const submitResp = await axios.post('/eval/submit', submitForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e: ProgressEvent) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadProgress(prev => ({ ...prev, evaluate: percent }));
        },
      });
      const jobId = submitResp.data.job_id;
      toast.success('Evaluation job submitted');

      // 2. Fetch result
      const resultResp = await axios.get(`/eval/result/${jobId}`);
      const result = resultResp.data;
      setEvaluationResult(result);
      toast.success('Evaluation completed');

      // 3. Create submission record
      const payload = {
        classId,
        // testId,
        roll_no: rollNumber,
        score: result.evaluation.score,
        explanation: result.evaluation.explanation,
        aiFeedback: result.evaluation.suggestions,
        // extracted_question_text: result.extracted_question_text,
        ocrText: result.extracted_answer_text,
      };
      await axios.post('/submissions', payload);
      toast.success('Submission recorded');

      // Reset student selection
      setFiles(prev => ({ ...prev, student: null }));
      setUploadStatus(prev => ({ ...prev, student: false }));

    } catch (err) {
      console.error('Evaluation flow error:', err);
      toast.error('Evaluation failed');
    } finally {
      setIsEvaluating(false);
    }
  };

  const isEvaluateEnabled =
    !isEvaluating &&
    uploadStatus.notes &&
    files.question !== null &&
    files.student !== null &&
    rollNumber.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Notes Upload */}
      <UploadCard
        title="Upload Notes (One-time)"
        type="notes"
        isUploaded={uploadStatus.notes}
        isUploading={isUploading.notes}
        progress={uploadProgress.notes}
        onFileChange={handleFileInput}
        allowReupload={true}
      />

      {/* Question Paper Selection */}
      <UploadCard
        title="Upload Question Paper (One-time)"
        type="question"
        isUploaded={uploadStatus.question}
        isUploading={false}
        progress={0}
        onFileChange={handleFileInput}
        allowReupload={true}
      />

      {/* Student Sheet Selection */}
      <UploadCard
        title="Upload Student Answer Sheet"
        type="student"
        isUploaded={uploadStatus.student}
        isUploading={false}
        progress={0}
        onFileChange={handleFileInput}
        allowReupload={false}
      />

      {/* Roll Number Input */}
      <div>
        <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
          Student Roll Number
        </label>
        <div className="mt-1">
          <Input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={e => setRollNumber(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Evaluate Button */}
      <div className="pt-4">
        <Button disabled={!isEvaluateEnabled} onClick={handleEvaluate}>
          {isEvaluating ? `Evaluating... (${uploadProgress.evaluate}%)` : 'Evaluate'}
        </Button>
      </div>

      {evaluationResult && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <h4 className="text-xl font-semibold text-gray-800">Evaluation Report</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="text-sm text-gray-500">Score</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{evaluationResult.evaluation.score}/10</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Explanation</p>
              <p className="mt-1 text-gray-700">{evaluationResult.evaluation.explanation}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <span className="font-medium">Suggestions:</span>
            <span className="ml-2">{evaluationResult.evaluation.suggestions.length} items</span>
          </div>
        </div>
      )}
    </div>
  );
}
type UploadCardProps = {
  title: string;
  type: 'notes' | 'question' | 'student';
  isUploaded: boolean;
  isUploading: boolean;
  progress: number;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'notes' | 'question' | 'student'
  ) => void;
  allowReupload: boolean;
};

function UploadCard({ title, type, isUploaded, isUploading, progress, onFileChange, allowReupload }: UploadCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {!isUploading ? (
        <>
          <input
            id={`upload-${type}`}
            type="file"
            className="hidden"
            accept=".jpeg,.jpg,.png,.pdf"
            onChange={e => onFileChange(e, type)}
          />
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 border-gray-300">
            <CloudUpload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="mb-2 text-lg">{isUploaded ? 'File Selected' : 'Upload File'}</p>
            <p className="text-sm text-gray-500 mb-2">Supports: JPEG, JPG, PNG, PDF</p>
            <Button variant="outline" onClick={() => document.getElementById(`upload-${type}`)?.click()}>
              {isUploaded && allowReupload ? 'Replace File' : 'Choose File'}
            </Button>
          </div>
        </>
      ) : (
        <div>
          <p className="mb-2">Uploading...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
