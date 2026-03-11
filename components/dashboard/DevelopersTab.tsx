'use client';

import { useState, useEffect } from 'react';

interface Partner {
  _id: string;
  name: string;
  logo?: string;
}

export default function DevelopersTab() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/developers', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch partners');
      const data = await response.json();
      console.log('Fetched partners:', data.length);
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = () => {
    setEditingPartner(null);
    setShowModal(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner(partner);
    setShowModal(true);
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      const response = await fetch(`/api/developers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete partner');

      alert('Partner deleted successfully!');
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Failed to delete partner');
    }
  };

  const [zoomedLogo, setZoomedLogo] = useState<string | null>(null);

  const handleZoom = (e: React.MouseEvent, logoUrl: string) => {
    e.stopPropagation();
    setZoomedLogo(logoUrl);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading partners...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-600 mt-2">Manage your trusted industrial partners and logos</p>
        </div>
        <button
          onClick={handleAddPartner}
          className="bg-globe-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition shadow-lg"
        >
          + Add Partner
        </button>
      </div>

      {partners.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No partners yet</h3>
          <p className="text-gray-600 mb-6">Start adding your industrial partners</p>
          <button
            onClick={handleAddPartner}
            className="bg-globe-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition"
          >
            Add Your First Partner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 group relative flex flex-col items-center"
            >
              {/* Zoom Icon Button */}
              {partner.logo && (
                <button
                  onClick={(e) => handleZoom(e, partner.logo!)}
                  className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:text-globe-red hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  title="Zoom Logo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                </button>
              )}

              {partner.logo ? (
                <div className="w-full aspect-square bg-white border border-gray-100 rounded-lg mb-3 flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-xl">{partner.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <h3 className="text-sm font-bold text-gray-900 text-center truncate w-full">{partner.name}</h3>

              <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-50 w-full justify-center">
                <button
                  onClick={() => handleEditPartner(partner)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeletePartner(partner._id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Partner Form Modal */}
      {showModal && (
        <PartnerFormModal
          partner={editingPartner}
          onClose={() => {
            setShowModal(false);
            setEditingPartner(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingPartner(null);
            fetchPartners();
          }}
        />
      )}

      {/* Zoom Modal */}
      {zoomedLogo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setZoomedLogo(null)}
        >
          <div
            className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] flex items-center justify-center relative shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedLogo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-full h-full min-h-[300px] flex items-center justify-center p-8 bg-white rounded-xl">
              <img src={zoomedLogo} alt="Zoomed Logo" className="max-w-full max-h-[60vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Partner Form Modal Component
function PartnerFormModal({
  partner,
  onClose,
  onSuccess,
}: {
  partner: Partner | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    logo: partner?.logo || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append('file', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, logo: data.url });
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = partner
        ? `/api/developers/${partner._id}`
        : '/api/developers';
      const method = partner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save partner');
      }

      alert(partner ? 'Partner updated successfully!' : 'Partner added successfully!');
      // Small delay to ensure database is updated
      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (error: any) {
      console.error('Error saving partner:', error);
      alert(error.message || 'Failed to save partner');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {partner ? 'Edit Partner' : 'Add New Partner'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Partner Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Maruti Suzuki, Adani"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-globe-red focus:border-transparent text-gray-900 bg-white outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Partner Logo *
              </label>
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`px-3 py-1 text-[10px] font-bold rounded transition-all uppercase ${uploadMethod === 'url'
                    ? 'bg-white text-globe-red shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`px-3 py-1 text-[10px] font-bold rounded transition-all uppercase ${uploadMethod === 'file'
                    ? 'bg-white text-globe-red shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  Upload
                </button>
              </div>
            </div>

            {uploadMethod === 'url' ? (
              <input
                type="url"
                required
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-globe-red focus:border-transparent text-gray-900 bg-white outline-none"
              />
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-globe-red focus:border-transparent text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-globe-red file:text-white hover:file:bg-black file:cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Max file size: 2MB. Supported formats: JPG, PNG, SVG, WebP</p>
              </div>
            )}

            {formData.logo && (
              <div className="mt-4">
                <div className="w-full aspect-video bg-white border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-4 relative group">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo: '' })}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    title="Remove logo"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 font-bold hover:bg-gray-50 transition-colors text-sm uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading || !formData.logo}
              className="px-6 py-2 bg-globe-red text-white rounded-lg font-bold hover:bg-black disabled:opacity-50 transition-colors text-sm uppercase tracking-wider shadow-lg"
            >
              {submitting ? 'Saving...' : uploading ? 'Uploading...' : partner ? 'Update Partner' : 'Add Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
