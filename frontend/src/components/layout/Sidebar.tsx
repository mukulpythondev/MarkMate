
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, CloudUpload, Users, HelpCircle, 
  CheckSquare, BookOpen, Settings, LogOut 
} from 'lucide-react';
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600",
          active && "bg-blue-100 text-blue-600"
        )}
      >
        <div className="text-xl">{icon}</div>
        <div className="font-medium">{label}</div>
      </div>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen w-56 flex-col border-r bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Mark<span className="text-primary">MATE</span></h2>
      </div>
      <div className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Dashboard" 
            href="/" 
            active={currentPath === '/'} 
          />
          <SidebarItem 
            icon={<CloudUpload size={20} />} 
            label="Upload Sheets" 
            href="/upload" 
            active={currentPath === '/upload'} 
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            href="/analytics" 
            active={currentPath === '/analytics'} 
          />
          <SidebarItem 
            icon={<HelpCircle size={20} />} 
            label="Student Doubts" 
            href="/doubts" 
            active={currentPath === '/doubts'} 
          />
          <SidebarItem 
            icon={<CheckSquare size={20} />} 
            label="To-Do" 
            href="/todo" 
            active={currentPath === '/todo'} 
          />
          <SidebarItem 
            icon={<BookOpen size={20} />} 
            label="Homework" 
            href="/homework" 
            active={currentPath === '/homework'} 
          />
        </div>
      </div>
      <div className="border-t px-3 py-2">
        <div className="space-y-1">
          <SidebarItem icon={<Settings size={20} />} label="Settings" href="/settings" active={currentPath === '/settings'} />
          <SidebarItem icon={<LogOut size={20} />} label="Logout" href="/logout" active={currentPath === '/logout'} />
        </div>
      </div>
    </div>
  );
}
