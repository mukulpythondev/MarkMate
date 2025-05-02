
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<UploadSheet />} />
          <Route path="/dashboard/7analytics" element={<StudentOverview />} />
          {/* <Route path="/doubts" element={<StudentDoubts />} /> */}
          <Route path="/dashboard/todo" element={<TodoList />} />
          <Route path="/dashboard/homework" element={<Homework />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/product" element={<Product />} />
          <Route path="/students" element={<Students />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
