
import React from 'react';
import { Icons } from './Icons';

interface SubscriptionNotificationProps {
  onSubscribe: () => void;
}

const SubscriptionNotification: React.FC<SubscriptionNotificationProps> = ({ onSubscribe }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 to-purple-900 p-3 text-white shadow-md mb-3 animate-in slide-in-from-top-4 duration-500">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 h-20 w-20 rounded-full bg-white opacity-10 blur-xl"></div>
      <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-purple-500 opacity-20 blur-xl"></div>

      <div className="relative z-10 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50">
              <Icons.Lock size={14} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-tight">Account Restricted</h3>
              <p className="text-[9px] text-gray-300 leading-tight">Transfers & Withdrawals Locked</p>
            </div>
          </div>
          <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm animate-pulse">
            Action Required
          </span>
        </div>

        <button 
          onClick={onSubscribe}
          className="w-full flex items-center justify-center space-x-2 rounded-lg bg-white py-1.5 text-xs font-bold text-purple-900 shadow-sm transition-transform active:scale-95 hover:bg-gray-50"
        >
          <span>Subscribe to Unlock</span>
          <Icons.ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionNotification;
