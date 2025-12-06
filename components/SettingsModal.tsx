import React from 'react';
import type { User } from '../types';
import { CloseIcon } from './icons';

interface SettingsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ user, isOpen, onClose, theme, toggleTheme }) => {
  if (!isOpen) return null;

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1 && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative text-gray-800 dark:text-gray-200" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold">Profile & Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shrink-0">
                {getInitials(user.name)}
            </div>
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-600 dark:text-gray-300">Theme</h3>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
              <span>Appearance</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
            <div className="text-xs text-center text-gray-400 dark:text-gray-500 space-y-1">
                <p>Scratch Mail v1.1.0</p>
                <p>প্ল্যাটফর্ম তৈরি করেছে "RTSF" গ্রুপের লিডার K.M Rakib</p>
            </div>
        </div>
      </div>
    </div>
  );
};