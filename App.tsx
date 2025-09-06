import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageDisplay from './components/ImageDisplay';
import { AppTab, AspectRatio } from './types';
import { generateThumbnail, replicateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.GENERATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, aspectRatio: AspectRatio) => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Generating with Imagen-4... this may take a moment.');
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBase64 = await generateThumbnail(prompt, aspectRatio);
      setGeneratedImage(`data:image/jpeg;base64,${imageBase64}`);
    } catch (e) {
      console.error(e);
      setError('Failed to generate thumbnail. Please check the console for details.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleReplicate = useCallback(async (prompt: string, image: { data: string; mimeType: string; }) => {
    if (!prompt.trim()) {
        setError('Prompt cannot be empty.');
        return;
    }
    if (!image.data) {
        setError('Please upload an image to replicate.');
        return;
    }
    setIsLoading(true);
    setLoadingMessage('Replicating with Nano Banana... this is quick!');
    setError(null);
    setGeneratedImage(null);
    
    try {
        const imageBase64 = await replicateThumbnail(prompt, image.data, image.mimeType);
        setGeneratedImage(`data:image/png;base64,${imageBase64}`);
    } catch (e) {
        console.error(e);
        setError('Failed to replicate thumbnail. Please check the console for details.');
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ControlPanel 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onGenerate={handleGenerate}
            onReplicate={handleReplicate}
            isLoading={isLoading}
          />
          <ImageDisplay
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            generatedImage={generatedImage}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
