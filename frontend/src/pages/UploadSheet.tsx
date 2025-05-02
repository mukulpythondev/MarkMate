
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { UploadSection } from '@/components/dashboard/UploadSection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const PreviousSheetData = [
  {
    name: 'Science Exam',
    date: '40%',
    averageAttendance: 80,
    marks: 423,
    totalMarks: 500
  }
];

const UploadSheet = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Upload Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Upload New Exam Sheets</h1>
          
          {/* Upload Section */}
          <div className="mb-6">
            <UploadSection />
          </div>
          
          {/* Previous Sheets Table */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Previous Sheets</h2>
              <Button variant="ghost">View All</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Average Attendance</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PreviousSheetData.map((sheet, index) => (
                    <TableRow key={index}>
                      <TableCell>{sheet.name}</TableCell>
                      <TableCell>{sheet.date}</TableCell>
                      <TableCell>{sheet.averageAttendance}</TableCell>
                      <TableCell>{sheet.marks}</TableCell>
                      <TableCell>{sheet.totalMarks}</TableCell>
                      <TableCell>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                          View All
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadSheet;
