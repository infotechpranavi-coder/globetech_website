'use client';

import { useState, useEffect } from 'react';

interface PropertyStats {
  total: number;
  active: number;
  featured: number;
  outOfStock: number;
}

export default function AnalyticsTab() {
  const [stats, setStats] = useState<PropertyStats>({
    total: 0,
    active: 0,
    featured: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch properties');
      const properties = await response.json();

      const calculatedStats = {
        total: properties.length,
        active: properties.filter((p: any) => p.available).length,
        featured: properties.filter((p: any) => p.featured).length,
        outOfStock: properties.filter((p: any) => !p.available).length,
      };

      setStats(calculatedStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ total: 0, active: 0, featured: 0, outOfStock: 0 });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.total,
      icon: '🏠',
      color: 'navy',
      bgColor: 'bg-brand-primary/10',
      textColor: 'text-brand-primary',
    },
    {
      title: 'Available Properties',
      value: stats.active,
      icon: '✅',
      color: 'navy-light',
      bgColor: 'bg-brand-primary/5',
      textColor: 'text-brand-primary-light',
    },
    {
      title: 'Featured Properties',
      value: stats.featured,
      icon: '⭐',
      color: 'gold',
      bgColor: 'bg-brand-secondary/10',
      textColor: 'text-brand-secondary',
    },
    {
      title: 'Unavailable Properties',
      value: stats.outOfStock,
      icon: '❌',
      color: 'gray',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your property portfolio</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 shadow-sm border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor} mt-2`}>
                  {card.value}
                </p>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Analytics Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Insights</h2>
        <div className="text-gray-600">
          <p>Detailed analytics and insights will be displayed here.</p>
          <p className="mt-2 text-sm">This section can include charts, graphs, and detailed property statistics.</p>
        </div>
      </div>
    </div>
  );
}

