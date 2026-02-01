'use client';

import { useState, useEffect } from 'react';

interface MainCategory {
  _id: string;
  name: string;
  image?: string;
  mainUse: string;
}

interface SubCategory {
  _id: string;
  name: string;
  mainCategory: string;
  image?: string;
}

export default function CategoriesTab() {
  const [activeSubTab, setActiveSubTab] = useState<'main' | 'sub'>('main');
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const [mainRes, subRes] = await Promise.all([
        fetch('/api/categories/main'),
        fetch('/api/categories/sub'),
      ]);

      if (!mainRes.ok || !subRes.ok) throw new Error('Failed to fetch categories');

      const mainData = await mainRes.json();
      const subData = await subRes.json();
      setMainCategories(mainData);
      setSubCategories(subData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMainCategories([]);
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading categories...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-2">Manage property categories and types</p>
      </div>

      {/* Sub-tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveSubTab('main')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeSubTab === 'main'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Main Categories
          </button>
          <button
            onClick={() => setActiveSubTab('sub')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeSubTab === 'sub'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Sub Categories
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeSubTab === 'main' ? (
        <MainCategoriesView
          categories={mainCategories}
          onRefresh={fetchCategories}
        />
      ) : (
        <SubCategoriesView
          categories={subCategories}
          mainCategories={mainCategories}
          onRefresh={fetchCategories}
        />
      )}
    </div>
  );
}

function MainCategoriesView({
  categories,
  onRefresh,
}: {
  categories: MainCategory[];
  onRefresh: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', image: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/categories/main', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create category');
      }

      alert('Main category created successfully!');
      setFormData({ name: '', image: '' });
      setShowModal(false);
      onRefresh();
    } catch (error: any) {
      console.error('Error creating category:', error);
      alert(error.message || 'Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/main/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete category');

      alert('Category deleted successfully!');
      onRefresh();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">Manage main property categories (e.g., Residential, Commercial)</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary-light transition"
        >
          + Add Main Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No main categories yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first main category</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary-light transition"
          >
            Add Your First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-brand-secondary hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Main Category</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Residential, Commercial"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900 bg-white"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', image: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-brand-secondary text-white rounded-lg font-semibold hover:bg-brand-secondary-dark disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SubCategoriesView({
  categories,
  mainCategories,
  onRefresh,
}: {
  categories: SubCategory[];
  mainCategories: MainCategory[];
  onRefresh: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', mainCategory: '', image: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.mainCategory) {
      alert('Please select a main category');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/categories/sub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create sub category');
      }

      alert('Sub category created successfully!');
      setFormData({ name: '', mainCategory: '', image: '' });
      setShowModal(false);
      onRefresh();
    } catch (error: any) {
      console.error('Error creating sub category:', error);
      alert(error.message || 'Failed to create sub category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sub category?')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/sub/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete sub category');

      alert('Sub category deleted successfully!');
      onRefresh();
    } catch (error) {
      console.error('Error deleting sub category:', error);
      alert('Failed to delete sub category');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">Manage property subcategories (e.g., House, Apartment, Villa)</p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary-light transition"
        >
          + Add Sub Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No sub categories yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first sub category</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary-light transition"
          >
            Add Your First Sub Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Main: {category.mainCategory}</p>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-brand-secondary hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Sub Category</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Category *
                </label>
                <select
                  required
                  value={formData.mainCategory}
                  onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select Main Category</option>
                  {mainCategories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {mainCategories.length === 0 && (
                  <p className="text-xs text-brand-secondary mt-1">
                    Please add a main category first
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., House, Apartment, Villa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900 bg-white"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ name: '', mainCategory: '', image: '' });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || mainCategories.length === 0}
                  className="px-6 py-2 bg-brand-secondary text-white rounded-lg font-semibold hover:bg-brand-secondary-dark disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Add Sub Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

