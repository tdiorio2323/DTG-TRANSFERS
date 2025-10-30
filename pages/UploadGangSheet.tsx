import React, { useState, useCallback } from 'react';
import { UploadIcon } from '../components/Icons';

export const UploadGangSheet: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        // Handle the files
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            console.log(files);
            // Here you would typically handle the file upload
        }
    }, []);

    return (
        <div className="bg-brand-ink py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-textPrimary mb-4">Upload Your Gang Sheet</h1>
                    <p className="text-lg md:text-xl text-textSecondary mb-8">
                        Have your designs ready to go? Upload your complete gang sheet file here. We accept PNG, JPEG, and TIFF files.
                    </p>
                </div>
                <div 
                    className={`mt-12 max-w-4xl mx-auto border-4 border-dashed rounded-xl p-8 md:p-16 text-center transition-colors duration-300 ${isDragging ? 'border-brand-cyan bg-brand-panel' : 'border-brand-border-soft bg-brand-ink'}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center">
                        <UploadIcon className="w-16 h-16 text-brand-cyan mb-4" />
                        <h2 className="text-2xl font-bold text-textPrimary">Drag & Drop Your File</h2>
                        <p className="text-textSecondary mt-2">or</p>
                        <label htmlFor="file-upload" className="cursor-pointer mt-4">
                             <span className="bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all inline-block">
                                Browse Files
                             </span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="text-xs text-textSecondary mt-4">Max file size: 100MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
