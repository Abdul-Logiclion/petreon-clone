import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import Payment from '@/app/modals/payment';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('payments').find({}).toArray();
    
    return new NextResponse(JSON.stringify({ data: result }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "An error occurred while fetching payments" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, message, amount } = body;

    if (!name || !message || !amount) {
      return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const newPayment = new Payment({ name, message, amount });
    await db.collection('payments').insertOne(newPayment);

    return new NextResponse(JSON.stringify({ data: "API called successfully.." }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "An error occurred while processing the payment" }), { status: 500 });
  }
}
