
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MessageCircle, Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  stars?: number;
  imageIndex?: number;
}

const TestimonialCard = ({ quote, author, position, stars = 5, imageIndex = 0 }: TestimonialProps) => {
  const avatarImages = [1, 2, 3, 4, 5, 6]; // We'll use different background colors instead of actual images
  const bgColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
  
  return (
    <Card className="h-full shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transform transition-all hover:shadow-xl">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 flex justify-start text-[#84b817]">
          <MessageCircle size={24} className="opacity-70" />
        </div>
        
        <p className="mb-6 text-gray-700 dark:text-gray-300 flex-grow italic">&ldquo;{quote}&rdquo;</p>
        
        <div className="flex items-center mt-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${bgColors[imageIndex % bgColors.length]}`}>
            {author.charAt(0)}
          </div>
          <div className="ml-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{position}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14}
                  className={`${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This is validated free timetable creation tool. I was spending countless hours creating grading and I was free helping students grade. Saved around 10hrs a week easily.",
      author: "Emma Thompson",
      position: "High School Teacher",
      stars: 5,
      imageIndex: 0
    },
    {
      quote: "Managing hundreds of test papers every semester was overwhelming. The AI automated feedback streamlined. Students get better feedback and I can finally have time for myself.",
      author: "Richard Werner",
      position: "University Professor",
      stars: 5,
      imageIndex: 1
    },
    {
      quote: "We don't have huge budgets or spare staff - but the school district needed better ways to ensure high-quality education with minimal teacher burnout.",
      author: "Scott Jensen",
      position: "School Administrator",
      stars: 4,
      imageIndex: 2
    },
    {
      quote: "MarkMate has revolutionized how I organize my classes. The interface is intuitive and the support team is always responsive to my questions.",
      author: "Maria Rodriguez",
      position: "Elementary Teacher",
      stars: 5,
      imageIndex: 3
    },
    {
      quote: "As a department head, I needed a solution that works for everyone. MarkMate has been unanimously praised by our entire faculty for its ease of use.",
      author: "David Chen",
      position: "Department Chair",
      stars: 5,
      imageIndex: 4
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="feature-badge inline-block mb-3">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See How MarkMate is Changing Education
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Hear from teachers and administrators who have transformed their workflow with our platform.
          </p>
        </div>
        
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      position={testimonial.position}
                      stars={testimonial.stars}
                      imageIndex={testimonial.imageIndex}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative static left-0 right-0 translate-x-0 translate-y-0" />
              <CarouselNext className="relative static left-0 right-0 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
