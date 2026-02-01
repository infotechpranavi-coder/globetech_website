import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// DELETE - Delete sub category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase();
    const result = await db.collection('sub_categories').deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Sub category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Sub category deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting sub category:', error);
    return NextResponse.json(
      { error: 'Failed to delete sub category', message: error.message },
      { status: 500 }
    );
  }
}


