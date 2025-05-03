import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import UploadSheet from "./pages/UploadSheet";
import StudentOverview from "./pages/StudentOverview";
import StudentDoubts from "./pages/StudentDoubts";
import TodoList from "./pages/TodoList";
import Homework from "./pages/Homework";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Demo from "./pages/Demo";
import Product from "./pages/Product";
import Students from "./pages/Students";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/product" element={<Product />} />
            <Route path="/students" element={<Students />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes for Teachers */}
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/upload" element={<UploadSheet />} />
              <Route path="/dashboard/analytics" element={<StudentOverview />} />
              <Route path="/dashboard/todo" element={<TodoList />} />
              <Route path="/dashboard/homework" element={<Homework />} />
            </Route>

            {/* Protected Routes for Students */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/student-dashboard" element={<div>Student Dashboard Coming Soon</div>} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
