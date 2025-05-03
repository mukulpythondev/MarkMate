
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Mock data for the performance comparison
const performanceData = [
  {
    name: 'Test 1',
    studentScore: 78,
    avgScore: 65,
    topperScore: 92,
  },
  {
    name: 'Test 2',
    studentScore: 85,
    avgScore: 70,
    topperScore: 95,
  },
  {
    name: 'Test 3',
    studentScore: 76,
    avgScore: 68,
    topperScore: 90,
  },
  {
    name: 'Test 4',
    studentScore: 90,
    avgScore: 72,
    topperScore: 96,
  },
  {
    name: 'Test 5',
    studentScore: 88,
    avgScore: 75,
    topperScore: 98,
  },
];

// Configuration for the chart colors
const config = {
  studentScore: {
    label: 'Your Score',
    color: '#6366F1', // Primary color
  },
  avgScore: {
    label: 'Class Average',
    color: '#A855F7', // Purple
  },
  topperScore: {
    label: 'Topper Score',
    color: '#10B981', // Green
  },
};

export function StudentPerformance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Performance Comparison</CardTitle>
          <CardDescription>
            Compare your performance with class average and topper scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="studentScore" fill="#6366F1" name="studentScore" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgScore" fill="#A855F7" name="avgScore" radius={[4, 4, 0, 0]} />
                <Bar dataKey="topperScore" fill="#10B981" name="topperScore" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">83.4%</div>
            <p className="text-sm text-muted-foreground mt-2">+5% from previous tests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">70%</div>
            <p className="text-sm text-muted-foreground mt-2">+2% from previous tests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gap to Topper</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">-11.2%</div>
            <p className="text-sm text-muted-foreground mt-2">Improved by 3% since last test</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
