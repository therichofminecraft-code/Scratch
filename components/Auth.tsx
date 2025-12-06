import React, { useState } from 'react';

interface AuthProps {
  onLogin: (name: string, phone: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || phone.trim() === '') {
      setError('Please fill in both name and phone number.');
      return;
    }
    if (!/^\+?[0-9\s-()]{7,}$/.test(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    onLogin(name, phone);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="https://picsum.photos/seed/mail-logo/40/40" alt="Scratch Logo" className="h-10 w-10 rounded-full"/>
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">Scratch Mail</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">A smarter way to email.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account & Sign In
            </button>
          </div>
        </form>
         <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 space-y-1">
            <p>By creating an account, you agree to our Terms of Service.</p>
            <p className="font-semibold">Note: Firebase integration for auth and storage coming soon!</p>
        </div>
      </div>
    </div>
  );
};