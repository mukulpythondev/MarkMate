
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentPerformance } from '@/components/dashboard/StudentPerformance';
import { SubjectAnalysis } from '@/components/dashboard/SubjectAnalysis';
import { SubjectQuiz } from '@/components/dashboard/SubjectQuiz';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="analysis">Subject Analysis</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="mt-6">
              <StudentPerformance />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <SubjectAnalysis />
            </TabsContent>
            
            <TabsContent value="quiz" className="mt-6">
              <SubjectQuiz />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
