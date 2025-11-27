import React from 'react';
import { Icons } from './Icons';

interface InviteAdProps {
  onStart: () => void;
  onClose: () => void;
}

const InviteAd: React.FC<InviteAdProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden text-center space-y-5 animate-in zoom-in-95 duration-300 border-2 border-purple-500">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 p-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 hover:text-red-500 transition-colors">
            <Icons.X size={20} />
        </button>

        <div className="flex justify-center pt-2">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                <Icons.Banknote size={40} className="text-green-600 dark:text-green-400" />
             </div>
        </div>

        <div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white">Need Quick Cash?</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                Complete 5 simple tasks and get <span className="font-bold text-green-600 dark:text-green-400">₦50,000</span> credited to your wallet instantly!
             </p>
        </div>

        <div className="space-y-3">
            <button 
                onClick={onStart}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition-all transform active:scale-95 flex items-center justify-center space-x-2"
            >
                <Icons.Star size={18} fill="currentColor" />
                <span>Start Earning Now</span>
            </button>
            <button 
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
                Remind me later
            </button>
        </div>
      </div>
    </div>
  );
};

export default InviteAd;