import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { ComposeModal } from './components/ComposeModal';
import { MOCK_EMAILS } from './constants';
import type { Email, User } from './types';
import { Auth } from './components/Auth';
import { SettingsModal } from './components/SettingsModal';
import { categorizeEmail } from './services/geminiService';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isCategorizing, setIsCategorizing] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('scratchTheme');
    return (storedTheme as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('scratchTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('scratchUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('scratchUser');
    }
  }, []);
  
  useEffect(() => {
    const processEmails = async () => {
      if (emails.some(e => e.category)) {
        setIsCategorizing(false);
        return;
      }
      
      setIsCategorizing(true);
      const categorizedEmails = await Promise.all(
        MOCK_EMAILS.map(async (email) => {
          const result = await categorizeEmail(email.subject, email.body);
          if (result) {
            return { ...email, category: result.category, categoryColor: result.color };
          }
          return email;
        })
      );
      setEmails(categorizedEmails);
      setIsCategorizing(false);
    };

    if (user) {
        processEmails();
    }
  }, [user]);


  const handleLogin = (name: string, phone: string) => {
    const newUser: User = { 
      name, 
      phone,
      email: `${name.trim().split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}@scratch.rk`
    };
    localStorage.setItem('scratchUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('scratchUser');
    setUser(null);
    setSelectedEmail(null);
    setSidebarOpen(false);
  };

  const handleSelectEmail = (email: Email | null) => {
    setSelectedEmail(email);
    setSidebarOpen(false);
  };

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

  const handleSendEmail = (newEmail: { to: string; subject: string; body: string }) => {
    if (!user) return;
    const email: Email = {
      id: `sent-${Date.now()}`,
      sender: user.name,
      senderEmail: user.email,
      recipient: newEmail.to,
      subject: newEmail.subject,
      body: newEmail.body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      starred: false,
    };
    console.log("Sending email:", email);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col overflow-hidden">
      <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} onSettingsClick={() => setSettingsOpen(true)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar user={user} isOpen={sidebarOpen} onComposeClick={handleComposeClick} />
        {sidebarOpen && (
           <div 
             onClick={() => setSidebarOpen(false)} 
             className="fixed inset-0 bg-black/30 z-10 md:hidden"
             aria-hidden="true"
           ></div>
        )}
        <main className="flex-1 flex flex-col bg-white dark:bg-black overflow-hidden md:rounded-tl-2xl">
          {selectedEmail ? (
            <EmailDetail email={selectedEmail} onBack={() => handleSelectEmail(null)} />
          ) : (
            <EmailList emails={emails} onSelectEmail={handleSelectEmail} isCategorizing={isCategorizing}/>
          )}
        </main>
      </div>
      {isComposeOpen && <ComposeModal onClose={handleCloseCompose} onSend={handleSendEmail} />}
       <SettingsModal 
        user={user} 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
    </div>
  );
}