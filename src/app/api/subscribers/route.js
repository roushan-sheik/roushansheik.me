import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Subscriber from '@/models/Subscriber';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key');
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ subscribers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
