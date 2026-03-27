import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/Login';

function App() {
  return (
    <Router> {/* Router must be the parent of everything using navigation */}
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" // Changed to /admin for simplicity, match this in your browser URL
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Toaster position="bottom-right" richColors expand={true} />
      </div>
    </Router>
  );
}

export default App;