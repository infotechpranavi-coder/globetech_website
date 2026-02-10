'use client';

import { useState, useEffect } from 'react';

interface Enquiry {
  _id: string;
  enquiryNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  propertyName: string;
  message?: string;
  status: 'new' | 'contacted' | 'site_visit' | 'negotiation' | 'booked' | 'lost';
  createdAt: string;
}

export default function OrdersTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = statusFilter !== 'all'
        ? `/api/orders?status=${statusFilter}`
        : '/api/orders';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch enquiries');
      const data = await response.json();

      // Map potential legacy data for compatibility
      const formattedData = data.map((item: any) => ({
        ...item,
        enquiryNumber: item.enquiryNumber || item.orderNumber || 'ENQ-' + item._id?.slice(-6),
        propertyName: item.propertyName || (item.items && item.items.length > 0 ? item.items[0].property : 'General Enquiry'),
      }));

      setEnquiries(formattedData);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    const matchesSearch =
      enquiry.enquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: enquiries.length,
    responded: enquiries.filter((e) => e.status !== 'new' && (e as any).status !== 'pending').length,
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-50 text-blue-700 border border-blue-100',
      contacted: 'bg-sky-50 text-sky-700 border border-sky-100',
      site_visit: 'bg-purple-50 text-purple-700 border border-purple-100',
      negotiation: 'bg-amber-50 text-amber-700 border border-amber-100',
      booked: 'bg-green-50 text-green-700 border border-green-100',
      lost: 'bg-red-50 text-red-700 border border-red-100',
      // Legacy mapping
      pending: 'bg-blue-50 text-blue-700 border border-blue-100',
      processing: 'bg-purple-50 text-purple-700 border border-purple-100',
      delivered: 'bg-green-50 text-green-700 border border-green-100',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-brand-secondary rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading enquiries...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary">Customer Enquiries & Leads</h1>
        <p className="text-gray-600 mt-2">Track property lead lifecycle from interest to booking</p>
      </div>

      {/* Lead Management Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Leads</div>
          <div className="text-3xl font-extrabold text-brand-primary mt-2">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Responded</div>
          <div className="text-3xl font-extrabold text-green-600 mt-2">{stats.responded}</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by lead number, name, property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 bg-white transition"
              />
            </div>
          </div>
          <div className="md:w-56">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 bg-white cursor-pointer"
            >
              <option value="all">🔍 All Lifecycle Stages</option>
              <option value="new">🆕 New / Pending</option>
              <option value="contacted">📞 Contacted</option>
              <option value="site_visit">🚗 Site Visit Scheduled</option>
              <option value="negotiation">🤝 In Negotiation</option>
              <option value="booked">💰 Property Booked</option>
              <option value="lost">❌ Lead Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Lead Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-6xl mb-4 opacity-50">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">New property enquiries will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Customer Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Category/Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Message/Query
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50 transition drop-shadow-sm">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-400">
                      #{enquiry.enquiryNumber.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-brand-primary">{enquiry.customer.name}</div>
                      <div className="text-xs text-gray-400">{enquiry.customer.email}</div>
                      <div className="text-[10px] text-gray-500 font-bold">{enquiry.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-700 uppercase" title={enquiry.propertyName}>
                        {enquiry.propertyName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 line-clamp-2 max-w-[300px]" title={enquiry.message}>
                        {enquiry.message || 'No message provided'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <select
                        value={enquiry.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            const response = await fetch('/api/orders', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: enquiry._id, status: newStatus }),
                            });

                            if (response.ok) {
                              // Refresh the enquiries list
                              fetchEnquiries();
                            } else {
                              alert('Failed to update status');
                            }
                          } catch (error) {
                            console.error('Error updating status:', error);
                            alert('Failed to update status');
                          }
                        }}
                        className={`px-3 py-1 text-[10px] font-extrabold rounded-full tracking-wider uppercase cursor-pointer border-2 transition-all ${getStatusBadge(enquiry.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="site_visit">Site Visit</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="booked">Booked</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

