import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// PUT - Update a hero slide
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = await getDatabase();
        const body = await request.json();

        const { title, subtitle, image, order } = body;

        const updateData: any = {
            updatedAt: new Date()
        };

        if (title) updateData.title = title;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (image) updateData.image = image;
        if (order !== undefined) updateData.order = parseInt(order);

        const result = await db.collection('hero_slides').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Hero slide updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating hero slide:', error);
        return NextResponse.json(
            { error: 'Failed to update hero slide', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete a hero slide
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = await getDatabase();

        const result = await db.collection('hero_slides').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Hero slide deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting hero slide:', error);
        return NextResponse.json(
            { error: 'Failed to delete hero slide', message: error.message },
            { status: 500 }
        );
    }
}
