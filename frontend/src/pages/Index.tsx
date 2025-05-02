
import React from 'react';
import Navbar from '@/components/Home/Navbar';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import Testimonials from '@/components/Home/Testimonials';
import Faqs from '@/components/Home/Faqs';
import Contact from '@/components/Home/Contact';
import Footer from '@/components/Home/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        <Hero />
        <Features />
        <Testimonials />
        <Faqs />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
