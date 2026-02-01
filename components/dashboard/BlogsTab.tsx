'use client';

import { useState, useEffect } from 'react';

interface Blog {
  _id: string;
  title: string;
  author: string;
  authorImage?: string;
  authorBio?: string;
  date: string;
  excerpt: string;
  content?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      console.log('Fetched blogs:', data.length);
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    setShowModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog');

      alert('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts and articles</p>
        </div>
        <button
          onClick={handleAddBlog}
          className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary-dark transition shadow-lg"
        >
          + Add Blog
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first blog post</p>
            <button
              onClick={handleAddBlog}
              className="bg-brand-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary-dark transition"
            >
              Add Your First Blog
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {blog.image && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-1">{blog.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-brand-secondary hover:text-red-800"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blog Form Modal */}
      {showModal && (
        <BlogFormModal
          blog={editingBlog}
          onClose={() => {
            setShowModal(false);
            setEditingBlog(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingBlog(null);
            fetchBlogs();
          }}
        />
      )}
    </div>
  );
}

// Blog Form Modal Component
function BlogFormModal({
  blog,
  onClose,
  onSuccess,
}: {
  blog: Blog | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    author: blog?.author || '',
    authorImage: blog?.authorImage || '',
    authorBio: blog?.authorBio || '',
    date: blog?.date || new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    excerpt: blog?.excerpt || '',
    content: blog?.content || blog?.excerpt || '',
    image: blog?.image || '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.title.trim()) {
      alert('Please enter a blog title');
      return;
    }
    if (!formData.author.trim()) {
      alert('Please enter an author name');
      return;
    }
    if (!formData.excerpt.trim()) {
      alert('Please enter an excerpt');
      return;
    }

    setSubmitting(true);

    try {
      const url = blog
        ? `/api/blogs/${blog._id}`
        : '/api/blogs';
      const method = blog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.message || error.error || 'Failed to save blog';
        console.error('API Error:', error);
        throw new Error(errorMessage);
      }

      alert(blog ? 'Blog updated successfully!' : 'Blog created successfully!');
      // Small delay to ensure database is updated
      setTimeout(() => {
        onSuccess();
      }, 100);
    } catch (error: any) {
      console.error('Error saving blog:', error);
      alert(error.message || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {blog ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section: Blog Media */}
          <div>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Blog Media & Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Blog Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
                  />
                </div>
                {formData.image && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Blog Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter impact title"
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Publish Date</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Author Profile */}
          <div>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Author Profile (Newsletter Style)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Author Image URL</label>
                  <input
                    type="url"
                    value={formData.authorImage}
                    onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
                  />
                </div>
                {formData.authorImage && (
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <img src={formData.authorImage} alt="Author Preview" className="w-12 h-12 rounded-full object-cover border-2 border-brand-secondary" />
                    <span className="text-xs font-bold text-gray-400">Author Image Preview</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Author Short Bio</label>
                <textarea
                  rows={4}
                  value={formData.authorBio}
                  onChange={(e) => setFormData({ ...formData, authorBio: e.target.value })}
                  placeholder="Tell readers about the author's expertise..."
                  className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all h-[calc(100%-24px)]"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Written Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Excerpt (Short Summary)</label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A catchy summary for the listing page..."
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Newsletter Content</label>
              <textarea
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your professional insights here..."
                className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-900 font-medium transition-all"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">Cancel</button>
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark transition disabled:opacity-50 shadow-lg shadow-brand-primary/20"
            >
              {submitting ? 'Processing...' : blog ? 'Update Newsletter' : 'Publish Newsletter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

