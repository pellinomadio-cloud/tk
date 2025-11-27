import React, { useState, useRef } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdateProfile: (updatedUser: Partial<User>) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile, darkMode, toggleDarkMode, onLogout }) => {
  const [name, setName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    onUpdateProfile({ name });
    setIsEditing(false);
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-purple-600 flex items-center justify-center">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-3xl font-bold italic">{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-700 transition-colors"
          >
            <Icons.Camera size={16} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
        
        <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 space-y-4 transition-colors duration-200">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Account Settings</h3>
        
        {/* Name Edit */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 flex-1">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                <Icons.User size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Full Name</p>
              {isEditing ? (
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-1.5 border border-purple-200 rounded text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
              )}
            </div>
          </div>
          <button 
            onClick={() => isEditing ? handleSaveName() : setIsEditing(true)}
            className="text-purple-600 dark:text-purple-400 font-medium text-sm ml-2 p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
          >
            {isEditing ? <Icons.Check size={20} /> : 'Edit'}
          </button>
        </div>

        {/* Appearance Toggle (Bright/Dark Mod) */}
        <div className="flex items-center justify-between py-3 cursor-pointer" onClick={toggleDarkMode}>
           <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl transition-colors duration-300 ${darkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-orange-100 text-orange-500'}`}>
                {darkMode ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </p>
            </div>
          </div>
          
          <div 
            className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-200">
          <button onClick={onLogout} className="w-full p-4 flex items-center space-x-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full">
                <Icons.LogOut size={18} />
            </div>
            <span className="font-medium">Log Out</span>
          </button>
      </div>

    </div>
  );
};

export default Profile;