
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

interface RewardsProps {
  currentDay: number;
  canClaim: boolean;
  onClaim: () => void;
  lastClaimedTimestamp: number;
  onBack: () => void;
}

const Rewards: React.FC<RewardsProps> = ({ currentDay, canClaim, onClaim, lastClaimedTimestamp, onBack }) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Generate days 1 to 100
  const days = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {
    if (canClaim) {
        setTimeLeft('00:00:00');
        return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const nextClaimTime = lastClaimedTimestamp + twentyFourHours;
      
      const diff = nextClaimTime - now;
      
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [canClaim, lastClaimedTimestamp]);

  const progressPercentage = Math.min(((currentDay - 1) / 100) * 100, 100);

  return (
    <div className="bg-[#F5F9F6] dark:bg-gray-900 min-h-screen animate-in fade-in duration-500">
      <div className="px-4 py-4 space-y-6">
        
        {/* Header with Green Back Button */}
        <div className="flex items-center pt-2">
            <button 
                onClick={onBack} 
                className="bg-[#00C853] hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center text-sm font-bold shadow-md transition-colors"
            >
                 <Icons.ArrowLeft size={18} className="mr-2" strokeWidth={3} /> Back
            </button>
            <h1 className="ml-4 text-2xl font-bold text-[#1B5E20] dark:text-green-400">NovaPay</h1>
        </div>

        {/* Progress Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Progress: {Math.round(progressPercentage)}%</span>
                <span className="text-xs text-gray-400">{currentDay - 1}/100 days</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                    className="bg-[#00C853] h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

        {/* Green Timer/Action Card */}
        <div className="bg-[#00C853] rounded-3xl p-8 text-center text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="mb-4 bg-white rounded-full p-1 shadow-md">
                     <Icons.Clock size={32} className="text-[#D32F2F]" fill="currentColor" />
                </div>
                
                {!canClaim ? (
                    <>
                        <p className="text-white text-sm mb-2 font-medium">Next reward available in:</p>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-2 mb-2">
                             <h2 className="text-3xl font-mono font-bold tracking-widest">{timeLeft}</h2>
                        </div>
                         <div className="mt-2 px-8 py-3 bg-white/20 backdrop-blur-md text-white/70 font-bold text-lg rounded-xl border border-white/20">
                            Claimed for today
                        </div>
                    </>
                ) : (
                    <div className="mb-2 w-full">
                        <p className="text-white text-sm mb-2 font-medium">Your reward is ready!</p>
                         <button 
                            onClick={onClaim}
                            className="w-full px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xl rounded-xl transition-all border-2 border-white/30 shadow-lg animate-pulse flex items-center justify-center"
                        >
                            Ready to Claim! 🎉
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-4 gap-3 pb-10">
            {days.map((day) => {
                const isClaimed = day < currentDay;
                const isCurrent = day === currentDay;
                
                return (
                    <div 
                        key={day}
                        className={`
                            aspect-[4/5] rounded-2xl flex flex-col items-center justify-center p-1 border-2 transition-all
                            ${isClaimed 
                                ? 'bg-white dark:bg-gray-800 border-[#00C853]' 
                                : isCurrent && canClaim
                                    ? 'bg-white dark:bg-gray-800 border-[#00C853] shadow-lg transform scale-105 z-10 ring-2 ring-green-200' 
                                    : 'bg-[#F5F9F6] dark:bg-gray-800/50 border-[#00C853]/30'
                            }
                        `}
                    >
                        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">Day {day}</span>
                        <span className={`text-[9px] font-black mb-2 ${isClaimed || isCurrent ? 'text-[#00C853]' : 'text-gray-400'}`}>
                            ₦100,000
                        </span>
                        {isClaimed && (
                            <div className="flex items-center text-[8px] text-[#00C853] font-bold bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                                <span className="mr-0.5">✓</span> Claimed
                            </div>
                        )}
                         {isCurrent && !isClaimed && (
                            <span className="text-[8px] bg-[#00C853] text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                                {canClaim ? 'Ready' : 'Locked'}
                            </span>
                        )}
                        {!isClaimed && !isCurrent && (
                             <Icons.Lock size={12} className="text-gray-300" />
                        )}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
