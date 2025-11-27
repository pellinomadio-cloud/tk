import React, { useState } from 'react';
import { Icons } from './Icons';

interface BalanceCardProps {
  balance: number;
  onAdminClick?: () => void;
  onHistoryClick?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, onAdminClick, onHistoryClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  const formatCurrency = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-purple-100 dark:bg-purple-900/40 rounded-2xl p-4 mb-4 relative overflow-hidden transition-colors duration-200 border border-transparent dark:border-purple-800">
        {/* Background decoration */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-2xl opacity-50"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                    <div className="flex items-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full text-xs font-bold">
                        <span className="mr-1">✓</span> Available Balance
                    </div>
                    <button onClick={() => setIsVisible(!isVisible)} className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">
                        {isVisible ? <Icons.Eye size={16} /> : <Icons.EyeOff size={16} />}
                    </button>
                </div>
                <button className="text-sm text-gray-600 dark:text-gray-300 flex items-center font-medium hover:text-purple-600 transition-colors">
                    Add Money <Icons.ChevronRight size={14} />
                </button>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex items-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {isVisible ? formatCurrency(balance) : '₦ •••••••'}
                    </h1>
                    <Icons.ChevronRight className="text-slate-900 dark:text-white ml-1" size={24} />
                </div>
                <button 
                    onClick={onHistoryClick}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-purple-200 dark:shadow-none active:scale-95 transition-all"
                >
                    Transaction History
                </button>
            </div>

            <div className="mt-4 pt-2 border-t border-purple-200/60 dark:border-purple-800 flex justify-between items-center">
                <p className="text-xs text-purple-900 dark:text-purple-200 font-medium flex items-center">
                    <span className="bg-purple-500 text-white text-[10px] px-1 rounded mr-2 font-bold">10</span>
                    Higher return? Increase deposit with <span className="text-purple-700 dark:text-purple-300 ml-1 font-bold">20% p.a.</span>
                </p>
                <button 
                    onClick={onAdminClick}
                    className="text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center hover:bg-purple-200 dark:hover:bg-purple-800/50 px-2 py-1 rounded-md transition-colors"
                >
                    Go <Icons.ChevronRight size={12} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default BalanceCard;