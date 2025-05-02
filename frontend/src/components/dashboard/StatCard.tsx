
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  viewAllLink?: string;
};

export function StatCard({ title, value, icon, iconBg = "bg-blue-100", viewAllLink = "#" }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 text-3xl font-semibold">{value}</div>
        </div>
        <div className={cn("rounded-full p-3", iconBg)}>
          {icon}
        </div>
      </div>
      <Link 
        to={viewAllLink} 
        className="text-sm font-medium text-gray-500 hover:text-primary"
      >
        View All
      </Link>
    </div>
  );
}
