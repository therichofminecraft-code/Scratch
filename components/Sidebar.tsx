import React from 'react';
import { PencilIcon, InboxIcon, StarIcon } from './icons';
import type { User } from '../types';

interface SidebarProps {
  user: User;
  onComposeClick: () => void;
  isOpen: boolean;
}

const SidebarItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  count?: number;
  active?: boolean;
}> = ({ icon, text, count, active }) => (
  <button className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-r-full transition-colors duration-150 ${
    active 
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
  }`}>
    <div className="flex items-center space-x-4">
      {icon}
      <span>{text}</span>
    </div>
    {count && <span className="font-semibold">{count}</span>}
  </button>
);

const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1 && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export const Sidebar: React.FC<SidebarProps> = ({ user, onComposeClick, isOpen }) => {
  return (
    <aside className={`absolute md:relative z-20 flex-shrink-0 w-64 bg-gray-100 dark:bg-gray-900 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex flex-col items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="h-16 w-16 rounded-full mb-2 bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
            {getInitials(user.name)}
        </div>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
      <div className="px-2 py-4">
        <button 
          onClick={onComposeClick}
          className="w-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg dark:hover:bg-gray-700 transition-all duration-200 rounded-2xl px-4 py-3 space-x-2"
        >
          <PencilIcon />
          <span className="font-medium">Compose</span>
        </button>
      </div>
      <nav className="flex-1 space-y-1">
        <SidebarItem icon={<InboxIcon />} text="Inbox" count={2} active />
        <SidebarItem icon={<StarIcon />} text="Starred" />
        <SidebarItem icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} text="Snoozed" />
        <SidebarItem icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} text="Sent" />
        <SidebarItem icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} text="Drafts" />
      </nav>
    </aside>
  );
};