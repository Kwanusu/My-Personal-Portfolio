import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Import from your api.js
import { toast } from 'sonner';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await login(credentials);
      // Django Token Auth usually returns { token: "..." }
      localStorage.setItem('token', response.data.token);
      toast.success("Identity Verified. Access Granted.");
      navigate('/admin');
    } catch (err) {
      toast.error("Authentication Failed: Invalid Credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0f172a] border border-white/5 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <i className="fa-solid fa-shield-halved text-primary text-2xl"></i>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Authentication</h1>
          <p className="text-slate-500 text-sm mt-2">Restricted Area: Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Username</label>
            <input 
              type="text"
              required
              className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Security Key</label>
            <input 
              type="password"
              required
              className="w-full bg-dark border border-white/5 rounded-xl px-4 py-3 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button 
            disabled={isSubmitting}
            className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:bg-primary-hover transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Initialize Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;