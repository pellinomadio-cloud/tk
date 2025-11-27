import React from 'react';
import { Icons } from './Icons';

interface HeaderProps {
  userName?: string;
  profileImage?: string;
  onLogout?: () => void;
  showBack?: boolean;
  onBack?: () => void;
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = "Guest", 
  profileImage, 
  onLogout,
  showBack = false,
  onBack,
  pageTitle
}) => {
  // Get initials safely
  const initials = userName.length >= 2 ? userName.substring(0, 2).toUpperCase() : userName.substring(0, 1).toUpperCase();
  const firstName = userName.split(' ')[0];

  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-colors duration-200">
      <div className="flex items-center space-x-2">
        {showBack ? (
          <>
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 mr-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-slate-800 dark:text-white"
            >
              <Icons.ArrowLeft size={24} />
            </button>
            <span className="font-bold text-slate-800 dark:text-white text-lg">{pageTitle}</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold italic text-sm overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
            </div>
            <span className="font-semibold text-slate-800 dark:text-white text-lg truncate max-w-[150px]">Hi, {firstName}</span>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-3 text-slate-700 dark:text-gray-300">
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Icons.Support size={24} />
        </button>
        <button className="p-1 relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Icons.Notification size={24} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full border-2 border-white dark:border-gray-800">
                99+
            </span>
        </button>
      </div>
    </div>
  );
};

export default Header;