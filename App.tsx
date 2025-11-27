
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ActionGrid from './components/ActionGrid';
import PromoSection from './components/PromoSection';
import Banner from './components/Banner';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import Subscribe from './components/Subscribe';
import SubscribePayment from './components/SubscribePayment';
import SendMoney from './components/SendMoney';
import SyncAccount from './components/SyncAccount';
import AdminDashboard from './components/AdminDashboard';
import TransactionHistory from './components/TransactionHistory';
import BuyAirtimeData from './components/BuyAirtimeData';
import TelegramAd from './components/TelegramAd';
import LiveNotifications from './components/LiveNotifications';
import InviteEarn from './components/InviteEarn';
import InviteAd from './components/InviteAd';
import SubscriptionNotification from './components/SubscriptionNotification';
import ChristmasNotification from './components/ChristmasNotification';
import { User, Plan, Transaction, RewardStatus } from './types';

const App: React.FC = () => {
  // Helper to get stored users safely
  const getStoredUsers = () => {
    try {
        const stored = localStorage.getItem('novapay_users');
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        return {};
    }
  };

  // Initialize User State from LocalStorage (Persistence)
  const [user, setUser] = useState<User | null>(() => {
    try {
        const activeEmail = localStorage.getItem('novapay_active_session');
        if (activeEmail) {
            const users = getStoredUsers();
            const storedUser = users[activeEmail.toLowerCase()];
            if (storedUser) {
                // Migration: Ensure transactions array exists
                if (!storedUser.transactions) {
                    storedUser.transactions = [{
                        id: 'trx-init',
                        type: 'credit',
                        amount: 10000,
                        description: 'Welcome Bonus',
                        date: new Date().toISOString(),
                        status: 'success'
                    }];
                }
                // Migration: Ensure rewardStatus exists
                if (!storedUser.rewardStatus) {
                    storedUser.rewardStatus = {
                        currentDay: 1,
                        lastClaimedTimestamp: 0
                    };
                }
                // Save migrations immediately
                users[activeEmail.toLowerCase()] = storedUser;
                localStorage.setItem('novapay_users', JSON.stringify(users));
                
                return storedUser;
            }
        }
    } catch (e) {
        console.error("Error restoring session", e);
    }
    return null;
  });

  // Initialize View based on session or existing users
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard'>(() => {
      const activeEmail = localStorage.getItem('novapay_active_session');
      const users = getStoredUsers();
      
      // If we have an active session and the user exists, go to dashboard
      if (activeEmail && users[activeEmail.toLowerCase()]) {
          return 'dashboard';
      }
      
      // If no active session but users exist on device, default to login
      if (Object.keys(users).length > 0) {
          return 'login';
      }
      
      // Default to register for fresh visitors
      return 'register';
  });

  const [activeTab, setActiveTab] = useState('home');
  // Ensure default is FALSE (Light Mode)
  const [darkMode, setDarkMode] = useState(false);
  
  // Subscription state
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Service State (Airtime/Data)
  const [serviceType, setServiceType] = useState<'airtime' | 'data'>('airtime');

  // Welcome Ad State (Only show if just registered)
  const [showWelcomeAd, setShowWelcomeAd] = useState(false);

  // Invite Ad State
  const [showInviteAd, setShowInviteAd] = useState(false);

  // Helper to save user to local storage
  const saveUserToStorage = (u: User) => {
    const existingUsers = getStoredUsers();
    existingUsers[u.email.toLowerCase()] = u;
    localStorage.setItem('novapay_users', JSON.stringify(existingUsers));
  };

  // Helper to refresh user from local storage (used after Admin updates)
  const refreshUserData = () => {
    if (user) {
        const existingUsers = getStoredUsers();
        const updatedUser = existingUsers[user.email.toLowerCase()];
        if (updatedUser) {
            // Ensure transactions/rewards exist
            if (!updatedUser.transactions) updatedUser.transactions = [];
            if (!updatedUser.rewardStatus) updatedUser.rewardStatus = { currentDay: 1, lastClaimedTimestamp: 0 };
            setUser(updatedUser);
        }
    }
  };

  const handleRegister = (name: string, email: string) => {
    const initialTransaction: Transaction = {
        id: `trx-${Date.now()}`,
        type: 'credit',
        amount: 10000.00,
        description: 'Welcome Bonus',
        date: new Date().toISOString(),
        status: 'success'
    };

    // Create new user with 10,000 bonus and NOT subscribed by default
    const newUser: User = {
      name,
      email,
      balance: 10000.00, // Bonus balance
      isSubscribed: false,
      transactions: [initialTransaction],
      rewardStatus: { currentDay: 1, lastClaimedTimestamp: 0 }
    };
    
    // Save to local storage
    saveUserToStorage(newUser);
    
    // Set Active Session
    localStorage.setItem('novapay_active_session', email.toLowerCase());

    setUser(newUser);
    setCurrentView('dashboard');
    setActiveTab('home');
    setShowWelcomeAd(true); // Trigger welcome ad for new users
  };

  const handleLogin = (email: string, name: string) => {
    // Retrieve from local storage to ensure we get the correct persistent data
    const existingUsers = getStoredUsers();
    const storedUser = existingUsers[email.toLowerCase()];

    if (storedUser) {
        // Migration: Ensure properties exist
        if (!storedUser.transactions) {
            storedUser.transactions = [{
                id: 'trx-init',
                type: 'credit',
                amount: 10000,
                description: 'Welcome Bonus',
                date: new Date().toISOString(),
                status: 'success'
            }];
        }
        if (!storedUser.rewardStatus) {
            storedUser.rewardStatus = { currentDay: 1, lastClaimedTimestamp: 0 };
        }
        saveUserToStorage(storedUser);
        setUser(storedUser);
    } else {
        // Fallback (should be handled by Login component validation, but safe to have)
        const initialTransaction: Transaction = {
            id: `trx-${Date.now()}`,
            type: 'credit',
            amount: 10000.00,
            description: 'Welcome Bonus',
            date: new Date().toISOString(),
            status: 'success'
        };
        const loggedInUser: User = {
            name: name || 'User',
            email,
            balance: 10000.00,
            isSubscribed: false,
            transactions: [initialTransaction],
            rewardStatus: { currentDay: 1, lastClaimedTimestamp: 0 }
        };
        setUser(loggedInUser);
        saveUserToStorage(loggedInUser);
    }
    
    // Set Active Session
    localStorage.setItem('novapay_active_session', email.toLowerCase());
    
    setCurrentView('dashboard');
    setActiveTab('home');
  };

  const handleLogout = () => {
    // Clear active session
    localStorage.removeItem('novapay_active_session');
    
    setUser(null);
    setCurrentView('login');
    setActiveTab('home');
  };

  const handleUpdateProfile = (updatedFields: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedFields };
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Safe access to reward status
  const rewardStatus = user?.rewardStatus || { currentDay: 1, lastClaimedTimestamp: 0 };

  const handleClaimReward = () => {
    if (!user) return;
    
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    // Check if 24 hours have passed or if it's the first time (0)
    if (now - rewardStatus.lastClaimedTimestamp >= twentyFourHours) {
        // Add 100,000 to balance
        const rewardAmount = 100000;
        const newTransaction: Transaction = {
            id: `trx-rew-${Date.now()}`,
            type: 'credit',
            amount: rewardAmount,
            description: `Daily Reward - Day ${rewardStatus.currentDay}`,
            date: new Date().toISOString(),
            status: 'success'
        };
        
        const nextDay = Math.min(rewardStatus.currentDay + 1, 100);
        
        const updatedUser = { 
            ...user, 
            balance: user.balance + rewardAmount,
            transactions: [newTransaction, ...(user.transactions || [])],
            rewardStatus: {
                lastClaimedTimestamp: now,
                currentDay: nextDay
            }
        };
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
    }
  };

  const handleInviteReward = () => {
    if (user) {
        const rewardAmount = 50000;
        const newTransaction: Transaction = {
            id: `trx-inv-${Date.now()}`,
            type: 'credit',
            amount: rewardAmount,
            description: 'Invite & Earn Reward',
            date: new Date().toISOString(),
            status: 'success'
        };

        const updatedUser = {
            ...user,
            balance: user.balance + rewardAmount,
            transactions: [newTransaction, ...(user.transactions || [])]
        };
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
        alert(`Congratulations! ₦${rewardAmount.toLocaleString()} has been added to your balance.`);
    }
  };

  const handleGridAction = (id: string) => {
    if (id === 'palmpay') {
        // "To Nova" Action -> Telegram Channel
        window.open('https://t.me/veripay99', '_blank');
    } else if (id === 'rewards') {
        setActiveTab('reward');
    } else if (id === 'subscribe') {
        setActiveTab('subscribe');
    } else if (id === 'bank') {
        setActiveTab('send_money');
    } else if (id === 'sync') {
        setActiveTab('sync_account');
    } else if (id === 'invite') {
        setActiveTab('invite_earn');
    } else if (id === 'airtime' || id === 'data') {
        if (user && user.isSubscribed) {
            setServiceType(id);
            setActiveTab('buy_service');
        } else {
            // If not subscribed, verify if we should block access
            alert("This feature is only available for subscribed users. Please subscribe to a plan.");
            setActiveTab('subscribe');
        }
    }
    // Handle other grid actions here if needed
  };
  
  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setActiveTab('subscribe_payment');
  };

  const handlePaymentComplete = () => {
    // Logic moved to Admin approval
    alert("Payment proof email generated! Please send the email with your screenshot attached.");
    setActiveTab('home');
  };

  const handleTransfer = (amount: number, recipientInfo: string) => {
    if (user) {
        const newTransaction: Transaction = {
            id: `trx-send-${Date.now()}`,
            type: 'debit',
            amount: amount,
            description: recipientInfo,
            date: new Date().toISOString(),
            status: 'success'
        };

        const updatedUser = { 
            ...user, 
            balance: user.balance - amount,
            transactions: [newTransaction, ...(user.transactions || [])]
        };
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
    }
  };

  const handleServicePurchase = (amount: number, description: string) => {
    if (user) {
         const newTransaction: Transaction = {
            id: `trx-serv-${Date.now()}`,
            type: 'debit',
            amount: amount,
            description: description,
            date: new Date().toISOString(),
            status: 'success'
        };

        const updatedUser = { 
            ...user, 
            balance: user.balance - amount,
            transactions: [newTransaction, ...(user.transactions || [])]
        };
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
    }
  };
  
  const handleRestoreAccount = (restoredUser: User) => {
    // Ensure structure
    if (!restoredUser.transactions) restoredUser.transactions = [];
    if (!restoredUser.rewardStatus) restoredUser.rewardStatus = { currentDay: 1, lastClaimedTimestamp: 0 };
    
    // Save restored user to storage
    saveUserToStorage(restoredUser);
    // Set active session
    localStorage.setItem('novapay_active_session', restoredUser.email.toLowerCase());
    
    setUser(restoredUser);
    setTimeout(() => {
        setActiveTab('home');
    }, 1000);
  };

  // Smart back button logic
  const handleBack = () => {
    if (activeTab === 'subscribe_payment') {
        setActiveTab('subscribe');
    } else if (activeTab === 'send_money') {
        setActiveTab('home');
    } else if (activeTab === 'sync_account') {
        setActiveTab('home');
    } else if (activeTab === 'buy_service') {
        setActiveTab('home');
    } else if (activeTab === 'admin') {
        // When returning from admin, refresh user to see if status changed
        refreshUserData();
        setActiveTab('home');
    } else if (activeTab === 'transaction_history') {
        setActiveTab('home');
    } else if (activeTab === 'invite_earn') {
        setActiveTab('home');
    } else if (activeTab === 'reward') {
        setActiveTab('home');
    } else {
        setActiveTab('home');
    }
  };

  // Invite Ad Timer
  useEffect(() => {
    if (currentView !== 'dashboard') return;

    const interval = setInterval(() => {
        setShowInviteAd(true);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [currentView]);

  // Views for unauthenticated users
  if (currentView === 'register') {
    return (
      <div className={darkMode ? 'dark' : ''}>
         <Register onRegister={handleRegister} onSwitchToLogin={() => setCurrentView('login')} />
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />
      </div>
    );
  }

  // Determine claimable status (24 hours cooldown)
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const isClaimable = now - rewardStatus.lastClaimedTimestamp >= twentyFourHours;

  const pageTitles: Record<string, string> = {
    'loan': 'Loans',
    'finance': 'Finance',
    'reward': 'Rewards',
    'me': 'My Profile',
    'subscribe': 'Subscribe',
    'subscribe_payment': 'Payment Details',
    'send_money': 'Transfer',
    'buy_service': serviceType === 'airtime' ? 'Buy Airtime' : 'Buy Data',
    'sync_account': 'Sync Account',
    'admin': 'Admin Panel',
    'transaction_history': 'Transactions',
    'invite_earn': 'Invite & Earn'
  };

  // Dashboard View
  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Changed bg-gray-50 to bg-gray-100 for better contrast in Light Mode */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-slate-900 dark:text-white transition-colors duration-200">
        {/* Mobile Container Wrapper */}
        <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 min-h-screen relative shadow-2xl transition-colors duration-200">
          
          {/* Main Content Area */}
          <div className="pb-24"> {/* Padding for bottom nav */}
              {/* Hide Main Header on Rewards Page to allow custom header */}
              {activeTab !== 'reward' && activeTab !== 'admin' && (
                  <Header 
                    userName={user?.name} 
                    profileImage={user?.profileImage} 
                    onLogout={handleLogout}
                    showBack={activeTab !== 'home'}
                    onBack={handleBack}
                    pageTitle={pageTitles[activeTab]}
                  />
              )}
              
              {activeTab === 'me' ? (
                 <Profile 
                    user={user!} 
                    onUpdateProfile={handleUpdateProfile}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    onLogout={handleLogout}
                 />
              ) : activeTab === 'reward' ? (
                <Rewards 
                    currentDay={rewardStatus.currentDay} 
                    canClaim={isClaimable} 
                    onClaim={handleClaimReward}
                    lastClaimedTimestamp={rewardStatus.lastClaimedTimestamp}
                    onBack={handleBack}
                />
              ) : activeTab === 'subscribe' ? (
                <Subscribe onPlanSelect={handlePlanSelect} />
              ) : activeTab === 'subscribe_payment' && selectedPlan ? (
                <SubscribePayment 
                    plan={selectedPlan} 
                    userEmail={user?.email || ''}
                    onPaymentComplete={handlePaymentComplete}
                />
              ) : activeTab === 'send_money' ? (
                <SendMoney 
                    user={user!} 
                    onTransfer={handleTransfer} 
                    onSubscribeRedirect={() => setActiveTab('subscribe')}
                    onGoHome={() => setActiveTab('home')}
                />
              ) : activeTab === 'buy_service' ? (
                 <BuyAirtimeData 
                    type={serviceType}
                    user={user!}
                    onPurchase={handleServicePurchase}
                    onBack={() => setActiveTab('home')}
                 />
              ) : activeTab === 'sync_account' ? (
                <SyncAccount 
                    user={user!} 
                    onRestore={handleRestoreAccount}
                />
              ) : activeTab === 'admin' ? (
                <AdminDashboard onBack={handleBack} />
              ) : activeTab === 'transaction_history' ? (
                <TransactionHistory user={user!} />
              ) : activeTab === 'invite_earn' ? (
                <InviteEarn 
                    onReward={handleInviteReward}
                    onBack={handleBack}
                />
              ) : (
                 <main className="px-4 py-2 space-y-4 animate-in fade-in duration-500">
                    {/* Subscription Notification for Unsubscribed Users */}
                    {!user?.isSubscribed && (
                      <SubscriptionNotification onSubscribe={() => setActiveTab('subscribe')} />
                    )}
                    
                    <BalanceCard 
                        balance={user?.balance || 0} 
                        onAdminClick={() => setActiveTab('admin')}
                        onHistoryClick={() => setActiveTab('transaction_history')}
                    />
                    <ActionGrid onActionClick={handleGridAction} />
                    <PromoSection />
                    <Banner />
                </main>
              )}
          </div>

          {/* Live Notifications (Testimonies) */}
          {currentView === 'dashboard' && <LiveNotifications />}

          {/* Festive Christmas Notification (Every ~10s) */}
          {currentView === 'dashboard' && activeTab !== 'admin' && (
             <ChristmasNotification onSubscribe={() => setActiveTab('subscribe')} />
          )}

          {/* Sticky Bottom Navigation */}
          {activeTab !== 'admin' && (
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
          )}

          {/* Telegram Ad Overlay - Shows on first register */}
          {showWelcomeAd && (
            <TelegramAd 
                onJoin={() => {
                    window.open('https://t.me/veripay99', '_blank');
                }}
                onContinue={() => setShowWelcomeAd(false)}
            />
          )}

          {/* Invite & Earn Recurring Ad - Shows every 60s, suppressed if welcome ad is on or already on invite page */}
          {showInviteAd && !showWelcomeAd && activeTab !== 'invite_earn' && (
             <InviteAd 
                onStart={() => {
                    setShowInviteAd(false);
                    setActiveTab('invite_earn');
                }}
                onClose={() => setShowInviteAd(false)}
             />
          )}

        </div>
      </div>
    </div>
  );
};

export default App;