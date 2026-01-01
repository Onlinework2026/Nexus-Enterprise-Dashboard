
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@nexus.io');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white text-2xl mb-4">N</div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nexus Enterprise</h1>
          <p className="text-slate-500 mt-2">Sign in to your dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
              <input 
                required 
                type="email" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                required 
                type="password" 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                defaultValue="password123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Access Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                    role === UserRole.ADMIN 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.USER)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                    role === UserRole.USER 
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Staff User
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
             <div className="text-xs text-slate-400 text-center">
               Nexus Enterprise v4.2.0 • Build ID: 29A8F
             </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500 mt-8">
          Need help? <a href="#" className="text-indigo-600 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
