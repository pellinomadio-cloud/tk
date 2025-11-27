
import React, { useState } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface SendMoneyProps {
  user: User;
  onTransfer: (amount: number, recipientInfo: string) => void;
  onSubscribeRedirect: () => void;
  onGoHome: () => void;
}

const banks = [
  "OPAY",
  "PALMPAY",
  "KUDA",
  "MONIEPOINT",
  "Access Bank",
  "GTBank",
  "Zenith Bank",
  "UBA",
  "First Bank",
  "Fidelity Bank",
  "Union Bank",
  "FCMB",
  "Sterling Bank"
];

const SendMoney: React.FC<SendMoneyProps> = ({ user, onTransfer, onSubscribeRedirect, onGoHome }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate account name lookup
  const handleAccountNumberBlur = () => {
    if (accountNumber.length === 10) {
       // Simulate looking up name
       if (!accountName) setAccountName("NOVA USER");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user.isSubscribed) {
        setError("Subscription Required");
        return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
        setError("Please enter a valid amount");
        return;
    }

    if (transferAmount > user.balance) {
        setError("Insufficient funds");
        return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        onTransfer(transferAmount, `Transfer to ${bank} - ${accountName}`);
        setIsLoading(false);
        setStep('success');
    }, 1500);
  };

  if (!user.isSubscribed && step === 'form') {
      return (
        <div className="px-4 py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
                <Icons.Lock size={40} className="text-red-500" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Feature Locked</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    You must subscribe to a premium plan to perform bank transfers.
                </p>
            </div>
            <button 
                onClick={onSubscribeRedirect}
                className="w-full max-w-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full shadow-lg shadow-purple-200 dark:shadow-none transition-all"
            >
                Subscribe Now
            </button>
             <button 
                onClick={onGoHome}
                className="text-gray-500 text-sm font-medium hover:text-purple-600 transition-colors"
            >
                Go Back Home
            </button>
        </div>
      );
  }

  if (step === 'success') {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
         <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-20 animate-ping"></div>
            <Icons.Check size={48} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Transfer Successful!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                You successfully sent <span className="font-bold text-slate-900 dark:text-white">₦{parseFloat(amount).toLocaleString()}</span> to {accountName}.
            </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl w-full max-w-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500">Bank</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">{bank}</span>
            </div>
             <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500">Account</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">{accountNumber}</span>
            </div>
            <div className="flex justify-between py-2">
                <span className="text-xs text-gray-500">Transaction ID</span>
                <span className="text-xs font-mono text-slate-800 dark:text-white">TRX-{Math.floor(Math.random() * 100000000)}</span>
            </div>
        </div>
        <button 
            onClick={onGoHome}
            className="w-full max-w-sm bg-gray-900 dark:bg-purple-600 text-white font-bold py-3 rounded-full shadow-md transition-all"
        >
            Done
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send to Bank</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
             <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg text-center border border-red-100 dark:border-red-800 animate-pulse">
                {error}
              </div>
        )}

        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Select Bank</label>
            <div className="relative">
                <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    required
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl appearance-none text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                    <option value="" disabled>Choose a bank</option>
                    {banks.map(b => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
                <Icons.ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90" size={20} />
            </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Account Number</label>
            <input
                type="number"
                value={accountNumber}
                onChange={(e) => {
                    if (e.target.value.length <= 10) setAccountNumber(e.target.value);
                }}
                onBlur={handleAccountNumberBlur}
                placeholder="0123456789"
                required
                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none font-mono text-lg tracking-wider"
            />
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${accountNumber.length === 10 || accountName ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Account Name</label>
            <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Receiver Name"
                required
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-purple-500 outline-none"
            />
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Amount</label>
            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-bold">₦</span>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full p-3 pl-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">
                Balance: ₦{user.balance.toLocaleString()}
            </p>
        </div>

        <button
            type="submit"
            disabled={isLoading || !bank || !accountNumber || !amount}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white font-bold rounded-full shadow-lg shadow-purple-200 dark:shadow-none transition-all mt-4 flex items-center justify-center space-x-2"
        >
            {isLoading ? (
                <span>Processing...</span>
            ) : (
                <>
                    <span>Transfer Money</span>
                    <Icons.ArrowUpRight size={20} />
                </>
            )}
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
