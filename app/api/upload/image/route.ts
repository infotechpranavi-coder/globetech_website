import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: Images, PDF, MP4, WebM.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    let fileUrl;
    if (file.type === 'application/pdf') {
      const { uploadFile } = await import('@/lib/cloudinary');
      fileUrl = await uploadFile(file, 'globetech/docs');
    } else if (file.type.startsWith('video/')) {
      const { uploadVideo } = await import('@/lib/cloudinary');
      fileUrl = await uploadVideo(file, 'globetech/videos');
    } else {
      fileUrl = await uploadImage(file, 'globetech/images');
    }

    return NextResponse.json(
      { success: true, url: fileUrl },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', message: error.message },
      { status: 500 }
    );
  }
}


