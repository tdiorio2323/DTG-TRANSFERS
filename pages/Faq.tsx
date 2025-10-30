import React, { useState } from 'react';

const faqData = [
    {
        question: "What is a DTF transfer?",
        answer: "Direct to Film (DTF) is a printing process where designs are printed onto a special film, which is then transferred onto a garment or other substrate using a heat press. It produces vibrant, durable, and stretchable prints."
    },
    {
        question: "What kind of fabrics can I press these on?",
        answer: "DTF transfers are incredibly versatile and can be applied to a wide range of fabrics, including cotton, polyester, cotton/poly blends, tri-blends, spandex, and even hard surfaces like wood and leather."
    },
    {
        question: "What are the application instructions?",
        answer: "For best results, we recommend using a heat press. Set your press to 280-320°F (140-160°C). Press the transfer for 10-15 seconds with medium pressure. Allow it to cool completely (cold peel) before peeling off the film. A second press for 5 seconds with a Teflon sheet can improve durability."
    },
    {
        question: "What are the artwork requirements for uploads?",
        answer: "Please upload your artwork in PNG format with a transparent background. For the best quality, we recommend a resolution of 300 DPI at the desired print size."
    },
     {
        question: "What is your turnaround time?",
        answer: "Our standard turnaround time is 1-3 business days for printing and processing, plus shipping time. We also offer expedited options at checkout."
    },
];

const FaqItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-brand-border-soft">
            <button
                onClick={onClick}
                className="w-full text-left flex justify-between items-center py-6 px-4"
            >
                <h3 className="text-lg font-semibold text-textPrimary">{item.question}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-textSecondary p-4 pt-0">
                    {item.answer}
                </p>
            </div>
        </div>
    )
}

export const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }
    
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-textPrimary mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg md:text-xl text-textSecondary mb-12">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-brand-panel border border-brand-border-soft rounded-lg">
                    {faqData.map((item, index) => (
                        <FaqItem 
                            key={index} 
                            item={item} 
                            isOpen={openIndex === index} 
                            onClick={() => handleItemClick(index)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};