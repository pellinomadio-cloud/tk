import React from 'react';
import { Icons } from './Icons';

interface TelegramAdProps {
  onJoin: () => void;
  onContinue: () => void;
}

const TelegramAd: React.FC<TelegramAdProps> = ({ onJoin, onContinue }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-center space-y-6 animate-in zoom-in-95 duration-300">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"></div>
        
        <div className="relative">
             <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none mb-4">
                <Icons.Send size={40} className="text-white ml-1" />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white">Join Our Community!</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Stay updated! Join our official Telegram channel for exclusive rewards, updates, and support.
             </p>
             <p className="text-blue-500 font-bold mt-1">@veripay99</p>
        </div>

        <div className="space-y-3">
            <button 
                onClick={onJoin}
                className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all transform active:scale-95 flex items-center justify-center space-x-2"
            >
                <Icons.Send size={18} />
                <span>Join Channel</span>
            </button>
            <button 
                onClick={onContinue}
                className="w-full py-3.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-200 font-bold rounded-xl transition-colors"
            >
                Continue to Dashboard
            </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramAd;