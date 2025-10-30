import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { UploadIcon, RotateIcon, CopyIcon, TrashIcon } from '../components/Icons';

const INCH_TO_PIXEL = 10; // 1 inch = 10 pixels for display purposes
const SHEET_WIDTH_INCHES = 22;
const SHEET_HEIGHT_INCHES = 60;

interface Design {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  imageUrl: string;
  naturalWidth: number;
  naturalHeight: number;
}

export const BuildGangSheet: React.FC = () => {
    const [designs, setDesigns] = useState<Design[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                const img = new Image();
                img.onload = () => {
                    const newDesign: Design = {
                        id: Date.now() + Math.random(),
                        x: 10,
                        y: 10,
                        width: img.naturalWidth / 10, // Initial size heuristic
                        height: img.naturalHeight / 10,
                        rotation: 0,
                        imageUrl,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                    };
                    setDesigns(prev => [...prev, newDesign]);
                };
                img.src = imageUrl;
            };
            reader.readAsDataURL(file);
        }
        // Reset file input to allow uploading the same file again
        event.target.value = '';
    };

    const updateDesign = (id: number, updates: Partial<Design>) => {
        setDesigns(designs.map(d => d.id === id ? { ...d, ...updates } : d));
    };

    const selectedDesign = designs.find(d => d.id === selectedId);

    const duplicateDesign = () => {
        if (!selectedDesign) return;
        const newDesign = {
            ...selectedDesign,
            id: Date.now(),
            x: selectedDesign.x + 20,
            y: selectedDesign.y + 20,
        };
        setDesigns([...designs, newDesign]);
        setSelectedId(newDesign.id);
    };

    const deleteDesign = () => {
        if (!selectedId) return;
        setDesigns(designs.filter(d => d.id !== selectedId));
        setSelectedId(null);
    };
    
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-brand-ink">
            {/* Controls Panel */}
            <div className="w-full lg:w-80 bg-brand-panel p-6 border-r border-brand-border-soft flex-shrink-0">
                <h2 className="text-2xl font-bold mb-6">Gang Sheet Builder</h2>
                <button
                    onClick={handleUploadClick}
                    className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-4 rounded-lg hover:scale-[1.03] active:scale-95 transition-all mb-6"
                >
                    <UploadIcon className="w-5 h-5" />
                    Upload Your Art
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/png, image/jpeg"
                    className="hidden"
                />

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-brand-border-soft pb-2">Selected Design</h3>
                    {selectedDesign ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-sm text-textSecondary block">Width (in)</label>
                                    <input type="number" value={(selectedDesign.width / INCH_TO_PIXEL).toFixed(2)} onChange={e => updateDesign(selectedId!, { width: Number(e.target.value) * INCH_TO_PIXEL, height: (Number(e.target.value) * selectedDesign.naturalHeight / selectedDesign.naturalWidth) * INCH_TO_PIXEL })} className="w-full bg-brand-ink border border-brand-border-soft rounded-md p-2 text-textPrimary" />
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary block">Height (in)</label>
                                    <input type="number" value={(selectedDesign.height / INCH_TO_PIXEL).toFixed(2)} onChange={e => updateDesign(selectedId!, { height: Number(e.target.value) * INCH_TO_PIXEL, width: (Number(e.target.value) * selectedDesign.naturalWidth / selectedDesign.naturalHeight) * INCH_TO_PIXEL })} className="w-full bg-brand-ink border border-brand-border-soft rounded-md p-2 text-textPrimary" />
                                </div>
                            </div>
                             <div>
                                <label className="text-sm text-textSecondary block">Rotation (°)</label>
                                <div className="flex items-center gap-2">
                                     <input type="range" min="0" max="360" value={selectedDesign.rotation} onChange={e => updateDesign(selectedId!, { rotation: Number(e.target.value) })} className="w-full h-2 bg-brand-border-soft rounded-lg appearance-none cursor-pointer accent-brand-cyan"/>
                                     <input type="number" value={selectedDesign.rotation} onChange={e => updateDesign(selectedId!, { rotation: Number(e.target.value) })} className="w-20 bg-brand-ink border border-brand-border-soft rounded-md p-2 text-textPrimary"/>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                               <button onClick={duplicateDesign} className="p-2 bg-brand-ink border border-brand-border-soft rounded-md hover:bg-brand-border-soft w-full flex justify-center"><CopyIcon className="w-5 h-5 text-textSecondary" /></button>
                               <button onClick={deleteDesign} className="p-2 bg-brand-ink border border-brand-border-soft rounded-md hover:bg-red-500/20 w-full flex justify-center"><TrashIcon className="w-5 h-5 text-red-400" /></button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-textSecondary text-sm">Select a design on the canvas to see its properties and make edits.</p>
                    )}
                </div>

                <div className="mt-auto pt-6 border-t border-brand-border-soft absolute bottom-6 left-6 right-6 bg-brand-panel">
                    <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Sheet Size:</span>
                        <span>{SHEET_WIDTH_INCHES}" x {SHEET_HEIGHT_INCHES}"</span>
                    </div>
                     <button className="w-full bg-brand-green text-brand-ink font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">Add to Cart</button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-grow p-4 md:p-8 overflow-auto">
                 <div
                    style={{
                        width: SHEET_WIDTH_INCHES * INCH_TO_PIXEL,
                        height: SHEET_HEIGHT_INCHES * INCH_TO_PIXEL,
                        backgroundImage:
                            'linear-gradient(45deg, #1a1a24 25%, transparent 25%), linear-gradient(-45deg, #1a1a24 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a24 75%), linear-gradient(-45deg, transparent 75%, #1a1a24 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                    className="bg-brand-ink border-2 border-dashed border-brand-border-soft relative mx-auto"
                    onClick={() => setSelectedId(null)}
                >
                    {designs.map(design => (
                        <Rnd
                            key={design.id}
                            size={{ width: design.width, height: design.height }}
                            position={{ x: design.x, y: design.y }}
                            onDragStop={(e, d) => {
                                updateDesign(design.id, { x: d.x, y: d.y });
                            }}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                updateDesign(design.id, {
                                    width: parseFloat(ref.style.width),
                                    height: parseFloat(ref.style.height),
                                    ...position,
                                });
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(design.id)
                            }}
                            className={`border-2 ${selectedId === design.id ? 'border-brand-cyan' : 'border-transparent'}`}
                            lockAspectRatio
                        >
                            <div style={{ transform: `rotate(${design.rotation}deg)`, width: '100%', height: '100%' }}>
                                <img src={design.imageUrl} className="w-full h-full" draggable="false" />
                            </div>
                        </Rnd>
                    ))}
                </div>
            </div>
        </div>
    );
};