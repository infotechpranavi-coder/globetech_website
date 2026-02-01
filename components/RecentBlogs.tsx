'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';


interface Blog {
  _id?: string;
  id?: string | number;
  title: string;
  author: string;
  authorImage?: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}

export default function RecentBlogs() {
  const [currentPage, setCurrentPage] = useState(0);
  const [databaseBlogs, setDatabaseBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo data matching the requested image design
  const demoBlogs: Blog[] = [
    {
      id: 1,
      title: "As The Real Estate Market Heats Up, Here's How First-time Buyers Can Keep Their Cool",
      author: "John Doe",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      date: "June 16, 2022",
      excerpt: "The real estate market is seeing unprecedented growth, but first-time buyers need to stay calm and follow strategic approaches to secure their dream home.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      category: "Luxury"
    },
    {
      id: 2,
      title: "Real Estate Market Heats Up, Here's How First-time Buyers Can Keep Their Cool",
      author: "Jane Smith",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      date: "June 15, 2022",
      excerpt: "Expert advice on navigating high-demand periods in the housing market and making competitive offers without overstretching.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      category: "Luxury"
    },
    {
      id: 3,
      title: "Here's How First-time Buyers Can Keep Their Cool As The Real Estate Market Heats Up",
      author: "Michael Brown",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      date: "June 13, 2022",
      excerpt: "Stay updated with the latest trends and market shifts that affect property valuations and buyer sentiment in today's landscape.",
      image: "https://images.unsplash.com/photo-1600607687940-472002695530?w=800&h=600&fit=crop",
      category: "Market Trends"
    }
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        const formatted: Blog[] = data.map((blog: any) => ({
          _id: blog._id,
          id: blog._id,
          title: blog.title,
          author: blog.author || "John Doe",
          authorImage: blog.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          date: blog.date || new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          excerpt: blog.excerpt,
          image: blog.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
          category: blog.category || "General"
        }));
        setDatabaseBlogs(formatted);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prioritize demo data for now as requested by user
  const blogs = [...databaseBlogs, ...demoBlogs].slice(0, 3);

  // Assuming we show 3 blogs per page as per the provided image
  const totalPages = Math.ceil(blogs.length / 3);
  const currentBlogs = blogs.slice(currentPage * 3, (currentPage * 3) + 3);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center">
            <span className="text-gray-400 relative inline-block">
              Blogs
              <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-secondary"></span>
            </span>
            <span className="text-gray-900 ml-4">Latest News & Update</span>
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            Latest News About Real Estate
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog, index) => (
            <div key={blog.id || index} className="group">
              {/* Blog Image with Author Overlay */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Author Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center bg-black/20 backdrop-blur-sm rounded-full py-1 pl-1 pr-3 border border-white/20">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 mr-2">
                    <img src={blog.authorImage} alt={blog.author} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white text-xs font-semibold">By {blog.author}</span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="space-y-3">
                <p className="text-gray-500 text-sm font-medium">
                  {blog.date}
                </p>
                <Link href={`/blogs/${blog.id}`} className="block">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-secondary transition-colors cursor-pointer line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <div className="pt-2">
                  <a href="#" className="text-brand-secondary font-bold text-sm uppercase tracking-wider hover:text-brand-secondary-dark transition-colors">
                    {blog.category}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Slider Controls */}
        <div className="flex flex-col items-center mt-16">
          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-full border border-gray-100">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-secondary hover:bg-white transition shadow-sm"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentPage === index ? 'w-8 bg-brand-secondary shadow-lg shadow-brand-secondary/20' : 'w-2 bg-brand-secondary/20'
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-secondary text-white hover:bg-brand-secondary-dark transition shadow-lg shadow-brand-secondary/20"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

