
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-white">
          AI Thumbnail Designer
        </h1>
        <p className="text-base-content mt-1">
          Craft stunning thumbnails with the power of generative AI.
        </p>
      </div>
    </header>
  );
};

export default Header;
