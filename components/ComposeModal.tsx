import React, { useState } from 'react';
import { CloseIcon, SparklesIcon } from './icons';
import { generateDraftStream } from '../services/geminiService';

interface ComposeModalProps {
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ onClose, onSend }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDraft = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setBody('');
    setError(null);
    try {
      const stream = await generateDraftStream(aiPrompt);
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          setBody(prevBody => prevBody + chunkText);
        }
      }
    } catch (err) {
      setError("Failed to generate draft. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSend = () => {
    if (to && subject) {
      onSend({ to, subject, body });
      onClose();
    } else {
        alert("Please fill in the recipient and subject fields.");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 md:right-10 w-full h-full md:h-auto md:w-[550px] bg-white dark:bg-gray-800 shadow-2xl rounded-t-lg md:rounded-t-xl flex flex-col z-30 text-gray-800 dark:text-gray-200">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-700 dark:bg-gray-900 text-white rounded-t-lg md:rounded-t-xl">
            <h2 className="text-sm font-medium">New Message</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700">
                <CloseIcon className="h-5 w-5"/>
            </button>
        </div>
        <div className="flex flex-col p-3 space-y-1 border-b border-gray-200 dark:border-gray-700">
            <input type="email" placeholder="Recipients" value={to} onChange={e => setTo(e.target.value)} className="w-full py-1 px-2 focus:outline-none text-sm bg-transparent"/>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
            <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="w-full py-1 px-2 focus:outline-none text-sm bg-transparent"/>
        </div>
        <div className="flex-1 p-2 flex flex-col min-h-[200px]">
            <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full h-full flex-1 resize-none focus:outline-none text-sm p-1 bg-transparent" placeholder=""></textarea>
            {showAiPrompt && (
                <div className="p-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="text-blue-500"/>
                        <input
                            type="text"
                            value={aiPrompt}
                            onChange={e => setAiPrompt(e.target.value)}
                            placeholder="e.g., Ask Alice for the project update"
                            className="flex-1 py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-transparent"
                            disabled={isGenerating}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerateDraft()}
                        />
                        <button 
                          onClick={handleGenerateDraft}
                          disabled={isGenerating || !aiPrompt}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isGenerating ? '...' : 'Generate'}
                        </button>
                    </div>
                </div>
            )}
             {error && <div className="text-sm text-red-500 p-2">{error}</div>}
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
                <button onClick={handleSend} className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Send
                </button>
                 <button 
                   onClick={() => setShowAiPrompt(!showAiPrompt)}
                   className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                   title="Draft with AI"
                 >
                    <SparklesIcon />
                 </button>
            </div>
            <button onClick={onClose} title="Discard draft">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
  );
};