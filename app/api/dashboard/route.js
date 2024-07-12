import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import Profile from '@/app/modals/user';

export async function GET(req) {
  try {
    let email = "";

    const url = req.url;

    const parts = url.split('param1=');

    if (parts.length > 1) {
      // Retrieve the part of the URL after 'param1='
      email = parts[1];
      console.log("Email is:", email);
    } else {
      console.error("param1 not found in the URL");
      return new NextResponse(JSON.stringify({ error: 'param1 not found in the URL' }));
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('profiles').find({ email: email }).toArray();

    if (result.length === 0) {
      console.warn(`No profile found for email: ${email}`);
      return new NextResponse(JSON.stringify({ data: 'No profile found' }));
    }

    console.log("Profile data retrieved:", result);
    return new NextResponse(JSON.stringify({ data: result }));

  } catch (err) {
    console.error("Error occurred:", err);

    if (err.message.includes('connect')) {
      console.error("Database connection error:", err);
      return new NextResponse(JSON.stringify({ error: "Database connection error" }));
    } else if (err.message.includes('empty')) {
      console.error("Database returned empty result:", err);
      return new NextResponse(JSON.stringify({ error: "Database returned empty result" }));
    } else {
      console.error("Unknown error:", err);
      return new NextResponse(JSON.stringify({ error: "An unknown error occurred" }));
    }
  }
}

export async function POST(req) {
    try {

        if (!req.body) {
            throw new Error('Request body is empty or null.');
          }


      const body = await req.json();
    const { name, email, username, profilePic, coverPic, account, paymentMethod } = body;
  
    if (!name || !email || !username || !account || !paymentMethod) {
    
        return new NextResponse(JSON.stringify({message: 'All fields are required' }));
      }


     const client = await clientPromise;
     const db = client.db();
     console.log("db connected")

    const newProfile = new Profile({ name, email, username, profilePic, coverPic, account, paymentMethod });
    await db.collection('profiles').insertOne(newProfile);

   console.log(newProfile)
      return new NextResponse(JSON.stringify({ data: "API called successfully.." }));
    } catch (err) {
      console.error(err);
      
      return new NextResponse(JSON.stringify({ error: "An error occurred" }));
    }
  }
  