'use client'
import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    { 
      href: '/admin/addProduct', 
      icon: assets.add_icon, 
      label: 'Add blogs' 
    },
    { 
      href: '/admin/blogList', 
      icon: assets.blog_icon, 
      label: 'Blog list' 
    },
    { 
      href: '/admin/subscriptions', 
      icon: assets.email_icon, 
      label: 'Subscriptions' 
    }
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-3 left-4 z-50 bg-white p-2 rounded-md shadow-md transition-all duration-300 hover:translate-y-[-5px]"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-slate-100 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 z-40
      `}>
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <Link href='/'>
            <Image className="ml-14" src={assets.logo} width={120} alt="logo" />
          </Link>  
        </div>
        
        <nav className="py-6 px-4">
          {sidebarLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white 
                shadow-[-5px_5px_0px_#000000] mb-4 
                transition-all duration-300 hover:translate-x-[-5px] hover:translate-y-[5px] 
                hover:shadow-none"
            >
              <Image src={link.icon} alt={`${link.label} icon`} width={28} />
              <span className="truncate">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}

export default Sidebar;