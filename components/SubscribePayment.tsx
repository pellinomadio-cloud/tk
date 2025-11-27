
import React, { useState } from 'react';
import { Icons } from './Icons';
import { Plan } from '../types';

interface SubscribePaymentProps {
  plan: Plan;
  userEmail: string;
  onPaymentComplete: () => void;
}

const SubscribePayment: React.FC<SubscribePaymentProps> = ({ plan, userEmail, onPaymentComplete }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast notification here
  };

  const handleSubmit = () => {
    const recipient = "ukf5483@gmail.com";
    const subject = encodeURIComponent(`Subscription Payment Proof - ${plan.name}`);
    const body = encodeURIComponent(
        `Hello Admin,\n\n` +
        `I have made a payment of ${plan.price} for the ${plan.name} (${plan.duration}).\n\n` +
        `Account Email: ${userEmail}\n\n` +
        `*** IMPORTANT: PLEASE ATTACH MY PAYMENT SCREENSHOT TO THIS EMAIL ***`
    );

    // Instruct user visually before opening
    alert(`Redirecting to your Email Client. \n\nIMPORTANT: You must manually ATTACH the payment screenshot to the email draft before sending.`);
    
    // Update app state
    onPaymentComplete();

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Selected Plan Summary */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl flex justify-between items-center border border-purple-100 dark:border-purple-800/50">
        <div>
            <p className="text-xs text-purple-600 dark:text-purple-300 font-bold uppercase tracking-wide">Selected Plan</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
        </div>
        <div className="text-right">
            <p className="text-lg font-extrabold text-purple-600 dark:text-purple-400">{plan.price}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{plan.duration}</p>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3">
            <Icons.AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="space-y-1">
            <h4 className="text-sm font-bold text-red-700 dark:text-red-400">Important Payment Warning</h4>
            <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
                Do <span className="font-bold underline">NOT</span> use OPAY bank for this transaction. Please use PalmPay or any other traditional bank.
            </p>
            </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-4 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-600"></div>
        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Make Payment To</h3>
        
        <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                <div>
                    <p className="text-xs text-gray-500 mb-0.5">Account Number</p>
                    <p className="text-lg font-mono font-bold text-slate-900 dark:text-white tracking-wide">7075402374</p>
                </div>
                <button onClick={() => copyToClipboard("7075402374")} className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-md transition-colors">
                    <Icons.Copy size={18} />
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">MOMO-PSB</p>
                    </div>
                    <div>
                    <p className="text-xs text-gray-500 mb-1">Account Name</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Oluwatosin Olido</p>
                    </div>
            </div>
        </div>
      </div>

      {/* Upload Proof UI - For user verification confidence, but file is sent via email */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-900 dark:text-white">
            Verify Payment Proof
        </label>
        <div className="relative">
            <input
                type="file"
                id="proof-upload"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <label 
                htmlFor="proof-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                    fileName 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-gray-800'
                }`}
            >
                {fileName ? (
                    <div className="text-center p-4">
                        <Icons.CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-400 break-all">{fileName}</p>
                        <p className="text-xs text-green-600 mt-1">Ready to submit via Email</p>
                    </div>
                ) : (
                    <div className="text-center p-4">
                        <Icons.Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tap to select screenshot</p>
                        <p className="text-xs text-gray-400 mt-1">Select file before sending email</p>
                    </div>
                )}
            </label>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={!fileName}
        className={`w-full py-3.5 rounded-full text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 ${
            fileName 
            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none transform active:scale-95' 
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
        }`}
      >
        <Icons.Mail size={18} />
        <span>Submit via Email</span>
      </button>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-xs text-center text-blue-600 dark:text-blue-300 leading-tight">
            Clicking submit will open your email app. <br/>
            <span className="font-bold">You must manually attach the screenshot to the email.</span>
          </p>
      </div>

    </div>
  );
};

export default SubscribePayment;
