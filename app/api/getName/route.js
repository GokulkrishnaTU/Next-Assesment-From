// api/getNames.js
import connectDB from "@/app/lib/mongodb";
import Name from "@/app/models/name";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectDB();

    // Fetch all documents from the Name collection
    const names = await Name.find();

    // Return the data as JSON
    return NextResponse.json(names);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ msg: ["Unable to fetch data."] });
  }
}
