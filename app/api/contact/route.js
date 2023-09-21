import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { _id, fullname, email, phoneNumber, dateOfBirth } = await req.json();

  try {
    await connectDB();

    // Find the document by _id
    const existingContact = await Contact.findById(_id);

    if (existingContact) {
      // Check if the provided fullname matches the fullname in the document
      if (existingContact) {
        // Update the existing contact with the provided data
        existingContact.set({
          fullname,
          email,
          phoneNumber,
          dateOfBirth,
        });

        await existingContact.save();

        return NextResponse.json({
          msg: ["Contact updated successfully"],
          success: true,
        });
      } else {
        return NextResponse.json({
          msg: ["Fullname does not match"],
          success: false,
        });
      }
    } else {
      // Create a new contact when _id doesn't match any existing contact
      const newContact = new Contact({
        fullname,
        email,
        phoneNumber,
        dateOfBirth,
      });

      await newContact.save();

      return NextResponse.json({
        msg: ["Contact created successfully"],
        success: true,
      });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to update/create contact."] });
    }
  }
}
