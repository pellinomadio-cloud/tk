
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

const names = ["Olamide", "Chioma", "Emeka", "Adewale", "Yusuf", "Ngozi", "Tunde", "Fatima", "Samuel", "Zainab", "Musa", "Blessing", "Emmanuel", "Grace"];
const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Benin City", "Kaduna", "Jos", "Calabar"];

const LiveNotifications: React.FC = () => {
  const [notification, setNotification] = useState<{name: string, amount: string, location: string} | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to generate and show a random notification
    const showRandomNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      // Random amount between 5,000 and 900,000
      const amount = Math.floor(Math.random() * (900000 - 5000 + 1) + 5000).toLocaleString();

      setNotification({ name, amount, location });
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before first notification
    const initialTimeout = setTimeout(showRandomNotification, 3000);

    // Loop interval (every 10-15 seconds)
    const interval = setInterval(() => {
        showRandomNotification();
    }, 12000);

    return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 w-[92%] max-w-sm transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      <div className="bg-slate-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-white/10 dark:border-gray-200">
        <div className="bg-green-500/20 p-2 rounded-full flex-shrink-0 animate-pulse">
             <Icons.CheckCircle size={16} className="text-green-500 dark:text-green-600" strokeWidth={3} />
        </div>
        <div className="flex-1">
            <p className="text-xs font-medium leading-relaxed">
            <span className="font-bold text-yellow-400 dark:text-purple-600">{notification.name}</span> just withdrew <span className="font-bold text-green-400 dark:text-green-600">₦{notification.amount}</span> from {notification.location}.
            </p>
        </div>
      </div>
    </div>
  );
};

export default LiveNotifications;
