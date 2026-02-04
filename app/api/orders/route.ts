import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - Fetch all orders (with optional status filter)
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query = status && status !== 'all' ? { status } : {};
    const orders = await db
      .collection('orders')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new enquiry (from frontend contact form)
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body = await request.json();

    const newEnquiry = {
      enquiryNumber: 'ENQ-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
      propertyName: body.subject || 'General Enquiry',
      message: body.message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection('orders').insertOne(newEnquiry);

    return NextResponse.json(
      { success: true, id: result.insertedId, enquiryNumber: newEnquiry.enquiryNumber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry', message: error.message },
      { status: 500 }
    );
  }
}
