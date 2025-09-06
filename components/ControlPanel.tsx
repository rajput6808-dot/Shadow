import React, { useState } from 'react';
import { AppTab, AspectRatio } from '../types';
import TabButton from './TabButton';
import GenerateIcon from './icons/GenerateIcon';
import ReplicateIcon from './icons/ReplicateIcon';
import { toBase64 } from '../utils/fileUtils';

interface ControlPanelProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
  onReplicate: (prompt: string, image: { data: string; mimeType: string; }) => void;
  isLoading: boolean;
}

const aspectRatios: AspectRatio[] = ['16:9', '4:3', '1:1'];

const ControlPanel: React.FC<ControlPanelProps> = ({ activeTab, setActiveTab, onGenerate, onReplicate, isLoading }) => {
    const [generatePrompt, setGeneratePrompt] = useState('');
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('16:9');
    const [replicatePrompt, setReplicatePrompt] = useState('Replicate this thumbnail with the same style, but for a video about my topic.');
    const [replicateImage, setReplicateImage] = useState<{ data: string; mimeType: string; fileName: string; } | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await toBase64(file);
            setReplicateImage({
                data: base64,
                mimeType: file.type,
                fileName: file.name
            });
        }
    };

    const handleGenerateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(generatePrompt, selectedAspectRatio);
    };

    const handleReplicateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replicateImage) {
            onReplicate(replicatePrompt, replicateImage);
        }
    };

  return (
    <div className="bg-base-200 rounded-lg p-6 shadow-xl">
      <div className="flex border-b border-base-300 mb-6">
        <TabButton 
            icon={<GenerateIcon />}
            label="Generate" 
            isActive={activeTab === AppTab.GENERATE} 
            onClick={() => setActiveTab(AppTab.GENERATE)} 
        />
        <TabButton 
            icon={<ReplicateIcon />}
            label="Replicate" 
            isActive={activeTab === AppTab.REPLICATE} 
            onClick={() => setActiveTab(AppTab.REPLICATE)} 
        />
      </div>

      <div>
        {activeTab === AppTab.GENERATE && (
          <form onSubmit={handleGenerateSubmit} className="space-y-6">
            <div>
                <label htmlFor="generate-prompt" className="block text-sm font-medium text-base-content mb-2">Thumbnail Topic</label>
                <textarea
                id="generate-prompt"
                rows={4}
                className="w-full bg-base-300 text-white rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                placeholder="e.g., 'A review of the latest flagship smartphone'"
                value={generatePrompt}
                onChange={(e) => setGeneratePrompt(e.target.value)}
                />
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-2">Aspect Ratio</label>
              <div className="flex space-x-2 rounded-md" role="group">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setSelectedAspectRatio(ratio)}
                    className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-primary ${
                      selectedAspectRatio === ratio
                        ? 'bg-brand-primary text-white shadow'
                        : 'bg-base-300 text-base-content hover:bg-base-100'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-base-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Thumbnail'}
            </button>
          </form>
        )}

        {activeTab === AppTab.REPLICATE && (
          <form onSubmit={handleReplicateSubmit} className="space-y-4">
            <div>
                <label htmlFor="replicate-image" className="block text-sm font-medium text-base-content mb-2">Upload Reference Thumbnail</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-base-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                         <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-base-100 rounded-md font-medium text-brand-secondary hover:text-brand-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary p-1">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        {replicateImage ? (
                             <p className="text-xs text-green-400 mt-2">{replicateImage.fileName}</p>
                        ) : (
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        )}
                    </div>
                </div>
            </div>
             <div>
                <label htmlFor="replicate-prompt" className="block text-sm font-medium text-base-content mb-2">Instructions for AI</label>
                <textarea
                id="replicate-prompt"
                rows={4}
                className="w-full bg-base-300 text-white rounded-md p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
                placeholder="e.g., 'Use this style to create a thumbnail about...'"
                value={replicatePrompt}
                onChange={(e) => setReplicatePrompt(e.target.value)}
                />
            </div>
            <button
              type="submit"
              disabled={isLoading || !replicateImage}
              className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-base-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Replicating...' : 'Replicate Thumbnail'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
