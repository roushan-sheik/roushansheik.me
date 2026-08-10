import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Subscriber from '@/models/Subscriber';

export async function POST(request) {
  try {
    const { email, message } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }
    
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'A message is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Create new subscriber
    const newSubscriber = new Subscriber({
      email,
      message,
    });
    
    await newSubscriber.save();

    return NextResponse.json(
      { message: 'Successfully subscribed and message sent!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    );
  }
}
