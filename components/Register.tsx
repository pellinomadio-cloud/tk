
import React, { useState } from 'react';
import { Icons } from './Icons';

interface RegisterProps {
  onRegister: (name: string, email: string) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and max 4 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPassword(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length !== 4) {
      setError('Password must be exactly 4 digits');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister(name, email);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
           <div className="mx-auto h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-200 dark:shadow-none">
            <span className="text-white font-bold text-2xl italic">Np</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join NovaPay and get <span className="text-purple-600 dark:text-purple-400 font-bold">₦10,000</span> bonus instantly!
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg text-center border border-red-100 dark:border-red-800">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">4-digit PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all tracking-widest"
                  placeholder="Create 4-digit PIN"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    I agree to the <a href="#" className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-bold">Terms</a> and <a href="#" className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-bold">Privacy Policy</a>
                </label>
            </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg shadow-purple-200 dark:shadow-none transition-all disabled:opacity-70"
            >
              {isLoading ? 'Creating Account...' : 'Get Started'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-bold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300">
                    Login here
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
