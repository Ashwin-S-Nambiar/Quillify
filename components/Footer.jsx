import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  const socialIcons = [
    { title: "GitHub", link: "https://github.com/Ashwin-S-Nambiar", src: assets.github_icon, alt: "GitHub profile" },
    { title: "Twitter", link: "https://x.com/ashwinnambiar11", src: assets.twitter_icon, alt: "Twitter profile" },
    { title: "LinkedIn", link: "https://www.linkedin.com/in/ashwin-s-nambiar-0b7a5b202/", src: assets.linkedin_icon, alt: "LinkedIn profile" }
  ];

  return (
    <div className="bg-black py-8 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Image 
          src={assets.logo_light} 
          alt='alternate logo' 
          width={120} 
          className="transition-transform duration-300 hover:scale-105" 
        />
        
        <p className="text-sm text-white text-center">
          &copy; All Rights Reserved, {' '}
          <a 
            href="https://ashwin-s-nambiar.is-a.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-400 hover:text-amber-300 transition-colors duration-300"
          >
            Ashwin S Nambiar
          </a>
        </p>
        
        <div className="flex space-x-4">
          {socialIcons.map((icon, index) => (
            <a 
              key={index} 
              title={icon.title}
              target="_blank"
              href={icon.link} 
              className="transition-transform duration-300 hover:scale-110 opacity-80 hover:opacity-100"
            >
              <Image 
                src={icon.src} 
                alt={icon.alt} 
                width={40} 
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;