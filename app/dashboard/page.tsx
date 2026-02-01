'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import PropertiesTab from '@/components/dashboard/PropertiesTab';
import OrdersTab from '@/components/dashboard/OrdersTab';
import DevelopersTab from '@/components/dashboard/DevelopersTab';
import BlogsTab from '@/components/dashboard/BlogsTab';
import CustomersTab from '@/components/dashboard/CustomersTab';
import LocationManager from '@/components/dashboard/LocationManager';
import HeroManager from '@/components/dashboard/HeroManager';
import TestimonialsTab from '@/components/dashboard/TestimonialsTab';
import PlotsTab from '@/components/dashboard/PlotsTab';
import DashboardLogin from '@/components/dashboard/DashboardLogin';
import { useEffect } from 'react';


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
    // ... switch logic remains same
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsTab />;
      case 'properties':
        return <PropertiesTab />;
      case 'hero':
        return <HeroManager />;
      case 'plots':
        return <PlotsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'developers':
        return <DevelopersTab />;
      case 'locations':
        return <LocationManager />;
      case 'blogs':
        return <BlogsTab />;
      case 'customers':
        return <CustomersTab />;
      case 'testimonials':
        return <TestimonialsTab />;
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

