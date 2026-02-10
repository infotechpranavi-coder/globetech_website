import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        const { id } = params;

        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        const body = await request.json();
        const { id } = params;

        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...body, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        const { id } = params;

        await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
