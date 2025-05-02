
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BookOpen, ChevronDown, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Homework data
const homeworkData = [
  { id: 1, title: 'Mathematics Assignment', dueDate: '2023-05-15', status: 'Completed', score: '95/100' },
  { id: 2, title: 'Physics Lab Report', dueDate: '2023-05-18', status: 'In Progress', score: '-' },
  { id: 3, title: 'History Essay', dueDate: '2023-05-20', status: 'Not Started', score: '-' },
  { id: 4, title: 'Chemistry Problem Set', dueDate: '2023-05-16', status: 'Completed', score: '88/100' },
  { id: 5, title: 'Literature Review', dueDate: '2023-05-22', status: 'In Progress', score: '-' }
];

// Get status class based on status
const getStatusClass = (status: string) => {
  switch(status) {
    case 'Completed': return 'bg-green-100 text-green-700';
    case 'In Progress': return 'bg-blue-100 text-blue-700';
    case 'Not Started': return 'bg-amber-100 text-amber-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const Homework = () => {
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Homework</h1>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Assign New Homework
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search homework..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Homework Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">ASSIGNMENT</TableHead>
                  <TableHead className="font-bold">DUE DATE</TableHead>
                  <TableHead className="font-bold">STATUS</TableHead>
                  <TableHead className="font-bold">SCORE</TableHead>
                  <TableHead className="font-bold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homeworkData.map((homework) => (
                  <TableRow key={homework.id}>
                    <TableCell>{homework.id.toString().padStart(5, '0')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gray-100 p-2">
                          <BookOpen className="h-5 w-5 text-gray-500" />
                        </div>
                        <span>{homework.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{homework.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(homework.status)}`}>
                        {homework.status}
                      </span>
                    </TableCell>
                    <TableCell>{homework.score}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4 border-t">
              <span className="text-sm text-gray-500">Showing 1-5 of 25</span>
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

export default Homework;
