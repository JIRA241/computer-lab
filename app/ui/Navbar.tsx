import React from 'react';
import { Bell, User } from 'lucide-react';

import { Button , } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">PaymentPalooza</span>
            </div>
          </div>
          <div className="flex items-center">
          {/* <Button variant="text">Text</Button> */}
            <div
                aria-label="noti"
                className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow"
            >
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 rounded-full">
                    5
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
            </div>
            <div className="ml-4">
                <Avatar sx={{ bgcolor: deepPurple[500] }}>JP</Avatar>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
