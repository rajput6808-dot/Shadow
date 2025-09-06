
import React from 'react';

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'border-brand-primary text-brand-primary';
  const inactiveClasses = 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500';

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default TabButton;
