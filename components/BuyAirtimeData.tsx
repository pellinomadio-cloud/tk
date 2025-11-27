
import React, { useState } from 'react';
import { Icons } from './Icons';
import { User } from '../types';

interface BuyAirtimeDataProps {
  type: 'airtime' | 'data';
  user: User;
  onPurchase: (amount: number, description: string) => void;
  onBack: () => void;
}

const networks = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-400' },
  { id: 'glo', name: 'GLO', color: 'bg-green-500' },
  { id: 'airtel', name: 'Airtel', color: 'bg-red-500' },
  { id: '9mobile', name: '9Mobile', color: 'bg-green-700' },
];

const dataPlans = [
  { id: '100mb', name: '100MB / 1 Day', price: 100 },
  { id: '1gb', name: '1GB / 30 Days', price: 1200 },
  { id: '2gb', name: '2.5GB / 30 Days', price: 2000 },
  { id: '10gb', name: '10GB / 30 Days', price: 5000 },
  { id: 'unlimited', name: 'Unlimited / 30 Days', price: 20000 },
];

const BuyAirtimeData: React.FC<BuyAirtimeDataProps> = ({ type, user, onPurchase, onBack }) => {
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [error, setError] = useState('');

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!network) {
        setError('Please select a network provider');
        return;
    }
    if (phoneNumber.length < 11) {
        setError('Please enter a valid phone number');
        return;
    }

    let purchaseAmount = 0;
    let desc = '';

    if (type === 'airtime') {
        purchaseAmount = parseFloat(amount);
        if (!purchaseAmount || purchaseAmount < 50) {
            setError('Minimum airtime amount is ₦50');
            return;
        }
        desc = `${networks.find(n => n.id === network)?.name} Airtime - ${phoneNumber}`;
    } else {
        const plan = dataPlans.find(p => p.id === selectedPlan);
        if (!plan) {
            setError('Please select a data plan');
            return;
        }
        purchaseAmount = plan.price;
        desc = `${networks.find(n => n.id === network)?.name} Data ${plan.name} - ${phoneNumber}`;
    }

    if (purchaseAmount > user.balance) {
        setError('Insufficient balance');
        return;
    }

    setIsLoading(true);
    setTimeout(() => {
        onPurchase(purchaseAmount, desc);
        setIsLoading(false);
        setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
        <div className="px-4 py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
           <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Icons.Check size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Purchase Successful!</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Your {type === 'airtime' ? 'Airtime' : 'Data'} purchase was successful.
              </p>
          </div>
          <button 
              onClick={onBack}
              className="w-full max-w-sm bg-purple-600 text-white font-bold py-3 rounded-full shadow-md transition-all"
          >
              Done
          </button>
        </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-2 ${type === 'airtime' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {type === 'airtime' ? <Icons.Airtime size={32} /> : <Icons.Data size={32} />}
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">Buy {type}</h2>
      </div>

      <form onSubmit={handlePurchase} className="space-y-6">
        {error && (
             <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg text-center border border-red-100 dark:border-red-800 animate-pulse">
                {error}
              </div>
        )}

        {/* Network Selection */}
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 ml-1">Select Network</label>
            <div className="grid grid-cols-4 gap-2">
                {networks.map((net) => (
                    <div 
                        key={net.id}
                        onClick={() => setNetwork(net.id)}
                        className={`
                            cursor-pointer rounded-xl p-2 flex flex-col items-center justify-center border-2 transition-all
                            ${network === net.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}
                        `}
                    >
                        <div className={`w-8 h-8 rounded-full mb-1 ${net.color} shadow-sm`}></div>
                        <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300">{net.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Phone Number */}
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Phone Number</label>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.User className="h-5 w-5 text-gray-400" />
                 </div>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08012345678"
                    className="w-full pl-10 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none font-mono text-lg tracking-wide"
                />
            </div>
        </div>

        {/* Amount or Plan Selection */}
        {type === 'airtime' ? (
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Amount (₦)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100"
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-1">
                    {[100, 200, 500, 1000, 2000].map(amt => (
                        <button
                            type="button"
                            key={amt}
                            onClick={() => setAmount(amt.toString())}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 rounded-full text-xs font-bold whitespace-nowrap hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600"
                        >
                            ₦{amt}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Data Plan</label>
                <div className="space-y-2">
                    {dataPlans.map(plan => (
                        <div 
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                        >
                            <span className="font-bold text-slate-800 dark:text-white text-sm">{plan.name}</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">₦{plan.price.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <button
            type="submit"
            disabled={isLoading || !network || !phoneNumber || (type === 'airtime' ? !amount : !selectedPlan)}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white font-bold rounded-full shadow-lg shadow-purple-200 dark:shadow-none transition-all mt-4 flex items-center justify-center space-x-2"
        >
            {isLoading ? (
                <span>Processing...</span>
            ) : (
                <>
                    <span>Buy {type === 'airtime' ? 'Airtime' : 'Data'}</span>
                    <Icons.ArrowRight size={20} />
                </>
            )}
        </button>
      </form>
    </div>
  );
};

export default BuyAirtimeData;
