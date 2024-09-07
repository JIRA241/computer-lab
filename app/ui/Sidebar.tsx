import React from 'react';
import { HomeIcon, CreditCardIcon, UsersIcon, SettingsIcon, LogOutIcon, X } from 'lucide-react';
import { Button } from '@mui/material';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="mt-8">
        <Link href="/classroom" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <HomeIcon className="mr-3 h-5 w-5" />
          classroom
        </Link>
        <Link href="/Course" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <CreditCardIcon className="mr-3 h-5 w-5" />
          Course
        </Link>
        <Link href="/user" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <UsersIcon className="mr-3 h-5 w-5" />
          user
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
          <SettingsIcon className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button className="flex items-center text-gray-700 hover:text-gray-900">
          <LogOutIcon className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
