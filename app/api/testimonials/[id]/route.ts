import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch single testimonial by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        const testimonial = await db.collection('testimonials').findOne({
            _id: new ObjectId(params.id),
        });

        if (!testimonial) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(testimonial, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonial', message: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update testimonial
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const updateData: any = {
            name,
            role: role || '',
            quote,
            description: description || '',
            image: image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            updatedAt: new Date(),
        };

        const result = await db.collection('testimonials').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Testimonial updated successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to update testimonial', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete testimonial
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        const result = await db.collection('testimonials').deleteOne({
            _id: new ObjectId(params.id),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Testimonial deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json(
            { error: 'Failed to delete testimonial', message: error.message },
            { status: 500 }
        );
    }
}
