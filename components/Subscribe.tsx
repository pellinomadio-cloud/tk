import React from 'react';
import { Icons } from './Icons';
import { Plan } from '../types';

interface SubscribeProps {
  onPlanSelect: (plan: Plan) => void;
}

const plans: Plan[] = [
  { id: 'weekly', name: 'Weekly Plan', price: '₦6,500', amount: '6,500 Naira', duration: '7 Days' },
  { id: 'monthly', name: 'Monthly Plan', price: '₦8,000', amount: '8,000 Naira', duration: '30 Days', recommended: true },
  { id: 'yearly', name: 'Yearly Plan', price: '₦50,000', amount: '50,000 Naira', duration: '365 Days' },
];

const Subscribe: React.FC<SubscribeProps> = ({ onPlanSelect }) => {
  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Text */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Plan</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Unlock premium features with our flexible subscription plans.</p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => onPlanSelect(plan)}
            className="relative p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-500 cursor-pointer transition-all duration-200 active:scale-[0.98]"
          >
            {plan.recommended && (
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                BEST VALUE
              </span>
            )}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{plan.duration}</p>
              </div>
              <div className="flex items-center space-x-2">
                 <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400">{plan.price}</span>
                 <Icons.ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;