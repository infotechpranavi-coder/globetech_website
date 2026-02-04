import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch site settings
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        const settings = await db.collection('site_settings').findOne({ key: 'general' });

        return NextResponse.json(settings || { key: 'general', videoUrl: 'https://youtu.be/OaqYLdsZKTU' }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Update site settings
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const { videoUrl } = body;

        const result = await db.collection('site_settings').updateOne(
            { key: 'general' },
            {
                $set: {
                    videoUrl,
                    updatedAt: new Date()
                },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true }
        );

        return NextResponse.json(
            { success: true, message: 'Settings updated successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings', message: error.message },
            { status: 500 }
        );
    }
}
