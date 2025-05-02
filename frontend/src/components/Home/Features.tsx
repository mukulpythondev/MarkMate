
import React from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, GraduationCap, Check, BarChart, FileText, PenTool } from 'lucide-react';

const FeatureCard = ({ 
  title, 
  icon: Icon, 
  buttonText, 
  buttonAction, 
  bgColor = "bg-white",
  forType
}: { 
  title: string; 
  icon: React.ElementType; 
  buttonText: string; 
  buttonAction: string; 
  bgColor?: string;
  forType: string;
}) => {
  return (
    <div className={`rounded-xl p-6 ${bgColor} h-full relative`}>
      <div className="feature-badge mb-3">{forType}</div>
      <h3 className="font-semibold text-lg mb-8">{title}</h3>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="flex items-center text-sm hover:bg-opacity-10"
        >
          <span className="mr-2">{buttonText}</span>
          <div className="w-8 h-8 bg-accent1 text-dark1 rounded-full flex items-center justify-center">
            <Icon size={16} />
          </div>
        </Button>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-12 md:py-24 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard 
          title="Handwriting to Text via OCR"
          icon={PenTool}
          buttonText="Try it Now"
          buttonAction="/try-ocr"
          forType="For Teachers"
        />
        
        <FeatureCard 
          title="AI-generated Analytics"
          icon={BarChart}
          buttonText="Login As Student"
          buttonAction="/student-login"
          forType="For Students"
        />
        
        <FeatureCard 
          title="AI Automatic Grading"
          icon={Check}
          buttonText="See Examples"
          buttonAction="/grading-examples"
          bgColor="bg-dark1 text-white"
          forType="For Teachers"
        />
        
        <FeatureCard 
          title="AI-Generated Feedback"
          icon={FileText}
          buttonText="Login As Student"
          buttonAction="/student-feedback"
          bgColor="bg-gray-100"
          forType="For Students"
        />
        
        <FeatureCard 
          title="Export Students Reports"
          icon={FileText}
          buttonText="See Dashboard"
          buttonAction="/reports-dashboard"
          bgColor="bg-accent1 bg-opacity-30"
          forType="For Teachers"
        />
        
        <FeatureCard 
          title="Practice MCQs, Quizzes"
          icon={GraduationCap}
          buttonText="View Examples"
          buttonAction="/quiz-examples"
          bgColor="bg-dark1 text-white"
          forType="For Students"
        />
      </div>
      
      <div className="mt-16 bg-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Let's make things happen</h3>
          <p className="text-gray-600">
            Contact us today to learn more about how our 
            platform can make your workflow more efficient.
          </p>
        </div>
        
        <Button className="dark-button mt-6 md:mt-0">
          Get a Free Call Back
        </Button>
      </div>
    </div>
  );
};

export default Features;
