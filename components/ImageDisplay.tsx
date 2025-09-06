
import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  isLoading: boolean;
  loadingMessage: string;
  generatedImage: string | null;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, loadingMessage, generatedImage, error }) => {

  const handleDownload = () => {
    if (generatedImage) {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'ai-thumbnail.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
            <Spinner />
            <p className="text-lg mt-4 animate-pulse">{loadingMessage}</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-red-400">
            <h3 className="text-xl font-semibold">An Error Occurred</h3>
            <p>{error}</p>
        </div>
      );
    }
    if (generatedImage) {
      return (
        <div className="space-y-4">
             <img src={generatedImage} alt="Generated Thumbnail" className="rounded-lg shadow-2xl w-full aspect-video object-cover" />
             <button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Download Thumbnail
            </button>
        </div>
      );
    }
    return (
      <div className="text-center text-base-content">
        <h3 className="text-xl font-semibold">Your Thumbnail Awaits</h3>
        <p>Use the controls on the left to generate or replicate a new thumbnail.</p>
        <div className="text-6xl mt-4 opacity-20">🖼️</div>
      </div>
    );
  };

  return (
    <div className="bg-base-200 rounded-lg p-6 shadow-xl flex items-center justify-center min-h-[400px] lg:min-h-full">
      {renderContent()}
    </div>
  );
};

export default ImageDisplay;
