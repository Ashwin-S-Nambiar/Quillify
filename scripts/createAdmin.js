// Import necessary modules
import dotenv from 'dotenv';
import { ConnectDB } from '../lib/config/db.js';
import AdminModel from '../lib/models/AdminModel.js';
import bcrypt from 'bcryptjs';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function createAdminUser() {
    try {
        await ConnectDB();

        if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_EMAIL) {
            throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is not defined in .env.local");
        }

        const existingAdmin = await AdminModel.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const admin = new AdminModel({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword
        });

        await admin.save();
        console.log('✅ Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
}

// Call the function to create the admin user
createAdminUser();