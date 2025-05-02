
import React from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full bg-gray-100 pl-8 pr-4 py-2 text-sm outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute right-0 top-0 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <span>English</span>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2">
          <img
            alt="Avatar"
            className="h-8 w-8 rounded-full"
            src="https://github.com/shadcn.png"
          />
          <div className="text-sm">
            <div className="font-medium">Moni Roy</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
