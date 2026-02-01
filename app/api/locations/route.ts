import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch all locations
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        // Fetch all locations
        const locations = await db.collection('locations').find({}).sort({ createdAt: -1 }).toArray();

        // Dynamically calculate propertyCount for each location
        const formattedLocations = await Promise.all(locations.map(async (loc) => {
            const count = await db.collection('properties').countDocuments({
                locationIds: { $in: [loc._id.toString(), loc._id] }
            });

            return {
                ...loc,
                id: loc._id.toString(),
                propertyCount: count // Override stored propertyCount with actual dynamic count
            };
        }));

        return NextResponse.json(formattedLocations, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching locations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch locations', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create new location
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const {
            name,
            state,
            image,
            propertyCount
        } = body;

        // Validate required fields
        if (!name || name.trim() === '') {
            return NextResponse.json(
                { error: 'Location name is required', message: 'Location name is required' },
                { status: 400 }
            );
        }
        if (!state || state.trim() === '') {
            return NextResponse.json(
                { error: 'State is required', message: 'State is required' },
                { status: 400 }
            );
        }
        if (!image || image.trim() === '') {
            return NextResponse.json(
                { error: 'Image URL is required', message: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Create location document
        const location = {
            name,
            state,
            image,
            propertyCount: propertyCount ? parseInt(propertyCount) : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Insert into database
        const result = await db.collection('locations').insertOne(location);

        return NextResponse.json(
            { success: true, location: { ...location, id: result.insertedId.toString(), _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating location:', error);
        return NextResponse.json(
            { error: 'Failed to create location', message: error.message },
            { status: 500 }
        );
    }
}
