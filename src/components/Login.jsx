import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/api'; 
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
      console.error("Auth Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 border border-primary/20">
            <i className="fa-solid fa-shield-halved text-primary text-2xl"></i>
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Admin <span className="text-primary italic">Authentication</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2 font-mono uppercase tracking-widest">
            Restricted Area: Authorized Personnel Only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">
              Operator Username
            </label>
            <input 
              type="text"
              required
              placeholder="admin_id"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">
              Security Key
            </label>
            <input 
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-all font-mono text-sm"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Verifying...
              </span>
            ) : "Initialize Session"}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground/40 font-mono italic">
            Connection secure via TLS 1.3 • {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;