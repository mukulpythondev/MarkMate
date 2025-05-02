
import React, { useState, useCallback } from 'react';
import { CloudUpload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFiles = useCallback((files: FileList) => {
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const validFiles = Array.from(files).filter(file => validFileTypes.includes(file.type));
    
    if (validFiles.length === 0) {
      toast.error("Please select valid files (JPEG, JPG, PNG, PDF)");
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            toast.success(`Successfully uploaded ${validFiles.length} file(s)`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, []);

  const browseFiles = () => {
    const fileInput = document.getElementById('file-input');
    fileInput?.click();
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-8">Upload New Exam Sheets</h2>
      <div 
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          isUploading ? "pointer-events-none" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!isUploading ? (
          <>
            <div className="rounded-full bg-gray-100 p-4 mb-4">
              <CloudUpload className="h-12 w-12 text-gray-400" />
            </div>
            <p className="mb-2 text-lg">
              Drag & Drop or <Button variant="link" className="text-blue-500 p-0" onClick={browseFiles}>browse</Button>
            </p>
            <p className="text-sm text-gray-500">Supports: JPEG, JPG, PNG, PDF</p>
            <input 
              id="file-input" 
              type="file" 
              className="hidden" 
              accept=".jpeg,.jpg,.png,.pdf"
              onChange={handleFileInput}
              multiple
            />
          </>
        ) : (
          <div className="w-full">
            <div className="text-center mb-4">Uploading...</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
