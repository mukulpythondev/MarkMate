
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Contact = () => {
  return (
    <div className="py-12 px-6 md:px-12">
      <div className="feature-badge mb-4">Contact Us</div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">
            Connect with Us: Let's Discuss How we can Help.
          </h2>
        </div>
        
        <div className="w-full md:w-2/3 md:pl-12">
          <div className="bg-gray-100 rounded-xl p-8">
            <form className="space-y-6">
              <RadioGroup defaultValue="message" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="message" id="message" />
                  <Label htmlFor="message">Say Hi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ticket" id="ticket" />
                  <Label htmlFor="ticket">Raise a Ticket</Label>
                </div>
              </RadioGroup>
              
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input id="email" type="email" placeholder="Email" required className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="message">Message*</Label>
                <Textarea 
                  id="message" 
                  placeholder="Message" 
                  required 
                  className="mt-1 min-h-[120px]" 
                />
              </div>
              
              <Button className="w-full bg-dark1 text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
