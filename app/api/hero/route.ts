import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch all hero slides
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        // Sort by order/sequence
        const slides = await db.collection('hero_slides').find({}).sort({ order: 1 }).toArray();

        return NextResponse.json(slides, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching hero slides:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hero slides', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create a new hero slide
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const {
            title,
            subtitle,
            image,
            order
        } = body;

        // Basic validation
        if (!title || !image) {
            return NextResponse.json(
                { error: 'Title and Image are required' },
                { status: 400 }
            );
        }

        const slide = {
            title,
            subtitle: subtitle || '',
            image,
            order: order !== undefined ? parseInt(order) : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('hero_slides').insertOne(slide);

        return NextResponse.json(
            { success: true, slide: { ...slide, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating hero slide:', error);
        return NextResponse.json(
            { error: 'Failed to create hero slide', message: error.message },
            { status: 500 }
        );
    }
}
