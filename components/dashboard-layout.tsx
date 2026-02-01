'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'properties', label: 'Properties', icon: '🏠' },
  { id: 'plots', label: 'Plots', icon: '🗺️' },
  { id: 'hero', label: 'Hero Section', icon: '🎞️' },
  { id: 'orders', label: 'Enquiries', icon: '📋' },
  { id: 'developers', label: 'Developers', icon: '🏢' },
  { id: 'locations', label: 'Locations', icon: '🌍' },
  { id: 'blogs', label: 'Blogs', icon: '📝' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'customers', label: 'Customers', icon: '👥' },
];


export default function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Firm Name */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
              <Image
                src="/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png"
                alt="Globe-Tech Logo"
                width={250}
                height={250}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Admin Profile */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.removeItem('gs_admin_session');
                  window.location.reload();
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-brand-secondary text-brand-secondary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

