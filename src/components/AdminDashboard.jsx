import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCw, Power, ShieldAlert, Mail, Trash2, Menu, X, Send, 
  CornerUpRight, CheckCircle2, User, Hash, Shield, 
  LayoutDashboard, Settings, Terminal, Activity,
  Sun, Moon 
} from 'lucide-react';
import api, { getLogs } from '../services/api'; 
import { toast } from 'sonner';
import SecurityLogs from './SecurityLogs';
import { useTheme } from "../context/ThemeContext";

const AdminDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const [replyTarget, setReplyTarget] = useState(null); 
  const [viewTarget, setViewTarget] = useState(null); 
  const [replyBody, setReplyBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const accentColor = theme === 'amber' ? 'text-amber-500' : 'text-stone-400';
  const accentBg = theme === 'amber' ? 'bg-amber-500' : 'bg-stone-200';
  const accentBorder = theme === 'amber' ? 'border-amber-500/20' : 'border-stone-500/20';

  const fetchDashboardData = useCallback(async (isManual = false) => {
    if (!isManual) setLoading(true);
    setIsRefreshing(true);
    try {
      const [msgResult, logResult] = await Promise.allSettled([
        api.get('/communication/messages/'),
        getLogs()
      ]);
      if (msgResult.status === 'fulfilled') {
        const data = msgResult.value.data;
        setMessages(Array.isArray(data) ? data : data.results || []);
      }
      if (logResult.status === 'fulfilled') {
        const data = logResult.value.data;
        setLogs(Array.isArray(data) ? data : data.results || []);
      }
      if (isManual) toast.success("Telemetry Synced");
    } catch (err) {
      toast.error("Critical System Failure");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/communication/messages/${id}/`);
      setMessages(prev => prev.filter(m => m.id !== id));
      toast.success("Transmission Purged");
    } catch (err) {
      toast.error("Action Denied");
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return toast.error("Payload Empty");
    setIsSending(true);
    try {
      await api.post(`/communication/messages/${replyTarget.id}/reply/`, { reply_body: replyBody });
      toast.success(`Response transmitted`);
      setReplyTarget(null);
      setReplyBody("");
      fetchDashboardData(true); 
    } catch (err) {
      toast.error("Transmission Failed");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return (
    <div className={`h-screen w-full flex flex-col items-center justify-center gap-6 ${theme === 'amber' ? 'bg-[#0c0a09]' : 'bg-black'}`}>
      <div className="relative">
        <div className="h-16 w-16 border-2 border-stone-900 rounded-full" />
        <div className={`absolute inset-0 h-16 w-16 border-t-2 ${theme === 'amber' ? 'border-amber-500' : 'border-stone-400'} rounded-full animate-spin`} />
      </div>
      <p className={`${accentColor} font-mono text-[9px] animate-pulse uppercase tracking-[8px]`}>Initializing_Core</p>
    </div>
  );

  return (
    // FIX: Ensure 'flex' is present on this wrapper
    <div className={`flex h-screen w-full transition-colors duration-700 font-inter overflow-hidden relative ${theme === 'amber' ? 'bg-[#0c0a09]' : 'bg-black'}`}>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] lg:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 z-[90] w-72 border-r border-white/5 bg-[#0c0a09] p-8 flex flex-col transition-transform duration-500 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`font-black text-2xl mb-12 tracking-tighter flex items-center gap-3 ${accentColor}`}>
          <Terminal className="w-8 h-8" /> <span>CORE<span className="text-white">.OS</span></span>
        </div>
        <nav className="space-y-2 flex-1">
          {[
            { id: 'Overview', icon: LayoutDashboard },
            { id: 'Messages', icon: Mail },
            { id: 'Security Logs', icon: Shield },
            { id: 'Settings', icon: Settings }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }} 
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all group ${activeTab === item.id ? (theme === 'amber' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-stone-200 text-black shadow-lg') : 'text-stone-500 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={16} /> {item.id}
            </button>
          ))}
        </nav>
        <div className="pt-8 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-stone-500 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[2px]"><Power size={14} /> Terminate_Session</button>
        </div>
      </aside>

      {/* FIX: Ensure 'flex-1' and 'flex flex-col' are present */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="bg-inherit border-b border-white/5 px-8 lg:px-12 py-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden ${accentColor}`}><Menu size={24} /></button>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">{activeTab}</h1>
              <p className="text-stone-500 text-[9px] font-mono mt-1 tracking-widest uppercase italic">Node_Protocol: {theme}_standard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'amber' ? 'stone' : 'amber')}
              className="p-3 bg-stone-900 border border-white/10 rounded-xl hover:border-white/20 transition-all text-stone-400 group"
            >
              <AnimatePresence mode="wait">
                {theme === 'amber' ? (
                  <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}><Sun size={18} className="text-amber-500" /></motion.div>
                ) : (
                  <motion.div key="moon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}><Moon size={18} className="text-stone-400" /></motion.div>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => fetchDashboardData(true)} className="p-3 bg-stone-900 border border-white/10 rounded-xl hover:border-white/20 transition-all">
              <RotateCw size={18} className={`${isRefreshing ? 'animate-spin' : 'text-stone-400'} ${isRefreshing && accentColor}`} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 space-y-12">
          {activeTab === 'Overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Transmissions', val: messages.length, icon: Mail, color: 'text-blue-500' },
                  { label: 'Security Events', val: logs.length, icon: ShieldAlert, color: theme === 'amber' ? 'text-amber-500' : 'text-stone-400' },
                  { label: 'Node Status', val: '01', icon: Activity, color: accentColor }
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-stone-900/40 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/10 transition-all">
                    <stat.icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-all ${stat.color}`} />
                    <p className="text-stone-500 text-[9px] uppercase tracking-[4px] font-black mb-2">{stat.label}</p>
                    <p className="text-6xl font-black text-white">{stat.val}</p>
                  </motion.div>
                ))}
              </div>

              <section className="bg-stone-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                  <h3 className={`font-black text-xs uppercase tracking-[4px] ${accentColor}`}>Inbound_Traffic</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm min-w-[900px]">
                    <thead>
                      <tr className="bg-white/[0.02] text-stone-500 uppercase text-[9px] font-black tracking-[4px] border-b border-white/5">
                        <th className="p-8">Origin</th>
                        <th className="p-8">Payload_Header</th>
                        <th className="p-8">Status</th>
                        <th className="p-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {messages.map(msg => (
                        <tr key={msg.id} className="hover:bg-white/[0.01] transition-colors cursor-pointer group" onClick={() => setViewTarget(msg)}>
                          <td className="p-8">
                            <div className="font-black text-white text-lg tracking-tighter group-hover:text-amber-500 transition-colors">{msg.name}</div>
                            <div className="text-[10px] text-stone-500 font-mono mt-0.5 lowercase">{msg.email}</div>
                          </td>
                          <td className="p-8">
                            <div className="text-stone-200 font-bold uppercase text-[10px] tracking-widest truncate max-w-[200px]">{msg.subject || 'NULL_HEADER'}</div>
                            <div className="text-[10px] text-stone-600 truncate max-w-[300px] mt-1 italic font-mono">"{msg.message || msg.body}"</div>
                          </td>
                          <td className="p-8">
                            <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${msg.is_replied ? 'text-emerald-500' : (theme === 'amber' ? 'text-amber-500' : 'text-stone-400')}`}>
                              {msg.is_replied ? <CheckCircle2 size={14} /> : <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'amber' ? 'bg-amber-500' : 'bg-stone-400'}`} />}
                              {msg.is_replied ? 'Replied' : 'Pending'}
                            </span>
                          </td>
                          <td className="p-8 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => { setReplyTarget(msg); setReplyBody(""); }} className={`h-10 w-10 rounded-xl bg-black border border-white/5 flex items-center justify-center transition-all ${theme === 'amber' ? 'hover:bg-amber-500 hover:text-black' : 'hover:bg-white hover:text-black'}`}><CornerUpRight size={16} /></button>
                              <button onClick={() => deleteMessage(msg.id)} className="h-10 w-10 rounded-xl bg-black border border-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeTab === 'Security Logs' && <SecurityLogs logs={logs} />}

          {activeTab === 'Messages' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <section className="bg-stone-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
                 <div className="p-8 border-b border-white/5"><h3 className={`font-black text-xs uppercase tracking-[4px] ${accentColor}`}>Complete_Archive</h3></div>
                 <div className="p-24 text-center text-stone-600 text-[10px] tracking-[5px] uppercase font-mono">Archive_Stream_Locked</div>
               </section>
            </div>
          )}

          {activeTab === 'Settings' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-4xl space-y-12 animate-in fade-in duration-700"
            >
              {/* Visual Protocol Section */}
              <section className="bg-stone-900/40 border border-white/5 rounded-[2.5rem] p-10">
                <h3 className={`font-black text-[10px] uppercase tracking-[4px] mb-8 ${accentColor}`}>
                  Visual_Protocol_Config
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Interface_Mode</label>
                    <div className="flex gap-4 p-2 bg-black rounded-2xl border border-white/5">
                      {['amber', 'stone'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            theme === t 
                              ? (t === 'amber' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-stone-200 text-black shadow-lg')
                              : 'text-stone-500 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Telemetry_Frequency</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl p-4 text-[10px] font-mono text-stone-300 outline-none focus:border-white/20 appearance-none">
                      <option>REALTIME_STREAM</option>
                      <option>INTERVAL_60S</option>
                      <option>MANUAL_SYNC_ONLY</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Connectivity Section */}
              <section className="bg-stone-900/40 border border-white/5 rounded-[2.5rem] p-10">
                <h3 className={`font-black text-[10px] uppercase tracking-[4px] mb-8 ${accentColor}`}>
                  Endpoint_Gateways
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-black rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'amber' ? 'bg-amber-500' : 'bg-stone-400'}`} />
                      <div>
                        <p className="text-white text-[11px] font-black uppercase">Primary_REST_Node</p>
                        <p className="text-[10px] text-stone-600 font-mono italic lowercase">api.innovet.tech/v1/communication</p>
                      </div>
                    </div>
                    <Settings size={14} className="text-stone-700 group-hover:text-stone-400 cursor-pointer transition-colors" />
                  </div>
                </div>
              </section>

              {/* Danger Zone */}
              <section className="border border-red-500/20 bg-red-500/[0.02] rounded-[2.5rem] p-10">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert className="text-red-500" size={18} />
                  <h3 className="font-black text-[10px] uppercase tracking-[4px] text-red-500">Terminal_Destruct</h3>
                </div>
                <p className="text-[10px] text-stone-600 mb-8 font-mono italic leading-relaxed">
                  Executing these actions will permanently purge local cache and session tokens. 
                  Re-authorization will be required immediately.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    Purge_Cache
                  </button>
                  <button onClick={handleLogout} className="px-8 py-4 border border-white/10 text-stone-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
                    Hard_Reset
                  </button>
                </div>
              </section>
            </motion.div>
          )}
        </div>

        {/* View Details Slide-over */}
        <AnimatePresence>
          {viewTarget && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewTarget(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed top-0 right-0 h-full w-full max-w-xl bg-stone-950 border-l border-white/10 z-[110] p-12 flex flex-col">
                <div className="flex justify-between items-center mb-16">
                  <div className={`px-4 py-2 border rounded-xl ${accentBorder}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${accentColor}`}><Hash size={12}/> SIG_ID: {viewTarget.id}</span>
                  </div>
                  <button onClick={() => setViewTarget(null)} className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-all"><X size={24} /></button>
                </div>
                <div className="space-y-10 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-stone-500 uppercase tracking-[4px]">Source_Origin</label>
                    <div className="flex items-center gap-6 bg-black p-8 rounded-[2rem] border border-white/5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${theme === 'amber' ? 'bg-amber-500/20 text-amber-500' : 'bg-stone-500/20 text-stone-400'}`}><User size={28}/></div>
                      <div>
                        <p className="text-2xl font-black text-white tracking-tighter">{viewTarget.name}</p>
                        <p className="text-[11px] text-stone-500 font-mono italic lowercase">{viewTarget.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-stone-500 uppercase tracking-[4px]">Raw_Payload</label>
                    <div className="bg-black border border-white/5 p-8 rounded-[2.5rem] text-stone-300 font-mono text-sm min-h-[250px] whitespace-pre-wrap leading-relaxed">{viewTarget.message || viewTarget.body}</div>
                  </div>
                </div>
                <div className="pt-8 mt-auto border-t border-white/5 grid grid-cols-2 gap-4">
                  <button onClick={() => { setReplyTarget(viewTarget); setViewTarget(null); }} className={`${accentBg} text-black font-black uppercase text-[10px] py-5 rounded-2xl`}>Begin_Reply</button>
                  <button onClick={() => { deleteMessage(viewTarget.id); setViewTarget(null); }} className="bg-white/5 text-red-500 font-black uppercase text-[10px] py-5 rounded-2xl border border-red-500/20">Purge_Data</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Reply Modal */}
        <AnimatePresence>
          {replyTarget && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReplyTarget(null)} className="fixed inset-0 bg-black/95 backdrop-blur-md z-[120]" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed inset-0 flex items-center justify-center z-[130] p-6">
                <div className="bg-stone-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl w-full max-w-2xl">
                  <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <div>
                      <h3 className={`font-black uppercase text-xs tracking-[5px] ${accentColor}`}>Secure_Response</h3>
                      <p className="text-[10px] text-stone-500 font-mono mt-2 lowercase">Target: {replyTarget.email}</p>
                    </div>
                    <button onClick={() => setReplyTarget(null)} className="text-stone-500 hover:text-white transition-colors"><X size={24}/></button>
                  </div>
                  <form onSubmit={handleSendReply} className="p-10 space-y-8">
                    <textarea value={replyBody} onChange={(e) => setReplyBody(e.target.value)} placeholder="Compose transmission payload..." className="w-full h-56 bg-black border border-white/10 rounded-3xl p-8 text-sm text-stone-200 focus:outline-none focus:border-white/20 font-mono resize-none shadow-inner" />
                    <button disabled={isSending || !replyBody.trim()} type="submit" className={`w-full ${accentBg} text-black font-black uppercase text-[11px] py-6 rounded-3xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all`}>
                      {isSending ? <RotateCw className="animate-spin" size={20} /> : <><Send size={20} /> Transmit_Response</>}
                    </button>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;