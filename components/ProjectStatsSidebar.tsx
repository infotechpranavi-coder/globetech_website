import React from 'react';

export default function PropertyStatsSidebar() {
    const stats = [
        {
            label: "Experience",
            value: "15+ YEARS",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                </svg>
            )
        },
        {
            label: "Systems Deployed",
            value: "10,000+",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.128 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-10.607 14.712.26-1.477m10.214-11.735.261-1.478a.562.562 0 0 1 .94-.11l1.204 1.204a.562.562 0 0 1 .11.94l-1.478.261m-12.73 11.214.261-1.478a.562.562 0 0 1 .11-.94l1.204-1.204a.562.562 0 0 1 .94.11l.261 1.478" />
                </svg>
            )
        },
        {
            label: "Global Clients",
            value: "2,500+",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0 1 12 16.5c-2.998 0-5.74-1.1-7.843-2.918m0 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                </svg>
            )
        },
        {
            label: "Support Hubs",
            value: "50+ PAN India",
            icon: (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            )
        }
    ];

    return (
        <div className="w-full h-full bg-globe-black rounded-sm text-white py-8 px-4 flex flex-col items-center gap-8 shadow-2xl border-l-4 border-globe-red">
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-2 group cursor-default">
                    <div className="text-globe-red group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                    </div>
                    <div className="font-black text-xl md:text-2xl leading-tight uppercase tracking-tighter">
                        {stat.value}
                    </div>
                    {stat.label && (
                        <div className="bg-globe-red rounded-sm text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                            {stat.label}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
