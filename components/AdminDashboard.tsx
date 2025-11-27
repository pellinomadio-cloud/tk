import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) {
        loadUsers();
    }
  }, [isAuthenticated]);

  const loadUsers = () => {
    const existingUsersStr = localStorage.getItem('novapay_users');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
    setUsers(Object.values(existingUsers));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demo purposes
    if (password === 'MAVELL999') {
        setIsAuthenticated(true);
        setError('');
    } else {
        setError('Invalid admin password');
    }
  };

  const handleApprove = (email: string) => {
    const plan = selectedPlans[email] || 'Monthly Plan'; // Default to monthly if not selected
    
    const existingUsersStr = localStorage.getItem('novapay_users');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
    
    if (existingUsers[email.toLowerCase()]) {
        existingUsers[email.toLowerCase()].isSubscribed = true;
        existingUsers[email.toLowerCase()].subscriptionPlan = plan;
        
        localStorage.setItem('novapay_users', JSON.stringify(existingUsers));
        
        // Refresh list
        setUsers(Object.values(existingUsers));
        alert(`Subscription approved for ${existingUsers[email.toLowerCase()].name} with ${plan}`);
    }
  };

  const handleRevoke = (email: string) => {
    if (!confirm('Are you sure you want to revoke this subscription?')) return;

    const existingUsersStr = localStorage.getItem('novapay_users');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : {};
    
    if (existingUsers[email.toLowerCase()]) {
        existingUsers[email.toLowerCase()].isSubscribed = false;
        existingUsers[email.toLowerCase()].subscriptionPlan = undefined;
        
        localStorage.setItem('novapay_users', JSON.stringify(existingUsers));
        
        // Refresh list
        setUsers(Object.values(existingUsers));
    }
  }

  if (!isAuthenticated) {
    return (
        <div className="px-4 py-10 flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full min-h-[60vh]">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                <Icons.Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h2>
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                <div>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button 
                    type="submit"
                    className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-3 rounded-xl"
                >
                    Access Dashboard
                </button>
            </form>
            <button onClick={onBack} className="text-gray-500 text-sm">Cancel</button>
        </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
            <button onClick={() => setIsAuthenticated(false)} className="text-sm text-red-500 font-medium">Logout</button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-slate-800 dark:text-white">Registered Accounts ({users.length})</h3>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                ) : (
                    users.map((user, idx) => (
                        <div key={idx} className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                    <p className="text-xs font-mono mt-1 text-gray-400">Bal: ₦{user.balance.toLocaleString()}</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${user.isSubscribed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                    {user.isSubscribed ? 'SUBSCRIBED' : 'PENDING'}
                                </div>
                            </div>

                            {user.isSubscribed ? (
                                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                        Plan: {user.subscriptionPlan || 'Unknown'}
                                    </span>
                                    <button 
                                        onClick={() => handleRevoke(user.email)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Revoke
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 pt-2">
                                    <select
                                        className="flex-1 text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white outline-none focus:border-purple-500"
                                        value={selectedPlans[user.email] || 'Monthly Plan'}
                                        onChange={(e) => setSelectedPlans({...selectedPlans, [user.email]: e.target.value})}
                                    >
                                        <option value="Weekly Plan">Weekly Plan</option>
                                        <option value="Monthly Plan">Monthly Plan</option>
                                        <option value="Yearly Plan">Yearly Plan</option>
                                    </select>
                                    <button
                                        onClick={() => handleApprove(user.email)}
                                        className="bg-purple-600 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm hover:bg-purple-700 transition-colors"
                                    >
                                        Approve
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;