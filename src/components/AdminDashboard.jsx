import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import api from '../services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Mail, Terminal, ExternalLink } from "lucide-react";

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logRes, msgRes] = await Promise.all([
          api.get('/monitoring/logs/'),
          api.get('/communication/messages/')
        ]);
        setLogs(logRes.data);
        setMessages(msgRes.data);
      } catch (err) {
        toast.error("System sync failed. Check API connectivity.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-inter pt-20">
      <div className="container mx-auto py-10 px-6">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight">CONTROL<span className="text-[#d4af37]">.</span>CTR</h1>
            <p className="text-slate-400 mt-2">Unified system monitoring and communication hub.</p>
          </div>
          <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/5 px-4 py-1">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            SYSTEMS NOMINAL
          </Badge>
        </header>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-[#0f172a] border border-white/5 p-1 h-14">
            <TabsTrigger value="overview" className="px-8 data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              <Activity className="w-4 h-4 mr-2" /> System Health
            </TabsTrigger>
            <TabsTrigger value="messages" className="px-8 data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              <Mail className="w-4 h-4 mr-2" /> Inbound Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-[#0f172a] border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="text-[#d4af37] w-5 h-5" /> 
                  Live Deployment Logs
                </CardTitle>
                <CardDescription>Real-time event tracking from Django signals.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border border-white/10 bg-black/40 p-4">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="w-[100px] text-[#d4af37]">Status</TableHead>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead>Event Description</TableHead>
                        <TableHead className="text-right">Endpoint</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id} className="border-white/5 hover:bg-white/5 font-mono text-xs">
                          <TableCell>
                            <Badge className={log.level === 'ERROR' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}>
                              {log.level}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-slate-300">{log.message}</TableCell>
                          <TableCell className="text-right text-slate-500 italic">{log.endpoint}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid gap-6">
              {messages.map((msg) => (
                <Card key={msg.id} className="bg-[#0f172a] border-white/5 hover:border-[#d4af37]/20 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold">{msg.sender_name}</CardTitle>
                      <CardDescription>{msg.sender_email}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/5 text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 italic mb-6 leading-relaxed border-l-2 border-[#d4af37]/30 pl-4">
                      "{msg.body}"
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-[#d4af37] text-black hover:bg-[#f1c40f]">
                        Initiate Response
                      </Button>
                      <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <ExternalLink className="w-4 h-4 mr-2" /> Mark as Processed
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;