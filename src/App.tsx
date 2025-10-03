import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SpaceBackground } from './components/SpaceBackground';
import { Astronaut } from './components/Astronaut';
import { Spaceship } from './components/Spaceship';
import { TitleText } from './components/TitleText';
import { LunarArea } from './pages/LunarArea';
import { MarsArea } from './pages/MarsArea';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'lunar' | 'mars'>('home');
  const [pipeConnected, setPipeConnected] = useState(false);

  const handleLunarConnection = () => {
    setCurrentPage('lunar');
  };

  const handleMarsConnection = () => {
    setCurrentPage('mars');
  };

  const handlePipeConnected = () => {
    setPipeConnected(true);
  };

  const handleReturnToArena = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'lunar') {
    return <LunarArea onReturnToArena={handleReturnToArena} />;
  }

  if (currentPage === 'mars') {
    return <MarsArea onReturnToArena={handleReturnToArena} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background layer */}
        <SpaceBackground />
        
        {/* Content layer */}
        <div className="relative z-10 w-full h-full">
          {/* Title */}
          <TitleText />
          
          {/* Astronaut with draggable pipe */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
            <Astronaut onPipeConnected={handlePipeConnected} />
          </div>
          
          {/* Spaceships */}
          <Spaceship 
            label="Lunar Area" 
            position="left" 
            onConnection={handleLunarConnection}
          />
          <Spaceship 
            label="Mars Area" 
            position="right" 
            onConnection={handleMarsConnection}
          />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20">
          <p className="text-white text-lg opacity-80 animate-pulse">
            Drag the pipe from the astronaut to a spaceship to begin your journey
          </p>
        </div>
      </div>
    </DndProvider>
  );
}