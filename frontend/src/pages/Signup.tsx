// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/lib/axios'; // your axios instance
import { useAuth } from '@/context/AuthContext'; // assuming you have this set up
import { toast } from 'sonner'; // or toaster if you prefer
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [classId, setClassId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // <-- Add this

    try {
      const { data } = await axios.post('/users/register', {
        name,
        email,
        role,
        classCode: classId,
        password,
      });
      console.log("Response data:", data); // <-- Add this
      // // optionally auto-login
      // const loginRes = await axios.post('/users/login', {
      //   email,
      //   password,
      // });

      // update global context
      // setAuth(loginRes.data.user);

      toast.success("Signup successful! Redirecting to dashboard...");
      if (role === 'teacher') {
        navigate('/dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Join <span className="font-extrabold text-[#84b817]">MarkMate</span>
            </h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84b817]"
                required
              >
                <option value="" disabled>Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="classId">Class ID</Label>
              <Input id="classId" type="text" value={classId} onChange={(e) => setClassId(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-[#84b817] hover:bg-[#729e13] text-white">
              Sign up
            </Button>
          </form>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#84b817] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
