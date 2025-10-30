import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { UploadIcon, RotateIcon, CopyIcon, TrashIcon, SaveIcon, FolderOpenIcon } from '../components/Icons';

const INCH_TO_PIXEL = 10; // 1 inch = 10 pixels for display purposes
const SHEET_WIDTH_INCHES = 22;

const pricingTiers = [
  { label: '22" x 24" (2ft)', lengthInInches: 24, feet: 2, price: 18.99 },
  { label: '22" x 36" (3ft)', lengthInInches: 36, feet: 3, price: 29.99 },
  { label: '22" x 48" (4ft)', lengthInInches: 48, feet: 4, price: 34.99 },
  { label: '22" x 60" (5ft)', lengthInInches: 60, feet: 5, price: 39.99 },
  { label: '22" x 72" (6ft)', lengthInInches: 72, feet: 6, price: 44.99 },
  { label: '22" x 84" (7ft)', lengthInInches: 84, feet: 7, price: 49.99 },
  { label: '22" x 96" (8ft)', lengthInInches: 96, feet: 8, price: 54.99 },
  { label: '22" x 108" (9ft)', lengthInInches: 108, feet: 9, price: 59.99 },
  { label: '22" x 120" (10ft)', lengthInInches: 120, feet: 10, price: 69.99 },
  { label: '22" x 132" (11ft)', lengthInInches: 132, feet: 11, price: 74.99 },
  { label: '22" x 144" (12ft)', lengthInInches: 144, feet: 12, price: 79.99 },
  { label: '22" x 156" (13ft)', lengthInInches: 156, feet: 13, price: 84.99 },
  { label: '22" x 168" (14ft)', lengthInInches: 168, feet: 14, price: 89.99 },
  { label: '22" x 180" (15ft)', lengthInInches: 180, feet: 15, price: 94.99 },
  { label: '22" x 192" (16ft)', lengthInInches: 192, feet: 16, price: 99.99 },
  { label: '22" x 204" (17ft)', lengthInInches: 204, feet: 17, price: 104.99 },
  { label: '22" x 216" (18ft)', lengthInInches: 216, feet: 18, price: 109.99 },
  { label: '22" x 228" (19ft)', lengthInInches: 228, feet: 19, price: 114.99 },
  { label: '22" x 240" (20ft)', lengthInInches: 240, feet: 20, price: 119.99 },
];

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
    const [feedbackMessage, setFeedbackMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedTierIndex, setSelectedTierIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const showFeedback = (text: string, type: 'success' | 'error') => {
        setFeedbackMessage({ text, type });
        setTimeout(() => setFeedbackMessage(null), 3000);
    };

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

    const handleSaveSheet = () => {
        try {
            const dataToSave = JSON.stringify(designs);
            localStorage.setItem('savedGangSheet', dataToSave);
            showFeedback('Sheet saved successfully!', 'success');
        } catch (error) {
            console.error("Failed to save gang sheet:", error);
            showFeedback('Error: Could not save sheet.', 'error');
        }
    };

    const handleLoadSheet = () => {
        try {
            const savedData = localStorage.getItem('savedGangSheet');
            if (savedData) {
                const loadedDesigns = JSON.parse(savedData);
                setDesigns(loadedDesigns);
                setSelectedId(null);
                showFeedback('Sheet loaded successfully!', 'success');
            } else {
                showFeedback('No saved sheet found.', 'error');
            }
        } catch (error) {
            console.error("Failed to load gang sheet:", error);
            showFeedback('Error: Could not load sheet.', 'error');
        }
    };
    
    const currentTier = pricingTiers[selectedTierIndex];
    const unitPrice = currentTier.price;
    const totalPrice = unitPrice * quantity;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Controls Panel */}
            <div className="w-full lg:w-80 bg-brand-panel p-6 border-r border-brand-border-soft flex-shrink-0 flex flex-col">
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-6">Gang Sheet Builder</h2>
                    <button
                        onClick={handleUploadClick}
                        className="w-full flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-4 rounded-lg hover:scale-[1.03] active:scale-95 transition-all mb-4"
                    >
                        <UploadIcon className="w-5 h-5" />
                        Upload Your Art
                    </button>
                    <div className="flex gap-2 mb-6">
                        <button onClick={handleSaveSheet} className="w-full flex items-center justify-center gap-2 bg-brand-ink border border-brand-border-soft text-textPrimary font-semibold py-2 px-4 rounded-lg hover:bg-brand-border-soft transition-colors">
                            <SaveIcon className="w-5 h-5" /> Save
                        </button>
                        <button onClick={handleLoadSheet} className="w-full flex items-center justify-center gap-2 bg-brand-ink border border-brand-border-soft text-textPrimary font-semibold py-2 px-4 rounded-lg hover:bg-brand-border-soft transition-colors">
                            <FolderOpenIcon className="w-5 h-5" /> Load
                        </button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/png, image/jpeg"
                        className="hidden"
                    />

                    {feedbackMessage && (
                        <div className={`p-3 rounded-md mb-4 text-sm text-center ${feedbackMessage.type === 'success' ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-400'}`}>
                            {feedbackMessage.text}
                        </div>
                    )}

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
                </div>
                <div className="pt-6 border-t border-brand-border-soft">
                    <div className="space-y-4 mb-4">
                        <div>
                            <label htmlFor="sheet-length" className="block text-sm font-medium text-textSecondary mb-1">Select Sheet Length</label>
                            <select
                                id="sheet-length"
                                value={selectedTierIndex}
                                onChange={(e) => setSelectedTierIndex(Number(e.target.value))}
                                className="w-full bg-brand-ink border border-brand-border-soft rounded-md py-2 px-3 text-textPrimary appearance-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-colors"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23C9C9C9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                            >
                                {pricingTiers.map((tier, index) => (
                                    <option key={index} value={index}>{tier.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-textSecondary mb-1">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                className="w-full bg-brand-ink border border-brand-border-soft rounded-md p-2 text-textPrimary"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 text-lg mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-textSecondary">Unit Price:</span>
                            <span className="font-bold text-textPrimary">${unitPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl">
                            <span className="text-textPrimary">Total:</span>
                            <span className="font-bold text-brand-green">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="w-full bg-brand-green text-brand-ink font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">Add to Cart</button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-grow p-4 md:p-8 overflow-auto">
                 <div
                    style={{
                        width: SHEET_WIDTH_INCHES * INCH_TO_PIXEL,
                        height: currentTier.lengthInInches * INCH_TO_PIXEL,
                        backgroundImage:
                            'linear-gradient(45deg, #1a1a24 25%, transparent 25%), linear-gradient(-45deg, #1a1a24 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a24 75%), linear-gradient(-45deg, transparent 75%, #1a1a24 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                    className="bg-brand-ink border-2 border-dashed border-brand-border-soft relative mx-auto transition-all duration-300"
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