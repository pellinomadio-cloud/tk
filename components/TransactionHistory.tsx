
import React from 'react';
import { Icons } from './Icons';
import { User, Transaction } from '../types';

interface TransactionHistoryProps {
  user: User;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const transactions = user.transactions || [];

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Transaction History</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your recent financial activities.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            
            {/* Subscription Status - Pinned at Top */}
            {user.isSubscribed && (
                 <div className="p-4 bg-purple-50 dark:bg-purple-900/20 flex items-center justify-between border-b border-purple-100 dark:border-purple-800/50">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-none">
                            <Icons.CheckCircle size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-purple-900 dark:text-purple-100">
                                Subscription Active
                            </h4>
                            <p className="text-xs text-purple-700 dark:text-purple-300">
                                {user.subscriptionPlan || 'Premium Plan'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                            APPROVED
                        </span>
                    </div>
                </div>
            )}

            {/* Transaction List */}
            {transactions.length > 0 ? (
                transactions.map((trx) => (
                    <div key={trx.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                trx.type === 'credit' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' 
                                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
                            }`}>
                                {
                                    trx.description.includes('Welcome') ? <Icons.Gift size={20} /> : 
                                    trx.description.includes('Reward') ? <Icons.Reward size={20} /> :
                                    trx.description.includes('Airtime') ? <Icons.Airtime size={20} /> :
                                    trx.description.includes('Data') ? <Icons.Data size={20} /> :
                                    trx.type === 'credit' ? <Icons.ArrowDownLeft size={20} /> : 
                                    <Icons.ArrowUpRight size={20} />
                                }
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                                    {trx.description}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {trx.type === 'credit' ? 'Received' : 'Sent'}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-bold ${
                                trx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'
                            }`}>
                                {trx.type === 'credit' ? '+' : '-'}₦{trx.amount.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-gray-400">{formatDate(trx.date)}</p>
                        </div>
                    </div>
                ))
            ) : (
                !user.isSubscribed && (
                     <div className="p-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">No transactions found.</p>
                    </div>
                )
            )}

        </div>
      </div>
      
      {!user.isSubscribed && transactions.length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex items-start space-x-3">
            <Icons.FileText className="text-blue-500 mt-0.5" size={20} />
            <div className="flex-1">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Start Transacting</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Subscribe to a plan to unlock full features and see your history here.
                </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
