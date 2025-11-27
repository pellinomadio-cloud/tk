import React from 'react';
import { Icons } from './Icons';
import { MenuItem } from '../types';

const topRowItems: MenuItem[] = [
  { id: 'bank', label: 'Transfer', icon: Icons.Send },
  { id: 'palmpay', label: 'To Nova', icon: Icons.User },
  { id: 'rewards', label: 'Rewards', icon: Icons.Reward },
  { id: 'subscribe', label: 'Subscribe', icon: Icons.Subscribe },
];

const bottomGridItems: MenuItem[] = [
  { id: 'airtime', label: 'Airtime', icon: Icons.Airtime, color: 'text-purple-600 dark:text-purple-400' },
  { id: 'data', label: 'Data', icon: Icons.Data, color: 'text-indigo-600 dark:text-indigo-400' },
  { id: 'betting', label: 'Betting', icon: Icons.Betting, color: 'text-orange-500 dark:text-orange-400', badge: '10% Off' },
  { id: 'business', label: 'My Business Hub', icon: Icons.Business, color: 'text-blue-600 dark:text-blue-400' },
  { id: 'invite', label: 'Invite & Earn', icon: Icons.Invite, color: 'text-purple-500 dark:text-purple-400' },
  { id: 'insurance', label: 'Insurance', icon: Icons.Insurance, color: 'text-indigo-500 dark:text-indigo-400' },
  { id: 'loan', label: 'Loan', icon: Icons.Loan, color: 'text-purple-700 dark:text-purple-300' },
  { id: 'sync', label: 'Sync Account', icon: Icons.Sync, color: 'text-gray-500 dark:text-gray-400' },
];

interface ActionGridProps {
  onActionClick?: (id: string) => void;
}

const ActionGrid: React.FC<ActionGridProps> = ({ onActionClick }) => {
  return (
    <div className="space-y-2">
      {/* Top Row - Primary Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm grid grid-cols-4 gap-2 transition-colors duration-200">
        {topRowItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              onClick={() => onActionClick?.(item.id)}
              className="flex flex-col items-center justify-center space-y-2 cursor-pointer active:opacity-70 group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                <Icon size={24} fill="currentColor" className="text-purple-600 dark:text-purple-300" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Secondary Actions Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm grid grid-cols-4 gap-x-2 gap-y-6 transition-colors duration-200">
        {bottomGridItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              onClick={() => onActionClick?.(item.id)}
              className="flex flex-col items-center justify-start space-y-2 cursor-pointer active:opacity-70 relative"
            >
              {item.badge && (
                <div className="absolute -top-3 right-1 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-tr-lg rounded-bl-lg z-10 shadow-sm">
                    {item.badge}
                </div>
              )}
              <div className={`w-8 h-8 flex items-center justify-center ${item.color || 'text-purple-600 dark:text-purple-400'}`}>
                 {/* Using fill for solid look where appropriate, simulating the bold icons in screenshot */}
                <Icon size={28} strokeWidth={2} />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight w-full break-words px-1">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionGrid;