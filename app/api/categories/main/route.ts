import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all main categories
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const categories = await db
      .collection('main_categories')
      .find({ mainUse: 'property' })
      .toArray();

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching main categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create main category
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const { name, image } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = {
      name,
      image: image || undefined,
      mainUse: 'property',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('main_categories').insertOne(category);

    return NextResponse.json(
      { success: true, category: { ...category, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating main category:', error);
    return NextResponse.json(
      { error: 'Failed to create category', message: error.message },
      { status: 500 }
    );
  }
}


