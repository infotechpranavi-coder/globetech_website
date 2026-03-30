import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { generateSlug } from '@/lib/utils';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const db = await getDatabase();
        let { id } = params;

        // Try to find by slug first
        let product = await db.collection('products').findOne({ slug: id });

        // If not found, try by ObjectId (for legacy links)
        if (!product) {
            try {
                if (ObjectId.isValid(id)) {
                    product = await db.collection('products').findOne({ _id: new ObjectId(id) });
                }
            } catch (err) {
                // Not a valid ObjectId, ignore
            }
        }

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

        let updateData: any = { ...body, updatedAt: new Date() };

        // If title is changed, regenerate slug
        if (body.title) {
            const newSlug = generateSlug(body.title);
            updateData.slug = newSlug;
            
            // Check for uniqueness
            const existing = await db.collection('products').findOne({ 
                slug: newSlug, 
                _id: { $ne: new ObjectId(id) } 
            });
            if (existing) {
                updateData.slug = `${newSlug}-${id.slice(-4)}`;
            }
        }

        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
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
