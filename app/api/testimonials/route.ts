import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch all testimonials
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        const testimonials = await db.collection('testimonials').find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json(testimonials, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonials', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create testimonial
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const { name, role, quote, description, image } = body;

        if (!name || !quote) {
            return NextResponse.json(
                { error: 'Name and quote are required' },
                { status: 400 }
            );
        }

        const testimonial = {
            name,
            role: role || '',
            quote,
            description: description || '',
            image: image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('testimonials').insertOne(testimonial);

        return NextResponse.json(
            { success: true, testimonial: { ...testimonial, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to create testimonial', message: error.message },
            { status: 500 }
        );
    }
}
