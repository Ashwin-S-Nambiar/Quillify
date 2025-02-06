import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { TextEncoder } from 'text-encoding';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (isAdminRoute) {
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            console.log('No token found, redirecting to /admin/login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // Verify the JWT using 'jose' library
            await jwtVerify(token, secret);
            console.log('Token is valid, proceeding...');
            return NextResponse.next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*'
};