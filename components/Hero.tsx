
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section 
      className="relative flex items-center justify-center text-center overflow-hidden bg-cover bg-center" 
      style={{
        backgroundImage: "url('https://i.imgur.com/9FzLRdy.jpeg')",
        height: 'calc(100vh - 89px)', 
        minHeight: '600px'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-brand-ink/60 z-0"></div>

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="absolute w-full h-full max-w-4xl max-h-4xl bg-[radial-gradient(circle_at_center,_rgba(0,119,255,0.1)_0%,_rgba(210,0,255,0.05)_30%,_rgba(10,10,20,0)_70%)] blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4 text-white leading-tight">
          Bring Your Designs to Life
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-white mb-8">
          The highest quality Direct to Film (DTF) transfers, ready to press. Unlock vibrant, durable, and easy-to-apply prints for any garment.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all">
            Order DTF Transfer
          </button>
          <button className="w-full sm:w-auto bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all">
            Upload Your Art
          </button>
        </div>
      </div>
    </section>
  );
};
