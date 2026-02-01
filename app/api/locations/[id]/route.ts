import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch a single location
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = await getDatabase();

        const location = await db.collection('locations').findOne({
            _id: new ObjectId(id)
        });

        if (!location) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        // Dynamically calculate propertyCount
        const propertyCount = await db.collection('properties').countDocuments({
            locationIds: { $in: [id, new ObjectId(id)] }
        });

        return NextResponse.json({
            ...location,
            id: location._id.toString(),
            propertyCount: propertyCount // Override stored propertyCount with actual dynamic count
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching location:', error);
        return NextResponse.json(
            { error: 'Failed to fetch location', message: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update a location
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = await getDatabase();
        const body = await request.json();

        const { name, state, image, propertyCount } = body;

        const updateData: any = {
            updatedAt: new Date()
        };

        if (name) updateData.name = name;
        if (state) updateData.state = state;
        if (image) updateData.image = image;
        if (propertyCount !== undefined) updateData.propertyCount = parseInt(propertyCount);

        const result = await db.collection('locations').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Location updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating location:', error);
        return NextResponse.json(
            { error: 'Failed to update location', message: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete a location
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const db = await getDatabase();

        const result = await db.collection('locations').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Location deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting location:', error);
        return NextResponse.json(
            { error: 'Failed to delete location', message: error.message },
            { status: 500 }
        );
    }
}
