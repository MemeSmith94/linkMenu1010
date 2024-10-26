import React from 'react';

interface LinkButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  primary?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ icon, text, href, primary }) => {
  return (
    <a
      href={href}
      className={`w-full flex items-center justify-center px-6 py-3 rounded-xl transition-all transform hover:scale-[1.02] ${
        primary
          ? 'bg-orange-500 text-white hover:bg-orange-600'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      } shadow-md`}
    >
      <span className="mr-2">{icon}</span>
      <span className="font-medium">{text}</span>
    </a>
  );
};

export default LinkButton;