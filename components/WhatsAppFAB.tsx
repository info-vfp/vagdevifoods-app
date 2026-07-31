import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

interface WhatsAppFABProps {
  link: string;
}

const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#1D9E5A] text-white flex items-center justify-center shadow-[0_14px_34px_-10px_rgba(29,158,90,0.7)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="w-[27px] h-[27px]" />
    </a>
  );
};

export default WhatsAppFAB;
