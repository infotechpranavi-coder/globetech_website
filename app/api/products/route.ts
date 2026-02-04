import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all products
export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase();
        const products = await db.collection('products').find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', message: error.message },
            { status: 500 }
        );
    }
}

// POST - Create a new product card
export async function POST(request: NextRequest) {
    try {
        const db = await getDatabase();
        const body = await request.json();

        const { title, description, image, link, showInFooter } = body;

        if (!title || !description || !image) {
            return NextResponse.json(
                { error: 'Title, Description, and Image are required' },
                { status: 400 }
            );
        }

        const product = {
            title,
            description,
            image,
            link: link || '#',
            showInFooter: !!showInFooter,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('products').insertOne(product);

        return NextResponse.json(
            { success: true, product: { ...product, _id: result.insertedId } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product', message: error.message },
            { status: 500 }
        );
    }
}
