'use client';

import { usePathname } from 'next/navigation';
import QuickAccessSidebar from './QuickAccessSidebar';
import FloatingActions from './FloatingActions';

export default function GlobalActionWrapper() {
    const pathname = usePathname();
    
    // Do not show on dashboard pages
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    return (
        <>
            <QuickAccessSidebar />
            <FloatingActions />
        </>
    );
}
