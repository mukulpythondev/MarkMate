
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark1 text-white py-12 px-6 md:px-12 mt-12">
      <div className="flex flex-col md:flex-row justify-between mb-12">
        <div className="mb-8 md:mb-0">
          <Link to="/" className="text-2xl font-bold">
            Mark<span className="font-extrabold text-[#84b817]">Mate</span>
          </Link>
          
          <div className="mt-8">
            <div className="feature-badge bg-accent1 text-black inline-block mb-4">
              Contact us:
            </div>
            <p className="mb-2">Email: help@markmate.com</p>
            <p className="mb-2">Phone: 9876543210</p>
            <p>
              Address: 1234 Main St<br />
              Education City, Earth, 12345
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          <div>
            <Link to="/about" className="block mb-3 hover:text-gray-300 transition-colors">About us</Link>
            <Link to="/services" className="block mb-3 hover:text-gray-300 transition-colors">Services</Link>
            <Link to="/use-cases" className="block mb-3 hover:text-gray-300 transition-colors">Use Cases</Link>
            <Link to="/pricing" className="block mb-3 hover:text-gray-300 transition-colors">Pricing</Link>
            <Link to="/blog" className="block hover:text-gray-300 transition-colors">Blog</Link>
          </div>
          
          <div className="col-span-2">
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Email" 
                className="rounded-r-none bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-accent1 text-black rounded-l-none">
                Subscribe newsletter
              </Button>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <div>© 2025 MarkMate. All Rights Reserved.</div>
        <div className="mt-4 md:mt-0">
          <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
