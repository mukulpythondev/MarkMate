
import React from 'react';
import { BookOpen } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

type StudentData = {
  id: string;
  name: string;
  percentage: string;
  attendance: number;
  marks: number;
  totalMarks: number;
  status: 'Passed' | 'Failed' | 'Excellent' | 'Good' | 'On Hold';
};

const studentData: StudentData[] = [
  {
    id: "00001",
    name: "Mohit Kumar",
    percentage: "40%",
    attendance: 80,
    marks: 423,
    totalMarks: 500,
    status: 'Passed'
  },
  {
    id: "00002",
    name: "Christine Brooks",
    percentage: "80%",
    attendance: 85,
    marks: 45,
    totalMarks: 100,
    status: 'Passed'
  },
  {
    id: "00003",
    name: "Rosie Pearson",
    percentage: "51%",
    attendance: 75,
    marks: 22,
    totalMarks: 100,
    status: 'Excellent'
  },
  {
    id: "00004",
    name: "Darrell Caldwell",
    percentage: "65%",
    attendance: 90,
    marks: 22,
    totalMarks: 100,
    status: 'Failed'
  },
];

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

export function StudentsTable() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Students Details</h2>
        <Button variant="ghost" className="text-sm text-gray-500 hover:text-primary">
          View All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-gray-100 p-2">
                      <BookOpen className="h-5 w-5 text-gray-500" />
                    </div>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>{student.percentage}</TableCell>
                <TableCell>{student.marks}</TableCell>
                <TableCell>{student.totalMarks}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(student.status)}`}>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button size="sm" className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                    View All
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1-4 of 62</div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8">
              &lt;
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
