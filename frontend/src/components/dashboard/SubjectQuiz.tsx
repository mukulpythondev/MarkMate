
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";

// Mock quiz data
const quizzes = {
  math: {
    name: "Mathematics",
    topics: [
      {
        id: "algebra",
        name: "Algebra",
        questions: [
          {
            id: "q1",
            text: "If 3x + 5 = 20, what is the value of x?",
            options: [
              { id: "a", text: "x = 3" },
              { id: "b", text: "x = 5" },
              { id: "c", text: "x = 7" },
              { id: "d", text: "x = 15" }
            ],
            correctAnswer: "b"
          },
          {
            id: "q2",
            text: "Simplify the expression: 2(x + 3) - 4x",
            options: [
              { id: "a", text: "2x + 6" },
              { id: "b", text: "6 - 2x" },
              { id: "c", text: "-2x + 6" },
              { id: "d", text: "2x - 6" }
            ],
            correctAnswer: "c"
          },
          {
            id: "q3",
            text: "Solve for y: 2y - 5 = 11",
            options: [
              { id: "a", text: "y = 3" },
              { id: "b", text: "y = 8" },
              { id: "c", text: "y = -3" },
              { id: "d", text: "y = 6" }
            ],
            correctAnswer: "b"
          },
          {
            id: "q4",
            text: "Factor completely: x² - 9",
            options: [
              { id: "a", text: "(x + 3)(x - 3)" },
              { id: "b", text: "(x + 9)(x - 9)" },
              { id: "c", text: "(x - 3)²" },
              { id: "d", text: "Cannot be factored" }
            ],
            correctAnswer: "a"
          },
          {
            id: "q5",
            text: "If f(x) = 2x - 1, what is f(3)?",
            options: [
              { id: "a", text: "2" },
              { id: "b", text: "4" },
              { id: "c", text: "5" },
              { id: "d", text: "6" }
            ],
            correctAnswer: "c"
          }
        ]
      },
      {
        id: "calculus",
        name: "Calculus",
        questions: [
          {
            id: "q1",
            text: "What is the derivative of f(x) = x²?",
            options: [
              { id: "a", text: "f'(x) = 2x" },
              { id: "b", text: "f'(x) = x" },
              { id: "c", text: "f'(x) = 2" },
              { id: "d", text: "f'(x) = x²" }
            ],
            correctAnswer: "a"
          },
          {
            id: "q2",
            text: "Find the indefinite integral of f(x) = 2x + 3",
            options: [
              { id: "a", text: "f(x) = x² + 3x + C" },
              { id: "b", text: "f(x) = x² + 3x" },
              { id: "c", text: "f(x) = 2ln|x| + 3x + C" },
              { id: "d", text: "f(x) = x³/3 + 3x + C" }
            ],
            correctAnswer: "a"
          },
          {
            id: "q3",
            text: "If f(x) = sin(x), then f'(x) = ?",
            options: [
              { id: "a", text: "cos(x)" },
              { id: "b", text: "-sin(x)" },
              { id: "c", text: "-cos(x)" },
              { id: "d", text: "tan(x)" }
            ],
            correctAnswer: "a"
          },
          {
            id: "q4",
            text: "The limit of (sin x)/x as x approaches 0 is:",
            options: [
              { id: "a", text: "0" },
              { id: "b", text: "1" },
              { id: "c", text: "∞" },
              { id: "d", text: "Undefined" }
            ],
            correctAnswer: "b"
          },
          {
            id: "q5",
            text: "What is the second derivative of f(x) = 3x³ + 2x² - 5x + 1?",
            options: [
              { id: "a", text: "f''(x) = 18x + 4" },
              { id: "b", text: "f''(x) = 18x - 5" },
              { id: "c", text: "f''(x) = 9x² + 4x - 5" },
              { id: "d", text: "f''(x) = 18x + 2" }
            ],
            correctAnswer: "a"
          }
        ]
      }
    ]
  },
  science: {
    name: "Science",
    topics: [
      {
        id: "chemistry",
        name: "Chemistry",
        questions: [
          {
            id: "q1",
            text: "What is the chemical symbol for gold?",
            options: [
              { id: "a", text: "Go" },
              { id: "b", text: "Gd" },
              { id: "c", text: "Au" },
              { id: "d", text: "Ag" }
            ],
            correctAnswer: "c"
          },
          {
            id: "q2",
            text: "Which of the following is NOT a noble gas?",
            options: [
              { id: "a", text: "Helium" },
              { id: "b", text: "Neon" },
              { id: "c", text: "Chlorine" },
              { id: "d", text: "Argon" }
            ],
            correctAnswer: "c"
          },
          {
            id: "q3",
            text: "What is the pH of a neutral solution?",
            options: [
              { id: "a", text: "0" },
              { id: "b", text: "7" },
              { id: "c", text: "10" },
              { id: "d", text: "14" }
            ],
            correctAnswer: "b"
          },
          {
            id: "q4",
            text: "Which subatomic particle has a negative charge?",
            options: [
              { id: "a", text: "Proton" },
              { id: "b", text: "Neutron" },
              { id: "c", text: "Electron" },
              { id: "d", text: "Positron" }
            ],
            correctAnswer: "c"
          },
          {
            id: "q5",
            text: "What is the molecular formula for water?",
            options: [
              { id: "a", text: "H₂O" },
              { id: "b", text: "CO₂" },
              { id: "c", text: "O₂" },
              { id: "d", text: "H₂O₂" }
            ],
            correctAnswer: "a"
          }
        ]
      }
    ]
  }
};

// Quiz states
type QuizState = 'selecting' | 'taking' | 'results';

export function SubjectQuiz() {
  const [subject, setSubject] = useState('math');
  const [topic, setTopic] = useState('');
  const [quizState, setQuizState] = useState<QuizState>('selecting');
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    if (!subject || !topic) {
      toast.error("Please select both subject and topic");
      return;
    }

    const selectedQuiz = quizzes[subject as keyof typeof quizzes]?.topics.find(t => t.id === topic);
    
    if (selectedQuiz) {
      setCurrentQuiz(selectedQuiz);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizState('taking');
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question: any) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    setScore(calculatedScore);
    setQuizState('results');
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState('taking');
  };

  const handleNewQuiz = () => {
    setQuizState('selecting');
    setTopic('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subject Quiz</CardTitle>
          <CardDescription>
            Take a quiz to test your knowledge on specific topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quizState === 'selecting' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(quizzes).map((key) => (
                      <SelectItem key={key} value={key}>
                        {quizzes[key as keyof typeof quizzes].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Select Topic</label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subject && quizzes[subject as keyof typeof quizzes]?.topics.map((topicItem) => (
                      <SelectItem key={topicItem.id} value={topicItem.id}>
                        {topicItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
            </div>
          )}

          {quizState === 'taking' && currentQuiz && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{currentQuiz.name} Quiz</h3>
                <div className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4">
                  {currentQuiz.questions[currentQuestionIndex].text}
                </h4>
                <RadioGroup 
                  value={answers[currentQuiz.questions[currentQuestionIndex].id] || ""} 
                  onValueChange={(value) => handleAnswerSelect(currentQuiz.questions[currentQuestionIndex].id, value)}
                  className="space-y-3"
                >
                  {currentQuiz.questions[currentQuestionIndex].options.map((option: any) => (
                    <div key={option.id} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-gray-100">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                  <Button onClick={handleFinishQuiz}>
                    Finish Quiz
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {quizState === 'results' && currentQuiz && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
                <p className="text-muted-foreground">
                  You answered {currentQuiz.questions.filter((q: any) => answers[q.id] === q.correctAnswer).length} out of {currentQuiz.questions.length} questions correctly
                </p>
              </div>

              <div className="space-y-4 my-6">
                <h4 className="font-medium">Question Summary:</h4>
                {currentQuiz.questions.map((question: any, index: number) => {
                  const isCorrect = answers[question.id] === question.correctAnswer;
                  return (
                    <div key={question.id} className={`rounded-lg border p-4 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <div className="bg-green-100 text-green-600 p-1 rounded-full">
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="bg-red-100 text-red-600 p-1 rounded-full">
                            <X className="h-4 w-4" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <p className="font-medium">{index + 1}. {question.text}</p>
                          <div className="space-y-0.5 text-sm">
                            <p className="text-muted-foreground">
                              Your answer: {question.options.find((o: any) => o.id === answers[question.id])?.text || 'No answer'}
                            </p>
                            {!isCorrect && (
                              <p className="text-green-600 font-medium">
                                Correct answer: {question.options.find((o: any) => o.id === question.correctAnswer)?.text}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" onClick={handleRetakeQuiz}>
                  Retake Quiz
                </Button>
                <Button onClick={handleNewQuiz}>
                  Try Different Quiz
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
