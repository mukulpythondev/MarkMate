
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for subjects and topics
const subjectsData = {
  math: {
    name: "Mathematics",
    overall: 75,
    topics: [
      { name: "Algebra", proficiency: 85, status: "strong" },
      { name: "Geometry", proficiency: 60, status: "moderate" },
      { name: "Calculus", proficiency: 42, status: "weak" },
      { name: "Statistics", proficiency: 78, status: "strong" },
      { name: "Trigonometry", proficiency: 55, status: "moderate" }
    ]
  },
  science: {
    name: "Science",
    overall: 68,
    topics: [
      { name: "Physics", proficiency: 72, status: "moderate" },
      { name: "Chemistry", proficiency: 45, status: "weak" },
      { name: "Biology", proficiency: 83, status: "strong" },
      { name: "Earth Science", proficiency: 65, status: "moderate" },
      { name: "Laboratory Skills", proficiency: 38, status: "weak" }
    ]
  },
  english: {
    name: "English",
    overall: 82,
    topics: [
      { name: "Grammar", proficiency: 88, status: "strong" },
      { name: "Literature", proficiency: 75, status: "strong" },
      { name: "Comprehension", proficiency: 90, status: "strong" },
      { name: "Essay Writing", proficiency: 70, status: "moderate" },
      { name: "Vocabulary", proficiency: 85, status: "strong" }
    ]
  }
};

export function SubjectAnalysis() {
  const [activeSubject, setActiveSubject] = useState("math");
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "strong": return "bg-green-500";
      case "moderate": return "bg-amber-500";
      case "weak": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subject Analysis</CardTitle>
          <CardDescription>
            Review your performance in each subject and identify weak areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubject} onValueChange={setActiveSubject}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="math">Mathematics</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>
            
            {Object.keys(subjectsData).map((subjectKey) => {
              const subject = subjectsData[subjectKey as keyof typeof subjectsData];
              return (
                <TabsContent key={subjectKey} value={subjectKey} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-semibold">{subject.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">{subject.overall}%</span>
                      <Progress value={subject.overall} className="h-2 w-24" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {subject.topics.map((topic, index) => (
                      <div key={index} className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-3 font-medium">{topic.name}</div>
                        <div className="col-span-7">
                          <Progress value={topic.proficiency} className="h-3" />
                        </div>
                        <div className="col-span-1 text-sm font-medium">{topic.proficiency}%</div>
                        <div className="col-span-1 flex justify-end">
                          <span className={`h-3 w-3 rounded-full ${getStatusColor(topic.status)}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                      {subject.topics
                        .filter(topic => topic.status === "weak")
                        .map((topic, index) => (
                          <li key={index} className="text-red-600">
                            Focus on improving {topic.name} - current proficiency is only {topic.proficiency}%
                          </li>
                        ))}
                      {subject.topics
                        .filter(topic => topic.status === "moderate")
                        .map((topic, index) => (
                          <li key={index} className="text-amber-600">
                            Continue practicing {topic.name} to build stronger skills
                          </li>
                        ))}
                    </ul>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
