
import React from 'react';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

const Students = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">For Students, By Students</h1>
              <p className="text-xl text-gray-600 mb-8">
                MarkMate helps you understand your grades better and track your progress to academic success.
              </p>
              <button className="bg-[#84b817] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#729e13] transition-colors">
                Get Started Free
              </button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">How Students Benefit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-14 h-14 bg-[#84b817] bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#84b817]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Performance Dashboard</h3>
                  <p className="text-gray-600">
                    See your grades across subjects in one intuitive dashboard. Track progress, identify strengths, and focus on areas needing improvement.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-14 h-14 bg-[#84b817] bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#84b817]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
                  <p className="text-gray-600">
                    Get immediate results and detailed feedback on your assignments. Understand where you made mistakes and how to improve.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-14 h-14 bg-[#84b817] bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#84b817]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Due Date Reminders</h3>
                  <p className="text-gray-600">
                    Never miss an assignment again with smart reminders and notifications about upcoming due dates and pending work.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-14 h-14 bg-[#84b817] bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#84b817]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Study Resources</h3>
                  <p className="text-gray-600">
                    Access personalized study resources and recommendations based on your performance data to focus your studying where it matters most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">What Students Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Emily Johnson</h4>
                    <p className="text-sm text-gray-500">Computer Science Major</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "MarkMate has helped me stay on top of all my assignments. The grade tracking is incredibly helpful for planning my study time effectively."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Biology Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The feedback I get from my professors through MarkMate is much more detailed than before. I can actually understand where I went wrong and how to improve."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sophia Martinez</h4>
                    <p className="text-sm text-gray-500">Business Administration</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a student with multiple deadlines, the notification system is a lifesaver. I no longer miss assignments or have last-minute rushes to complete work."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#84b817]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to improve your academic performance?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are using MarkMate to track their progress and improve their grades.
            </p>
            <button className="bg-white text-[#84b817] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Sign Up Free
            </button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Students;
