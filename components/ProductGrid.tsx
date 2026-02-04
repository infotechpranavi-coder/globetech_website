'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState, useEffect } from 'react';

const STATIC_PRODUCTS = [
    {
        title: "High Speed Doors",
        description: "Durable high-speed doors designed for efficiency, safety, and smooth operation in demanding industrial environments.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Platform Screen Doors",
        description: "Reliable platform screen doors enhancing passenger safety, station efficiency, and automated train operations worldwide.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Rolling Shutters",
        description: "Rolling shutters offering reliable protection, privacy control, and smooth operation for industrial and commercial spaces.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Boom Barriers",
        description: "Efficient boom barriers for secure access control, traffic management, and seamless vehicle flow.",
        image: "https://images.unsplash.com/photo-1590674899484-d3066d482563?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    }
];

export default function ProductGrid() {
    const [products, setProducts] = useState(STATIC_PRODUCTS);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setProducts(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-1 h-8 bg-globe-red"></div>
                            <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">Our Products</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-globe-black leading-tight">
                            Future-Ready Automation Solutions
                        </h2>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-block bg-globe-red text-white font-black py-4 px-8 rounded-sm hover:bg-black hover:text-white transition-colors text-center whitespace-nowrap uppercase tracking-wider"
                    >
                        Request Quotation
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="group flex flex-col h-full bg-globe-black overflow-hidden rounded-sm cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image Area */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                            </div>

                            {/* Text Area */}
                            <div className="flex-grow p-8 flex flex-col items-center text-center transition-colors duration-300 group-hover:bg-globe-red">
                                <h3 className="text-xl font-bold text-globe-red mb-4 group-hover:text-white transition-colors uppercase tracking-tight">
                                    {product.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors">
                                    {product.description}
                                </p>

                                <Link
                                    href={product.link}
                                    className="flex items-center gap-2 text-globe-red font-black text-xs uppercase tracking-widest group-hover:text-white transition-colors"
                                >
                                    View Details
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7M3 12h18" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
