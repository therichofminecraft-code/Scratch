import React from 'react';
import type { Email } from '../types';
import { StarIcon } from './icons';

interface EmailListItemProps {
  email: Email;
  onClick: () => void;
}

const getCategoryColors = (color?: string) => {
    switch (color) {
        case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
        case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
}

export const EmailListItem: React.FC<EmailListItemProps> = ({ email, onClick }) => {
  const { sender, subject, body, timestamp, read, starred, category, categoryColor } = email;

  const fontWeight = read ? 'font-normal' : 'font-bold';
  const bgColor = read ? 'bg-white dark:bg-black' : 'bg-blue-50 dark:bg-blue-900/20';

  return (
    <li
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg dark:hover:bg-gray-800/50 transition-shadow duration-200 ${bgColor}`}
    >
      <div className="flex items-center w-full min-w-0">
        <div className="flex items-center mr-4 space-x-3">
          <input type="checkbox" onClick={e => e.stopPropagation()} className="h-4 w-4 text-blue-600 bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-900" />
          <button onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-yellow-500">
            <StarIcon filled={starred} />
          </button>
        </div>

        <div className={`w-36 md:w-48 shrink-0 truncate mr-4 ${fontWeight} dark:text-gray-100`}>
          {sender}
        </div>
        
        <div className="flex-1 min-w-0 truncate">
          {category && (
            <span className={`text-xs font-medium mr-2 px-2 py-0.5 rounded-full ${getCategoryColors(categoryColor)}`}>
              {category}
            </span>
          )}
          <span className={`${fontWeight} mr-2 dark:text-gray-200`}>{subject}</span>
          <span className="text-gray-500 dark:text-gray-400 hidden md:inline">- {body.substring(0, 80).replace(/\n/g, ' ')}...</span>
        </div>
      </div>
      
      <div className={`text-sm ml-4 whitespace-nowrap ${fontWeight} text-gray-700 dark:text-gray-400`}>
        {timestamp}
      </div>
    </li>
  );
};