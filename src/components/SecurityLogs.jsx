import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Lock, 
  Fingerprint,
  AlertTriangle,
  Terminal,
  Shield
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // Importing your theme hook

const SecurityLogs = ({ logs }) => {
  const { theme } = useTheme();

  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const accentColor = theme === 'amber' ? 'text-amber-500' : 'text-stone-400';
  const accentBg = theme === 'amber' ? 'bg-amber-500' : 'bg-stone-500';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Risk Overview Cards - Stone & Amber Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Threat Level', val: 'Low', icon: ShieldCheck, color: 'text-emerald-500' },
          { label: 'Blocked IPs', val: '142', icon: Lock, color: accentColor },
          { label: 'Auth Attempts', val: '28', icon: Fingerprint, color: 'text-blue-500' },
          { label: 'Uptime', val: '99.9%', icon: Zap, color: 'text-purple-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-stone-900/40 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-amber-500/20 transition-all shadow-xl">
            <stat.icon className={`absolute -right-4 -top-4 w-20 h-20 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all ${stat.color}`} />
            <p className="text-[9px] uppercase tracking-[4px] font-black text-stone-500 mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-white group-hover:text-amber-500 transition-colors">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Real-time Event Feed - HUD Style */}
        <div className="lg:col-span-8 bg-stone-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className={`font-black text-xs uppercase tracking-[4px] flex items-center gap-3 ${accentColor}`}>
              <Terminal size={16} /> Live_Event_Stream
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">System_Live</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-stone-500 uppercase text-[9px] font-black tracking-[4px] border-b border-white/5 bg-white/[0.01]">
                  <th className="p-8">Timestamp</th>
                  <th className="p-8">Event_Type</th>
                  <th className="p-8">Origin_IP</th>
                  <th className="p-8 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {logs.length > 0 ? logs.map((log, i) => (
                  <tr key={log.id || i} className="hover:bg-amber-500/[0.02] transition-colors group">
                    <td className="p-8 text-stone-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="p-8 font-bold text-stone-200 group-hover:text-amber-500 transition-colors">
                      {log.action?.replace('_', ' ').toUpperCase() || 'SYS_ACCESS'}
                    </td>
                    <td className="p-8 text-stone-500">{log.ip_address || '127.0.0.1'}</td>
                    <td className="p-8 text-right">
                      <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black tracking-tighter ${getSeverityStyles(log.severity)}`}>
                        {log.severity?.toUpperCase() || 'LOW'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-24 text-center text-stone-600 italic tracking-widest uppercase text-[10px]">
                      No security anomalies detected in current cycle.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Threat Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-stone-900/40 border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
            <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-[4px] mb-10 flex items-center gap-3">
              <Globe size={16} className={accentColor} /> Geo_Distribution
            </h4>
            <div className="space-y-8">
              {[
                { country: 'Kenya', percentage: 85, color: accentBg },
                { country: 'United States', percentage: 10, color: 'bg-blue-500/50' },
                { country: 'Germany', percentage: 5, color: 'bg-stone-700' },
              ].map((loc) => (
                <div key={loc.country} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-stone-300">{loc.country}</span>
                    <span className={accentColor}>{loc.percentage}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${loc.percentage}%` }}
                      className={`h-full ${loc.color} shadow-[0_0_10px_rgba(245,158,11,0.2)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <div>
                <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[4px] mb-2">Protocol_Warning</h4>
                <p className="text-[11px] text-red-500/60 leading-relaxed font-mono italic">
                  Unauthorized SSH attempt detected from sub-network 192.168.1.XX. Core firewall has isolated the node.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogs;