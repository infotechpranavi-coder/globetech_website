'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Contact Us</h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-sm shadow-xl border border-gray-100">
              <h2 className="text-3xl font-black text-globe-black mb-6 uppercase tracking-tight">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red"
                    placeholder="+91 82871 16904"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red"
                  >
                    <option value="">Select a subject</option>
                    <option value="industrial">Industrial Automation</option>
                    <option value="entrance">Entrance Automation</option>
                    <option value="security">High-End Security</option>
                    <option value="parking">Parking Management</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-globe-red"
                    placeholder="Tell us how we can help you with your automation needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-globe-red text-white px-8 py-4 rounded-sm font-black hover:bg-black transition shadow-lg hover:shadow-xl uppercase tracking-widest"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-sm shadow-xl border border-gray-100">
                <h2 className="text-3xl font-black text-globe-black mb-6 uppercase tracking-tight">Get in Touch</h2>
                <div className="space-y-8 font-medium">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-globe-red rounded-sm flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-globe-black mb-2 uppercase tracking-tight">Office Address</h3>
                      <p className="text-gray-500 leading-relaxed">
                        Office No. 9&10, Ace CHS,<br />
                        Plot no.58, Sector -11, Kharghar,<br />
                        Navi Mumbai - 410210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-globe-black rounded-sm flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-globe-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-globe-black mb-2 uppercase tracking-tight">Call Now</h3>
                      <p className="text-gray-500 leading-relaxed">
                        +91 82871 16904<br />
                        Mon-Sat: 10AM - 6PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-globe-red rounded-sm flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-globe-black mb-2 uppercase tracking-tight">Email Support</h3>
                      <p className="text-gray-500 leading-relaxed">
                        info@toshiautomation.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-globe-black text-white p-10 rounded-sm shadow-xl border-l-8 border-globe-red">
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Business Hours</h3>
                <div className="space-y-3 font-bold uppercase tracking-wider text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-gray-400">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-globe-red">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
