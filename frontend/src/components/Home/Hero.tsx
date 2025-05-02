
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center py-12 md:py-24 px-6 md:px-12">
      <div className="w-full md:w-1/2 md:pr-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Less Time on Paperwork.
          <br />
          More Time on <span className="highlight-text">Teaching.</span>
        </h1>
        
        <p className="text-lg mb-8">
          Our Platform Helps Teachers to Automate 
          Repetitive Tasks like Grading Exams/Assignments
          and Generating Student Performance Reports
          using AI.
        </p>
        
        <Button className="dark-button text-lg">
          Get Started
        </Button>
      </div>
      
      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        <div className="relative">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-accent1 rounded-full opacity-20"></div>
          <div className="relative z-10 hero-animation">
            <div className="animation-container">
              <div className="floating-docs">
                <div className="doc doc1"></div>
                <div className="doc doc2"></div>
                <div className="doc doc3"></div>
              </div>
              <div className="tech-circles">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
              </div>
              <div className="progress-bars">
                <div className="bar bar1"><div className="fill"></div></div>
                <div className="bar bar2"><div className="fill"></div></div>
                <div className="bar bar3"><div className="fill"></div></div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent1 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
