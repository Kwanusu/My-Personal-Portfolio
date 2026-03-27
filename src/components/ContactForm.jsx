import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { sendInquiry } from '../services/api';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleDeploy = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));

    const promise = sendInquiry(data);

    toast.promise(promise, {
      loading: 'Syncing with Django backend...',
      success: () => {
        e.target.reset();
        return 'Message deployed to secure vault.';
      },
      error: 'Transmission failed. System log created.',
    });

    try {
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 container mx-auto px-6 max-w-2xl relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card border-border shadow-2xl overflow-hidden">
          <CardHeader className="pt-10">
            <CardTitle className="text-center text-4xl font-black text-primary tracking-tighter">
              Initiate <span className="italic">Project</span>
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm font-mono mt-2">
              ESTABLISHING SECURE CONNECTION...
            </p>
          </CardHeader>
          
          <CardContent className="pb-10">
            <form onSubmit={handleDeploy} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Sender Name</label>
                  <Input 
                    name="sender_name" 
                    placeholder="John Doe" 
                    className="bg-background border-border focus:border-primary/50 transition-colors" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Secure Email</label>
                  <Input 
                    name="sender_email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-background border-border focus:border-primary/50 transition-colors" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Technical Subject</label>
                <Input 
                  name="subject" 
                  placeholder="System Architecture / Integration" 
                  className="bg-background border-border focus:border-primary/50 transition-colors" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Scope Details</label>
                <Textarea 
                  name="body" 
                  placeholder="Define project requirements and technical constraints..." 
                  rows={5} 
                  className="bg-background border-border focus:border-primary/50 transition-colors resize-none" 
                  required 
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-[0.2em] py-6 rounded-xl transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Transmitting...
                  </span>
                ) : 'Deploy Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Contact;