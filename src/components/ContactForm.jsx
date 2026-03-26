import { useState } from 'react';
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
    <section id="contact" className="py-24 container mx-auto px-6 max-w-2xl">
      <Card className="bg-[#0f172a] border-yellow-600/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-[#d4af37]">
            Initiate Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeploy} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="sender_name" placeholder="Full Name" className="bg-[#020617] border-white/10" required />
              <Input name="sender_email" type="email" placeholder="Email" className="bg-[#020617] border-white/10" required />
            </div>
            <Input name="subject" placeholder="Technical Subject" className="bg-[#020617] border-white/10" required />
            <Textarea name="body" placeholder="Project Scope / Requirements" rows={5} className="bg-[#020617] border-white/10" required />
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#d4af37] text-black hover:bg-[#f1c40f] font-bold uppercase tracking-widest"
            >
              {loading ? 'Transmitting...' : 'Deploy Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
export default Contact