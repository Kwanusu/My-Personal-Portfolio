import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCw, 
  Power, 
  ShieldAlert, 
  Mail, 
  Users, 
  ExternalLink, 
  Trash2, 
  Menu,
  X,
  Send,
  CornerUpRight,
  CheckCircle2,
  User,
  Hash,
  MessageSquare
} from 'lucide-react';
import api, { getLogs } from '../services/api'; 
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  // --- Interaction States ---
  const [replyTarget, setReplyTarget] = useState(null); 
  const [viewTarget, setViewTarget] = useState(null); 
  const [replyBody, setReplyBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchDashboardData = async (isManual = false) => {
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
      } else {
        toast.error("Message Link Offline");
      }

      if (logResult.status === 'fulfilled') {
        const data = logResult.value.data;
        setLogs(Array.isArray(data) ? data : data.results || []);
      } else {
        setLogs([]);
      }

      if (isManual) toast.success("Telemetry Synced");
    } catch (err) {
      toast.error("Critical System Failure");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const deleteMessage = async (id) => {
    try {
      await api.delete(`/communication/messages/${id}/`);
      setMessages(messages.filter(m => m.id !== id));
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
      await api.post(`/communication/messages/${replyTarget.id}/reply/`, {
        reply_body: replyBody
      });
      
      toast.success(`Response transmitted to ${replyTarget.name}`);
      setReplyTarget(null);
      setReplyBody("");
      fetchDashboardData(true); 
    } catch (err) {
      toast.error("Transmission Failed: SMTP Link Error");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-primary font-mono text-xs animate-pulse uppercase tracking-[4px]">Initializing Core</p>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-slate-200 flex font-inter overflow-hidden relative">
      
      {/* Mobile Toggle */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-primary rounded-xl text-black shadow-lg"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-72 border-r border-white/5 bg-black p-8 
        flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="text-primary font-black text-2xl mb-12 tracking-tighter flex items-center gap-2">
          <div className="w-2 h-6 bg-primary" /> CORE<span className="text-white">.</span>OS
        </div>
        
        <nav className="space-y-2 flex-1">
          {['Overview', 'Messages', 'Security Logs', 'Settings'].map((item) => (
            <button 
              key={item} 
              onClick={() => { setActiveTab(item); setMobileMenuOpen(false); }}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[2px] transition-all 
                ${activeTab === item 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[2px]"
          >
            <Power size={14} /> Terminate_Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto custom-scrollbar bg-[#0a0a0a] flex flex-col">
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-8 lg:px-12 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">{activeTab}</h1>
            <p className="text-slate-500 text-[9px] font-mono mt-1 tracking-widest">AUTH_LEVEL: ROOT_ADMIN</p>
          </div>
          
          <button 
            onClick={() => fetchDashboardData(true)}
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-primary transition-all"
          >
            <RotateCw size={16} className={`${isRefreshing ? 'animate-spin text-primary' : 'text-slate-400'}`} />
          </button>
        </header>

        <div className="p-8 lg:p-12 space-y-12">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Transmissions', val: messages.length, icon: Mail, color: 'text-blue-500' },
              { label: 'Security Events', val: logs.length, icon: ShieldAlert, color: 'text-amber-500' },
              { label: 'Active Sessions', val: '1', icon: Users, color: 'text-primary' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-[#111] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all"
              >
                <stat.icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-all ${stat.color}`} />
                <p className="text-slate-500 text-[10px] uppercase tracking-[3px] font-black mb-2">{stat.label}</p>
                <p className="text-5xl font-black text-white">{stat.val}</p>
              </motion.div>
            ))}
          </div>

          {/* Messages Table */}
          <section className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-black text-xs uppercase tracking-[4px] text-primary">Inbound Traffic</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-white/[0.02] text-slate-500 uppercase text-[9px] font-black tracking-[3px]">
                    <th className="p-6">Origin</th>
                    <th className="p-6">Payload</th>
                    <th className="p-6">Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {messages.map(msg => (
                      <motion.tr 
                        key={msg.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="hover:bg-white/[0.01] transition-colors group cursor-pointer"
                        onClick={() => setViewTarget(msg)}
                      >
                        <td className="p-6">
                          <div className="font-black text-white text-base tracking-tighter">{msg.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 lowercase">{msg.email}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-slate-300 font-bold uppercase text-[10px] tracking-widest truncate max-w-[200px]">
                            {msg.subject || 'NO_SUBJECT'}
                          </div>
                          <div className="text-[10px] text-slate-600 truncate max-w-[300px] mt-1 italic">
                            "{msg.message || msg.body}"
                          </div>
                        </td>
                        <td className="p-6">
                          {msg.is_replied ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest">
                              <CheckCircle2 size={12} /> Replied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="p-6" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => { setReplyTarget(msg); setReplyBody(""); }} 
                              className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                            >
                              <CornerUpRight size={14} />
                            </button>
                            <button 
                              onClick={() => deleteMessage(msg.id)} 
                              className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* --- View Details Slide-over --- */}
        <AnimatePresence>
          {viewTarget && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setViewTarget(null)} 
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" 
              />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
                className="fixed top-0 right-0 h-full w-full max-w-xl bg-[#0d0d0d] border-l border-white/10 z-[110] p-8 lg:p-12 shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="bg-primary/10 px-4 py-1.5 border border-primary/20 rounded-full">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Hash size={12}/> Message_ID: {viewTarget.id}
                    </span>
                  </div>
                  <button onClick={() => setViewTarget(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">Origin_Point</label>
                    <div className="flex items-center gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><User /></div>
                      <div>
                        <p className="text-xl font-black text-white tracking-tighter">{viewTarget.name}</p>
                        <p className="text-xs text-slate-500 font-mono italic lowercase">{viewTarget.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">Transmission_Header</label>
                    <p className="text-lg font-bold text-slate-200 bg-white/[0.02] p-4 rounded-xl border border-white/5 italic">
                      "{viewTarget.subject || 'No Subject Defined'}"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">Data_Payload</label>
                    <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] text-slate-300 leading-relaxed font-mono text-sm min-h-[200px] whitespace-pre-wrap">
                      {viewTarget.message || viewTarget.body}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-auto border-t border-white/5 grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { setReplyTarget(viewTarget); setViewTarget(null); setReplyBody(""); }} 
                    className="bg-primary text-black font-black uppercase text-[10px] tracking-[2px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                  >
                    <CornerUpRight size={14} /> Begin_Reply
                  </button>
                  <button 
                    onClick={() => { deleteMessage(viewTarget.id); setViewTarget(null); }} 
                    className="bg-white/5 text-red-500 font-black uppercase text-[10px] tracking-[2px] py-4 rounded-xl border border-red-500/20 flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} /> Purge_Data
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- Reply Modal Overlay --- */}
        <AnimatePresence>
          {replyTarget && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReplyTarget(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[130] p-6">
                <div className="bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <div>
                      <h3 className="text-primary font-black uppercase text-xs tracking-[4px]">Secure_Response</h3>
                      <p className="text-[9px] text-slate-500 font-mono mt-1 lowercase tracking-widest">Target: {replyTarget.email}</p>
                    </div>
                    <button onClick={() => setReplyTarget(null)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                  </div>
                  <form onSubmit={handleSendReply} className="p-8 space-y-6">
                    <textarea 
                      autoFocus 
                      value={replyBody} 
                      onChange={(e) => setReplyBody(e.target.value)}
                      placeholder="Compose transmission..."
                      className="w-full h-48 bg-black/50 border border-white/5 rounded-2xl p-6 text-sm text-slate-200 focus:outline-none focus:border-primary/50 transition-all font-mono resize-none"
                    />
                    <button 
                      disabled={isSending || !replyBody.trim()} 
                      type="submit" 
                      className="w-full bg-primary text-black font-black uppercase text-xs tracking-[3px] py-5 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-30"
                    >
                      {isSending ? <RotateCw className="animate-spin" size={18} /> : <><Send size={18} /> Transmit_Response</>}
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