
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">
          Mark<span className="font-extrabold text-[#84b817]">Mate</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/demo" className="hover:text-gray-600 transition-colors">Request a demo</Link>
        <Link to="/product" className="hover:text-gray-600 transition-colors">Product</Link>
        <Link to="/students" className="hover:text-gray-600 transition-colors">Students</Link>
        <Link to="/login" className="hover:text-gray-600 transition-colors">Login</Link>
        <Button className="bg-dark1 text-white hover:bg-opacity-80 px-5 py-2 rounded-lg">
          Get MarkMate Free
        </Button>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg rounded-b-lg p-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link to="/demo" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Request a demo</Link>
            <Link to="/product" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Product</Link>
            <Link to="/students" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Students</Link>
            <Link to="/login" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>Login</Link>
            <Button className="w-full bg-dark1 text-white hover:bg-opacity-80 rounded-lg">
              Get MarkMate Free
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
