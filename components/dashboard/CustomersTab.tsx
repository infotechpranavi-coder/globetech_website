'use client';

export default function CustomersTab() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">Manage customer database and information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Management</h3>
        <p className="text-gray-600 mb-6">
          Customer management features are coming soon. This section will allow you to view and manage customer information, contact details, and enquiry history.
        </p>
        <div className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-lg text-sm font-medium">
          Coming Soon
        </div>
      </div>
    </div>
  );
}


