import React from 'react';
import type { Email } from '../types';
import { EmailListItem } from './EmailListItem';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  isCategorizing: boolean;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, isCategorizing }) => {
  return (
    <div className="flex-1 overflow-y-auto">
        <div className="p-2 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="flex items-center justify-between h-6">
                <div className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                </div>
                {isCategorizing && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center animate-pulse">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Categorizing with AI...
                  </div>
                )}
            </div>
        </div>
        <ul>
        {emails.map((email) => (
            <EmailListItem
            key={email.id}
            email={email}
            onClick={() => onSelectEmail(email)}
            />
        ))}
        </ul>
    </div>
  );
};