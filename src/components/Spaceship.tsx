import { motion } from 'framer-motion';
import { useDrop, ConnectDropTarget } from 'react-dnd';
import { useState, forwardRef } from 'react'; // 1. Import `forwardRef`

interface SpaceshipProps {
  label: string;
  position: 'left' | 'right';
  onConnection: () => void;
}

// 2. Wrap the component in `forwardRef`
export const Spaceship = forwardRef<HTMLDivElement, SpaceshipProps>(
  function Spaceship({ label, position, onConnection }, ref) { // 3. Add `ref` as the second argument
    
    const [isConnected, setIsConnected] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [doorOpen, setDoorOpen] = useState(true);

    const [{ isOver }, drop]: [{ isOver: boolean }, ConnectDropTarget] = useDrop(() => ({
      accept: 'pipe',
      drop: () => {
        setIsConnected(true);
        setDoorOpen(false);
        
        // Start flying animation after a brief delay
        setTimeout(() => {
          setIsFlying(true);
          // Navigate to another page after flying animation
          setTimeout(() => {
            onConnection();
          }, 2000);
        }, 500);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    // 4. Create a new, type-safe callback function to handle refs
    const combinedRef = (element: HTMLDivElement | null) => {
      // This applies the ref from react-dnd
      drop(element);

      // This applies the ref passed down from a parent component
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <motion.div
        // 5. Use the new combined ref function here
        ref={combinedRef}
        className={`absolute ${position === 'left' ? 'left-10' : 'right-10'} bottom-32`}
        animate={isFlying ? {
          y: -1000,
          x: position === 'left' ? 500 : -500,
          rotate: position === 'left' ? 15 : -15,
          scale: 0.5,
        } : {
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={isFlying ? {
          duration: 2,
          ease: "easeIn",
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* The rest of your component's JSX remains exactly the same */}
        {/* Spaceship body */}
        <div className={`relative w-24 h-32 ${isOver ? 'scale-110' : ''} transition-transform duration-200`}>
          {/* Main hull */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-t from-gray-300 to-gray-100 rounded-t-full shadow-lg border-2 border-gray-400">
            {/* Windows */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-blue-200 rounded-lg border border-gray-300">
              <div className="absolute inset-1 bg-gradient-to-br from-blue-100 to-blue-300 rounded" />
            </div>
            
            {/* Hull details */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-500 rounded" />
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-500 rounded" />
            
            {/* Door */}
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-400 rounded-t-lg border border-gray-500"
              animate={doorOpen ? {
                rotateY: 45,
                x: -8,
              } : {
                rotateY: 0,
                x: 0,
              }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: 'left center' }}
            >
              <div className="absolute top-2 right-1 w-1 h-1 bg-yellow-400 rounded-full" />
            </motion.div>
          </div>

          {/* Top dome */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg border-2 border-red-500">
            <motion.div
              className="absolute top-1 left-1 w-2 h-2 bg-white opacity-80 rounded-full"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Side thrusters */}
          <div className="absolute bottom-8 left-0 w-3 h-6 bg-gray-500 rounded-l shadow">
            <motion.div
              className="absolute bottom-0 left-0 w-2 h-3 bg-blue-400 rounded-bl"
              animate={isFlying ? {
                scaleY: [1, 2, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          </div>
          <div className="absolute bottom-8 right-0 w-3 h-6 bg-gray-500 rounded-r shadow">
            <motion.div
              className="absolute bottom-0 right-0 w-2 h-3 bg-blue-400 rounded-br"
              animate={isFlying ? {
                scaleY: [1, 2, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 0.3,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Main thruster */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-600 rounded-b shadow">
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-orange-400 rounded-b"
              animate={isFlying ? {
                scaleY: [1, 3, 1],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 0.2,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Connection port */}
          {isConnected && (
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-yellow-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg whitespace-nowrap"
          animate={{
            opacity: doorOpen ? [0.7, 1, 0.7] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {label}
        </motion.div>

        {/* Glow effect when hovering */}
        {isOver && (
          <motion.div
            className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 blur-xl scale-150"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1.5, 1.8, 1.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
    );
  }
);