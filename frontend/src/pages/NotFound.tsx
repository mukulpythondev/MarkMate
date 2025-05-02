
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 text-6xl font-bold">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Button 
            className="bg-accent1 text-dark1 font-medium px-6 py-3 rounded-md"
            onClick={() => navigate('/')}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
