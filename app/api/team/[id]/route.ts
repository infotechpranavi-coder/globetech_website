import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE - Delete a team member
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await getDatabase();
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
        }

        const result = await db.collection('team').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Team member deleted' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting team member:', error);
        return NextResponse.json(
            { error: 'Failed to delete team member', message: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update a team member's details
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await getDatabase();
        const { id } = params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
        }

        const { name, designation, image, showOnAbout } = body;

        // If this member is marked as showOnAbout, unmark others
        if (showOnAbout) {
            await db.collection('team').updateMany(
                { _id: { $ne: new ObjectId(id) }, showOnAbout: true },
                { $set: { showOnAbout: false } }
            );
        }

        const updatedMember = {
            name,
            designation,
            image,
            showOnAbout: !!showOnAbout,
            updatedAt: new Date(),
        };

        const result = await db.collection('team').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updatedMember },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, member: result }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating team member:', error);
        return NextResponse.json(
            { error: 'Failed to update team member', message: error.message },
            { status: 500 }
        );
    }
}
