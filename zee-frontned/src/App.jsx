import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from "./utils/index";
import { Sparkles, Home, Palette } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner";

export default function App({ children, currentPageName }) {
  const showNav = currentPageName !== 'StyleQuiz' && currentPageName !== 'StyleResult';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {showNav && (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">Zee</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <Link 
                  to={createPageUrl('Home')}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Home className="h-4 w-4 inline mr-1.5" />
                  Home
                </Link>
                <Link 
                  to={createPageUrl('StyleDashboard')}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Palette className="h-4 w-4 inline mr-1.5" />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main>
        {children}
      </main>
      
      <Toaster position="top-center" />
    </div>
  );
}