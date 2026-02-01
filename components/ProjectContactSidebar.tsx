'use client';

import React, { useState } from 'react';

export default function PropertyContactSidebar() {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div className="flex flex-col gap-6">
            {/* Consultation Card */}
            <div className="bg-globe-black rounded-sm p-6 text-white shadow-xl border-t-4 border-globe-red">
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight leading-tight">Expert Consultation</h3>
                <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest leading-relaxed">Requested technical consultation? Our experts will contact you immediately.</p>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-globe-red transition-all"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-globe-red text-white font-black py-4 rounded-sm hover:bg-white hover:text-globe-black transition shadow-lg uppercase tracking-widest text-xs">
                        Request Callback
                    </button>
                </div>
            </div>

            {/* Audit / Site Visit Card */}
            <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100">
                <div className="flex border-b border-gray-100">
                    <button className="flex-1 py-4 text-[10px] font-black text-globe-black border-b-2 border-globe-red uppercase tracking-widest">
                        Book Technical Audit
                    </button>
                    <button className="flex-1 py-4 text-[10px] font-black text-gray-400 hover:text-globe-red uppercase tracking-widest">
                        Online Demo
                    </button>
                </div>

                <div className="p-5 space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value="System Health Audit"
                            className="w-full bg-gray-50 text-globe-black px-4 py-3 rounded-sm text-xs font-black uppercase tracking-widest border border-gray-100"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-globe-red">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Select Date"
                            className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-sm text-globe-black text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-globe-red border border-gray-100"
                            defaultValue="SCHEDULE NOW"
                        />
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Audit Benefits:</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-globe-red rounded-full mt-1.5"></div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider leading-relaxed">Free System Performance Evaluation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-globe-red rounded-full mt-1.5"></div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider leading-relaxed">On-Site Security Assessment</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-globe-red rounded-full mt-1.5"></div>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider leading-relaxed">Custom Automation Roadmap Deployment</span>
                            </li>
                        </ul>
                    </div>

                    <button className="w-full bg-globe-black text-white font-black py-4 rounded-sm hover:bg-globe-red transition shadow-lg uppercase tracking-widest text-xs">
                        Schedule Audit
                    </button>
                </div>
            </div>
        </div>
    );
}
