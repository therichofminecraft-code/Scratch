import React, { useState, useEffect } from 'react';
import type { Email } from '../types';
import { generateSmartReplies, summarizeEmail } from '../services/geminiService';
import { ArrowLeftIcon, TrashIcon, ArchiveIcon, StarIcon, SparklesIcon } from './icons';

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

const SmartReplyButton: React.FC<{ text: string }> = ({ text }) => (
  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
    {text}
  </button>
);

export const EmailDetail: React.FC<EmailDetailProps> = ({ email, onBack }) => {
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplies = async () => {
      if (!email.body) return;
      setIsLoadingReplies(true);
      setError(null);
      setSmartReplies([]);
      try {
        const replies = await generateSmartReplies(email.body);
        setSmartReplies(replies);
      } catch (err) {
        setError('Could not generate smart replies.');
        console.error(err);
      } finally {
        setIsLoadingReplies(false);
      }
    };
    fetchReplies();
    setSummary(null);
    setSummaryError(null);
  }, [email]);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummaryError(null);
    setSummary(null);
    try {
      const result = await summarizeEmail(email.body);
      setSummary(result);
    } catch (err) {
      setSummaryError('Could not generate summary.');
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };


  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="px-4 py-2 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeftIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <ArchiveIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <TrashIcon />
        </button>
      </div>

      <div className="px-6 py-4 flex-1">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold flex-1 pr-4">{email.subject}</h1>
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-wait shrink-0"
            >
              <SparklesIcon className="w-4 h-4 mr-1.5"/>
              {isSummarizing ? 'Summarizing...' : 'Summarize'}
            </button>
        </div>

        {isSummarizing && <div className="p-4 mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 animate-pulse">Generating summary...</div>}
        {summaryError && <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">{summaryError}</div>}
        {summary && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-r-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">{summary}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={`https://picsum.photos/seed/${email.senderEmail}/40/40`} alt="Sender" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{email.sender} <span className="font-normal text-gray-500 dark:text-gray-400 text-sm">&lt;{email.senderEmail}&gt;</span></p>
              <p className="text-sm text-gray-500 dark:text-gray-400">to me</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{email.timestamp}</span>
            <button className="text-gray-400 hover:text-yellow-500">
              <StarIcon filled={email.starred} />
            </button>
          </div>
        </div>

        <div className="mt-8 text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          {email.body}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center mb-3">
          <SparklesIcon className="text-blue-500 mr-2"/>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Smart Reply</h3>
        </div>
        {isLoadingReplies && <div className="text-sm text-gray-500 dark:text-gray-400">Generating replies...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="flex flex-wrap gap-2">
          {smartReplies.map((reply, index) => (
            <SmartReplyButton key={index} text={reply} />
          ))}
        </div>

        <div className="mt-6 flex space-x-2">
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Reply</button>
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Forward</button>
        </div>
      </div>
    </div>
  );
};