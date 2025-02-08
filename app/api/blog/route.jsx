import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
const fs = require('fs');

// Connecting with the database
const loadDB = async () => {
    await ConnectDB();
}

loadDB();

// API endpoint: GET Function to get all blogs.
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs});
    }
}

// API endpoint: POST function to upload blogs.
export async function POST(request) {
    const formData = await request.formData(); // Getting the form data.
    const timeStamp = Date.now(); // Setting the timestamp

    const image = formData.get('image'); // Getting the Image from the form.
    const imageByteData = await image.arrayBuffer(); // Converting Image to byte data.
    const buffer = Buffer.from(imageByteData);  // Ensure this imports Buffer
    const path = `./public/${timeStamp}_${image.name}`;
    
    await writeFile(path, buffer);
    const imgURL = `/${timeStamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgURL}`,
        authorImg: `${formData.get('authorImg')}`,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog added." });
}

// API endpoint: DELETE function
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);

    // Deleting Image from public folder and blog from mongodb
    fs.unlink(`./public/${blog.image}`,() => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog deleted." });
}