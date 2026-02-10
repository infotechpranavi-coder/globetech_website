
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const fileUrl = request.nextUrl.searchParams.get('url');

    if (!fileUrl) {
        return NextResponse.json({ error: 'Missing file URL' }, { status: 400 });
    }

    try {
        console.log(`Proxying download for: ${fileUrl}`);
        const response = await fetch(fileUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        console.log(`Cloudinary response: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Cloudinary error body: ${errorText}`);
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'application/pdf';

        // Check if we can stream
        if (!response.body) {
            throw new Error('No response body from Cloudinary');
        }

        const headers = new Headers();
        headers.set('Content-Type', contentType);
        headers.set('Content-Disposition', `attachment; filename="brochure.pdf"`);

        // TypeScript workaround for ReadableStream
        return new NextResponse(response.body as any, {
            status: 200,
            headers,
        });

    } catch (error: any) {
        console.error('Download error:', error);
        return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }
}
