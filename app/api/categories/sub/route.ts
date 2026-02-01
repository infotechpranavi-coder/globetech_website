import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch sub categories (optionally filtered by mainCategory)
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const mainCategory = searchParams.get('mainCategory');

    const query = mainCategory ? { mainCategory } : {};
    const categories = await db.collection('sub_categories').find(query).toArray();

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching sub categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create sub category
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const { name, mainCategory, image } = body;

    if (!name || !mainCategory) {
      return NextResponse.json(
        { error: 'Category name and main category are required' },
        { status: 400 }
      );
    }

    const category = {
      name,
      mainCategory,
      image: image || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('sub_categories').insertOne(category);

    return NextResponse.json(
      { success: true, category: { ...category, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating sub category:', error);
    return NextResponse.json(
      { error: 'Failed to create category', message: error.message },
      { status: 500 }
    );
  }
}


