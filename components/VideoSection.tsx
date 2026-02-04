'use client';

import { useState, useEffect } from 'react';

export default function VideoSection() {
    const [videoUrl, setVideoUrl] = useState('https://youtu.be/OaqYLdsZKTU');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const data = await response.json();
                    if (data.videoUrl) setVideoUrl(data.videoUrl);
                }
            } catch (error) {
                console.error('Error fetching video settings:', error);
            }
        };
        fetchSettings();
    }, []);

    // Convert YouTube URL to embed format if needed
    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/embed/')) return url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : url;
    };
    return (
        <section className="py-24 bg-globe-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-1 h-8 bg-globe-red"></div>
                        <span className="text-gray-400 font-black tracking-widest text-[10px] uppercase font-sans">Corporate Film</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic text-center">
                        Engineering Your <span className="text-globe-red">Future</span>
                    </h2>
                </div>

                <div className="relative w-full aspect-video rounded-sm overflow-hidden shadow-[0_0_50px_rgba(238,42,36,0.15)] border-4 border-white/5 ring-1 ring-white/10 group">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={getEmbedUrl(videoUrl)}
                        title="Globe-Tech Automation Corporate Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-globe-red opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 font-medium max-w-2xl mx-auto italic">
                        Experience the precision and power behind our automated engineering solutions in this exclusive showcase.
                    </p>
                </div>
            </div>
        </section>
    );
}
