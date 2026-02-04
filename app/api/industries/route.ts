import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all industries
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        const industries = await db.collection('industries').find({}).sort({ order: 1 }).toArray();

        return NextResponse.json(industries, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching industries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch industries', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create a new industry card
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const { name, image, order, showInFooter } = body;

        if (!name || !image) {
            return NextResponse.json(
                { error: 'Name and Image are required' },
                { status: 400 }
            );
        }

        const industry = {
            name,
            image,
            order: order !== undefined ? parseInt(order) : 0,
            showInFooter: !!showInFooter,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('industries').insertOne(industry);

        return NextResponse.json(
            { success: true, industry: { ...industry, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating industry:', error);
        return NextResponse.json(
            { error: 'Failed to create industry', message: error.message },
            { status: 500 }
        );
    }
}
