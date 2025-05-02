
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Search, Image, Info, Trash2, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type EmailItem = {
  id: number;
  sender: string;
  subject: string;
  starred: boolean;
  tag: 'Primary' | 'Work' | 'Friends' | 'Social';
  time: string;
};

const emails: EmailItem[] = [
  { id: 1, sender: 'Jullu Jalal', subject: 'Our Bachelor of Commerce program is ACBSP-accredited.', starred: false, tag: 'Primary', time: '8:38 AM' },
  { id: 2, sender: 'Minerva Barnett', subject: 'Get Best Advertiser In Your Side Pocket', starred: false, tag: 'Work', time: '8:13 AM' },
  { id: 3, sender: 'Peter Lewis', subject: 'Vacation Home Rental Success', starred: false, tag: 'Friends', time: '7:52 PM' },
  { id: 4, sender: 'Anthony Briggs', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', starred: true, tag: 'Primary', time: '7:52 PM' },
  { id: 5, sender: 'Clifford Morgan', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', starred: false, tag: 'Social', time: '4:13 PM' },
  { id: 6, sender: 'Cecilia Webster', subject: 'Always Look On The Bright Side Of Life', starred: false, tag: 'Friends', time: '3:52 PM' },
  { id: 7, sender: 'Harvey Manning', subject: 'Curling Irons Are As Individual As The Women Who Use Them', starred: true, tag: 'Primary', time: '2:30 PM' },
  { id: 8, sender: 'Willie Blake', subject: 'Our Bachelor of Commerce program is ACBSP-accredited.', starred: false, tag: 'Primary', time: '8:38 AM' },
  { id: 9, sender: 'Minerva Barnett', subject: 'Get Best Advertiser In Your Side Pocket', starred: false, tag: 'Work', time: '8:13 AM' },
  { id: 10, sender: 'Fanny Weaver', subject: 'Free Classifieds Using Them To Promote Your Stuff Online', starred: true, tag: 'Primary', time: '7:52 PM' },
  { id: 11, sender: 'Olga Hogan', subject: 'Enhance Your Brand Potential With Giant Advertising Blimps', starred: false, tag: 'Social', time: '4:13 PM' },
  { id: 12, sender: 'Lora Houston', subject: 'Vacation Home Rental Success', starred: false, tag: 'Friends', time: '7:52 PM' },
];

// Get tag class based on tag
const getTagClass = (tag: string) => {
  switch(tag) {
    case 'Primary': return 'bg-emerald-100 text-emerald-700';
    case 'Work': return 'bg-amber-100 text-amber-700';
    case 'Friends': return 'bg-purple-100 text-purple-700';
    case 'Social': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const StudentDoubts = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Student Doubts</h1>
          
          <Card className="overflow-hidden">
            <div className="p-4">
              <div className="relative w-full max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mail"
                  className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <CardContent className="p-0">
              <div className="flex justify-end border-b p-2 gap-2">
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Email List */}
              <div className="divide-y">
                {emails.map((email) => (
                  <div 
                    key={email.id} 
                    className="flex items-center py-3 px-4 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 mr-4"
                    />
                    
                    {email.starred ? (
                      <Star className="h-5 w-5 text-yellow-400 mr-4 fill-yellow-400" />
                    ) : (
                      <Star className="h-5 w-5 text-gray-300 mr-4" />
                    )}
                    
                    <div className="w-32 truncate font-medium">{email.sender}</div>
                    
                    {email.tag && (
                      <span className={`mr-4 px-2 py-0.5 rounded-md text-xs ${getTagClass(email.tag)}`}>
                        {email.tag}
                      </span>
                    )}
                    
                    <div className="flex-grow truncate">{email.subject}</div>
                    
                    <div className="text-sm text-gray-500">{email.time}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between p-4 border-t">
                <span className="text-sm text-gray-500">Showing 1-12 of 1,253</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentDoubts;
