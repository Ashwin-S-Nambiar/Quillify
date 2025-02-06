import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Function to connect with the mongoDB database.
const loadDB = async () => {
    await ConnectDB();
}

loadDB();

// API Endpoint to POST/Add the email to mongoDB Database.
export async function POST(request) {
    try {
        const { email } = await request.json(); // Extract email from JSON body

        if (!email) {
            return NextResponse.json({ success: false, msg: "Email is required." });
        }

        // Check if email already exists
        const existingEmail = await EmailModel.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ success: false, exists: true, msg: "Email already subscribed." });
        }

        // Add new email
        await EmailModel.create({ email });
        return NextResponse.json({ success: true, msg: "Email subscribed." });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Server error. Please try again." });
    }
}

// API Endpoint to GET a specific email or all emails from MongoDB Database.
export async function GET(request) {
    try {
        const email = request.nextUrl.searchParams.get("email");

        if (email) {
            // Check if the email exists
            const existingEmail = await EmailModel.findOne({ email });
            return NextResponse.json({ exists: !!existingEmail });
        }

        // If no specific email is requested, return all emails
        const emails = await EmailModel.find({});
        return NextResponse.json({ emails });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Server error. Please try again." });
    }
}

// API Endpoint to DELETE the email from MongoDB Database.
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, msg: "Email ID is required for deletion." });
        }

        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, msg: "Email deleted." });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Server error. Please try again." });
    }
}
