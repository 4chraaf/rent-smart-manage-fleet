
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { direction } = useLanguage();
  
  return (
    <div className={cn("min-h-screen flex bg-background", direction === 'rtl' ? 'rtl' : 'ltr')}>
      <Sidebar />
      
      <main className="flex-1 ml-16 md:ml-64 p-6 transition-all duration-300 page-transition">
        {children}
      </main>
    </div>
  );
}
