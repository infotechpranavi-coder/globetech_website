'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import OrdersTab from '@/components/dashboard/OrdersTab';
import DevelopersTab from '@/components/dashboard/DevelopersTab';
import BlogsTab from '@/components/dashboard/BlogsTab';
import HeroManager from '@/components/dashboard/HeroManager';
import TestimonialsTab from '@/components/dashboard/TestimonialsTab';
import DashboardLogin from '@/components/dashboard/DashboardLogin';
import IndustriesTab from '@/components/dashboard/IndustriesTab';
import ProductsTab from '@/components/dashboard/ProductsTab';
import SettingsTab from '@/components/dashboard/SettingsTab';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('gs_admin_session');
    setIsAuthenticated(!!session);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsTab />;
      case 'hero':
        return <HeroManager />;
      case 'industries':
        return <IndustriesTab />;
      case 'products':
        return <ProductsTab />;
      case 'partners':
        return <DevelopersTab />;
      case 'testimonials':
        return <TestimonialsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'blogs':
        return <BlogsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <AnalyticsTab />;
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <DashboardLogin onLogin={handleLoginSuccess} />;
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
}

