import { motion } from 'framer-motion';
import { useDrag } from 'react-dnd';
import { useState, useEffect } from 'react';

interface AstronautProps {
  onPipeConnected: () => void;
}

export function Astronaut({ onPipeConnected }: AstronautProps) {
  const [pipePosition, setPipePosition] = useState({ x: 96, y: 48 });
  const [isDragging, setIsDragging] = useState(false);

  const [{ isDraggingPipe }, drag, preview] = useDrag(() => ({
    type: 'pipe',
    item: () => {
      setIsDragging(true);
      return { type: 'pipe' };
    },
    collect: (monitor) => ({
      isDraggingPipe: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      setIsDragging(false);
      if (monitor.didDrop()) {
        onPipeConnected();
      } else {
        // Return to original position if not dropped
        setPipePosition({ x: 96, y: 48 });
      }
    },
  }));

  // Track mouse position for rope stretching
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Get the astronaut container position
      const astronautElement = document.querySelector('.astronaut-container');
      if (astronautElement) {
        const rect = astronautElement.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;
        
        setPipePosition({
          x: Math.max(0, Math.min(relativeX, 400)), // Keep within bounds
          y: Math.max(0, Math.min(relativeY, 300))
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  // Connection point on astronaut (chest area)
  const connectionPoint = { x: 64, y: 64 };

  // Calculate rope properties
  const deltaX = pipePosition.x - connectionPoint.x;
  const deltaY = pipePosition.y - connectionPoint.y;
  const ropeLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const ropeAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <div className="astronaut-container relative w-96 h-80">
      {/* Astronaut body */}
      <motion.div
        className="relative w-32 h-40"
        animate={{
          y: [-5, 5, -5],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Helmet */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full border-4 border-gray-300 shadow-lg">
          {/* Helmet reflection */}
          <div className="absolute top-2 left-2 w-6 h-6 bg-white opacity-60 rounded-full" />
          {/* Face inside helmet */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-200 rounded-full">
            {/* Eyes */}
            <div className="absolute top-3 left-2 w-2 h-2 bg-black rounded-full" />
            <div className="absolute top-3 right-2 w-2 h-2 bg-black rounded-full" />
            {/* Mouth */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-400 rounded-full" />
          </div>
        </div>

        {/* Body suit */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-lg">
          {/* Chest panel */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gray-400 rounded border-2 border-gray-500">
            <div className="absolute top-1 left-1 w-1 h-1 bg-red-500 rounded-full" />
            <div className="absolute top-1 right-1 w-1 h-1 bg-green-500 rounded-full" />
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-600 rounded" />
          </div>
        </div>

        {/* Arms */}
        <motion.div
          className="absolute top-18 left-2 w-4 h-12 bg-gray-200 rounded-lg shadow"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-18 right-2 w-4 h-12 bg-gray-200 rounded-lg shadow"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />

        {/* Legs */}
        <div className="absolute bottom-0 left-3 w-4 h-8 bg-gray-200 rounded-b-lg shadow" />
        <div className="absolute bottom-0 right-3 w-4 h-8 bg-gray-200 rounded-b-lg shadow" />

        {/* Jetpack */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 translate-x-8 w-6 h-16 bg-gray-600 rounded shadow-lg">
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-orange-400 rounded-b"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* Rope connection */}
      <div
        className={`absolute pointer-events-none ${isDragging ? 'bg-yellow-400' : 'bg-gray-400'}`}
        style={{
          left: connectionPoint.x,
          top: connectionPoint.y,
          width: `${ropeLength}px`,
          height: '3px',
          transformOrigin: '0 50%',
          transform: `rotate(${ropeAngle}deg)`,
          transition: isDragging ? 'background-color 0.2s' : 'all 0.3s ease',
        }}
      />

      {/* Connection point on astronaut */}
      <motion.div
        className="absolute w-3 h-3 bg-green-400 rounded-full border-2 border-green-600 pointer-events-none"
        style={{
          left: connectionPoint.x - 6,
          top: connectionPoint.y - 6,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Draggable pipe end */}
      <div
        ref={(node) => {
          if (node) drag(node);
        }}
        className={`absolute w-8 h-8 cursor-grab ${isDraggingPipe ? 'cursor-grabbing' : ''}`}
        style={{
          left: pipePosition.x - 16,
          top: pipePosition.y - 16,
          zIndex: isDragging ? 1000 : 1,
        }}
      >
        <motion.div
          className="w-8 h-8 bg-yellow-400 rounded-full border-3 border-yellow-600 shadow-lg relative"
          animate={!isDragging ? {
            y: [-2, 2, -2],
            scale: [1, 1.05, 1],
          } : {
            scale: 1.1,
          }}
          transition={{
            duration: 3,
            repeat: isDragging ? 0 : Infinity,
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-200 rounded-full" />
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-600 rounded-full" />
          
          {/* Inner connector detail */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-yellow-700 rounded-full" />
          
          {/* Pulsing effect when dragging */}
          {isDragging && (
            <motion.div
              className="absolute inset-0 bg-yellow-300 rounded-full opacity-50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Hidden drag preview (prevents default drag image) */}
      <div ref={preview as any} className="hidden" />
    </div>
  );
}