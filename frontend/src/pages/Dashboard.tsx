import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { UploadSection } from '@/components/dashboard/UploadSection';
import { StudentsTable } from '@/components/dashboard/StudentsTable';
import { UsersIcon, BoxIcon } from '@/components/icons/DashboardIcons';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext'; // Import your global auth hook

const Dashboard = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [totalStudents, setTotalStudents] = useState(0);

  const getTotalStudents = async () => {
    try {
      if (!user?.classCode) return;
  
      const response = await axios.post(
        '/users/getAllStudents',
        { classCode: user.classCode }, // ✅ send classCode in body
        { withCredentials: true }
      );
  
      setTotalStudents(response.data.data || 0); // ✅ your controller sends length in `data`
    } catch (error) {
      console.error('Error fetching total students:', error);
      setTotalStudents(0);
    }
  };
  

  useEffect(() => {
    if (user) {
      getTotalStudents();
    }
  }, [user]); // Fetch when user becomes available

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard
              title="Total Students"
              value={totalStudents.toString()}
              icon={<UsersIcon />}
              iconBg="bg-indigo-100"
            />
            <StatCard
              title="Task In Progress"
              value="156"
              icon={<BoxIcon />}
              iconBg="bg-amber-100"
            />
          </div>

          {/* <div className="mb-6">
            <UploadSection />
          </div> */}

          <div>
            <StudentsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
