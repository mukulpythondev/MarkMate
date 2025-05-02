
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Filter, Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Student data array
const students = [
  { id: '00001', name: 'Christine Brooks', percentage: '80%', marks: 45, totalMarks: 100, status: 'Passed' },
  { id: '00002', name: 'Rosie Pearson', percentage: '51%', marks: 22, totalMarks: 100, status: 'Excellent' },
  { id: '00003', name: 'Darrell Caldwell', percentage: '65%', marks: 22, totalMarks: 100, status: 'Failed' },
  { id: '00004', name: 'Gilbert Johnston', percentage: '95%', marks: 96, totalMarks: 100, status: 'Passed' },
  { id: '00005', name: 'Alan Cain', percentage: '96%', marks: 32, totalMarks: 100, status: 'Excellent' },
  { id: '00006', name: 'Alfred Murray', percentage: '63%', marks: 45, totalMarks: 100, status: 'Passed' },
  { id: '00007', name: 'Maggie Sullivan', percentage: '62%', marks: 65, totalMarks: 100, status: 'Excellent' },
  { id: '00008', name: 'Rosie Todd', percentage: '63%', marks: 41, totalMarks: 100, status: 'On Hold' },
  { id: '00009', name: 'Dollie Hines', percentage: '95%', marks: 96, totalMarks: 100, status: 'Good' }
];

// Function to get status color class
const getStatusClass = (status: string) => {
  switch(status) {
    case 'Passed': return 'bg-emerald-100 text-emerald-700';
    case 'Failed': return 'bg-red-100 text-red-700';
    case 'Excellent': return 'bg-purple-100 text-purple-700';
    case 'Good': return 'bg-blue-100 text-blue-700';
    case 'On Hold': return 'bg-amber-100 text-amber-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const StudentOverview = () => {
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
          <h1 className="text-2xl font-bold mb-6">Student Overview</h1>
          
          {/* Filter section */}
          <div className="bg-white rounded-lg mb-6 flex items-center p-4">
            <button className="flex items-center pr-4 border-r">
              <Filter className="h-5 w-5 mr-2" />
              <span>Filter By</span>
            </button>
            <div className="px-4 border-r flex-1">
              <div className="flex items-center space-x-1">
                <span>Date</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
            <div className="px-4 border-r flex-1">
              <div className="flex items-center space-x-1">
                <span>Order Type</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
            <div className="px-4 flex-1">
              <div className="flex items-center space-x-1">
                <span>Order Status</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </div>
            <Button variant="ghost" className="ml-auto text-red-500">
              Reset Filter
            </Button>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">NAME</TableHead>
                  <TableHead className="font-bold">PERCENTAGE</TableHead>
                  <TableHead className="font-bold">MARKS</TableHead>
                  <TableHead className="font-bold">TOTAL MARKS</TableHead>
                  <TableHead className="font-bold">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.percentage}</TableCell>
                    <TableCell>{student.marks}</TableCell>
                    <TableCell>{student.totalMarks}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(student.status)}`}>
                        {student.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4 border-t">
              <span className="text-sm text-gray-500">Showing 1-09 of 78</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &lt;
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentOverview;
