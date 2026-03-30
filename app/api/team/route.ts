import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all team members
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        const team = await db.collection('team').find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json(team, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching team:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team members', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create a new team member
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const { name, designation, image, showOnAbout } = body;

        if (!name || !designation || !image) {
            return NextResponse.json(
                { error: 'Name, Designation, and Image are required' },
                { status: 400 }
            );
        }

        // If this member is marked as showOnAbout, unmark others
        if (showOnAbout) {
            await db.collection('team').updateMany(
                { showOnAbout: true },
                { $set: { showOnAbout: false } }
            );
        }

        const member = {
            name,
            designation,
            image,
            showOnAbout: !!showOnAbout,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('team').insertOne(member);

        return NextResponse.json(
            { success: true, member: { ...member, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating team member:', error);
        return NextResponse.json(
            { error: 'Failed to create team member', message: error.message },
            { status: 500 }
        );
    }
}
