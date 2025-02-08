import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ConnectDB } from '@/lib/config/db';
import AdminModel from '@/lib/models/AdminModel';

export async function POST(request) {
    try {
        await ConnectDB();
        const { email, password } = await request.json();

        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            }, { status: 401 });
        }

        const token = jwt.sign(
            { email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Create NextResponse object
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            redirect: '/admin/addproduct'  // Redirect Path
        });

        // Set the cookie in the response headers
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/', // Ensure the path is set correctly
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}