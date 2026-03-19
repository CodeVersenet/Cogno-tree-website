import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Experience from './components/3d/Experience';
import Overlay from './components/ui/Overlay';
import MentorChat from './components/ui/MentorChat';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
          <Suspense fallback={null}>
             <Experience>
                <Overlay />
             </Experience>
          </Suspense>
        </Canvas>
        <Loader />
      </div>

      {/* Floating UI Elements (Fixed) */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div 
            className="pointer-events-auto flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
        >
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/10">
                <Sparkles className="text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 hidden md:block">
                CognoTree
            </span>
        </div>
        
        <nav className="pointer-events-auto glass-panel px-6 py-2 rounded-full hidden md:flex gap-8 text-sm text-slate-600 font-medium border border-slate-200">
            <button onClick={() => scrollToSection('home')} className="hover:text-black transition-colors">Home</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-black transition-colors">Projects</button>
            <button onClick={() => scrollToSection('mentorship')} className="hover:text-black transition-colors">Mentorship</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-black transition-colors">About</button>
        </nav>
      </div>
      
      <MentorChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Chat Trigger Button (if chat is closed) */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform pointer-events-auto"
        >
          <Sparkles size={24} />
        </button>
      )}
    </div>
  );
};

export default App;