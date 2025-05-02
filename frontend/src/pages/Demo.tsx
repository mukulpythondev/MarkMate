
import React from 'react';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Request a Demo</h1>
          <p className="text-lg text-gray-600">
            See how MarkMate can transform your grading process and save you valuable time.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="John" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Doe" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Work Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="john.doe@school.edu" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="institution" className="block text-sm font-medium">Institution Name</label>
              <input 
                type="text" 
                id="institution" 
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="State University" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium">Your Role</label>
              <select 
                id="role" 
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
              >
                <option value="" disabled selected>Select your role</option>
                <option value="teacher">Teacher</option>
                <option value="department-head">Department Head</option>
                <option value="administrator">Administrator</option>
                <option value="it">IT Manager</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">What are you most interested in?</label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Tell us what you're looking for in a grading solution..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#84b817] hover:bg-[#729e13] text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Request Your Demo
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Demo;
