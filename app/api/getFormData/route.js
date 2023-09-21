// api/getNames.js
import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Fetch all documents from the Name collection
    const contact = await Contact.find();

    // Return the data as JSON
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ msg: ["Unable to fetch data."] });
  }
}
