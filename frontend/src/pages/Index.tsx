
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { UploadSection } from '@/components/dashboard/UploadSection';
import { StudentsTable } from '@/components/dashboard/StudentsTable';
import { UsersIcon, BoxIcon, ChartIcon, ClockIcon } from '@/components/icons/DashboardIcons';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard 
              title="Total Students" 
              value="62" 
              icon={<UsersIcon />} 
              iconBg="bg-indigo-100" 
            />
            <StatCard 
              title="Task In Progress" 
              value="156" 
              icon={<BoxIcon />} 
              iconBg="bg-amber-100" 
            />
            <StatCard 
              title="Total Doubts" 
              value="890" 
              icon={<ChartIcon />} 
              iconBg="bg-green-100"
            />
            <StatCard 
              title="Pending Doubts" 
              value="40" 
              icon={<ClockIcon />} 
              iconBg="bg-orange-100" 
            />
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <UploadSection />
          </div>

          {/* Students Table */}
          <div>
            <StudentsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
