
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqData = [
  {
    id: "01",
    question: "How does the AI grading system work?",
    answer: "During an initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. We use this info to understand your needs and tailor our services (linked to your requirements)."
  },
  {
    id: "02",
    question: "Is my students' data secure with GradeASSIST?",
    answer: "Yes, we take data security very seriously. All student data is encrypted and stored securely in compliance with FERPA and other education privacy regulations."
  },
  {
    id: "03",
    question: "Can I customize the grading criteria?",
    answer: "Absolutely. Our platform allows you to set custom rubrics and grading criteria that align with your teaching methodology and curriculum requirements."
  },
  {
    id: "04",
    question: "How accurate is the handwriting-to-text conversion?",
    answer: "Our OCR technology has a 95%+ accuracy rate for most handwriting styles. The system improves over time as it learns from corrections and adjustments."
  },
  {
    id: "05",
    question: "Do you offer training for teachers new to the platform?",
    answer: "Yes, we provide comprehensive onboarding and training sessions for all new users. Additionally, our help center has extensive resources and tutorials."
  },
  {
    id: "06",
    question: "Can GradeASSIST integrate with existing school management systems?",
    answer: "Yes, we offer integration capabilities with most popular LMS platforms and school management systems, ensuring a seamless workflow."
  }
];

const Faqs = () => {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="feature-badge mb-2">FAQs</div>
      
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="mb-4 border rounded-xl bg-gray-50 last:mb-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-start">
                  <span className="text-accent1 font-bold mr-4">{faq.id}</span>
                  <span className="text-left font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 ml-10">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
