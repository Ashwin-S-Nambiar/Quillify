'use client'

import { usePathname } from "next/navigation";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/adminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    return(
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            <ToastContainer theme="dark" />
            
            {/* Sidebar (hidden on /admin/login) */}
            {!isLoginPage && (
                <div className="md:w-64 md:block z-40">
                    <Sidebar />
                </div>
            )}
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-x-hidden">
                {/* Responsive navbar */}
                <nav className="sticky top-0 z-30 flex items-center justify-between w-full py-[9px] px-4 md:px-6 lg:px-8 bg-white shadow-sm">
                    <h3 className="text-lg ml-12 md:text-xl font-medium text-gray-800">Admin Panel</h3>
                    <div className="transition-transform duration-300 hover:scale-110">
                        <Image 
                            src={assets.profile_icon} 
                            alt="profile icon" 
                            width={40} 
                            height={40} 
                            className="rounded-full"
                        />
                    </div>
                </nav>
                
                {/* Content area */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}