import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE - Delete main category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();
    const result = await db.collection('main_categories').deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting main category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category', message: error.message },
      { status: 500 }
    );
  }
}


