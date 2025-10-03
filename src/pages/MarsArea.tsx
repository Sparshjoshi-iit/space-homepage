import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

interface MarsAreaProps {
  onReturnToArena: () => void;
}

export function MarsArea({ onReturnToArena }: MarsAreaProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-800 to-red-800 flex items-center justify-center relative overflow-hidden">
      {/* Mars surface background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-red-600 to-orange-500"></div>
        
        {/* Rock formations */}
        <div className="absolute bottom-16 left-32 w-20 h-12 bg-red-700 rounded-t-full opacity-80"></div>
        <div className="absolute bottom-24 right-40 w-16 h-20 bg-red-800 rounded-t-lg opacity-70"></div>
        <div className="absolute bottom-12 left-1/2 w-12 h-16 bg-red-700 rounded-t-full opacity-60"></div>
        
        {/* Dust storms */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-400 to-transparent opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Stars */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Two moons of Mars */}
        <motion.div
          className="absolute top-16 left-20 w-8 h-8 bg-gray-400 rounded-full shadow-lg"
          animate={{
            x: [0, 50, 100, 50, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-32 right-32 w-6 h-6 bg-gray-500 rounded-full shadow-lg"
          animate={{
            x: [0, -30, -60, -30, 0],
            y: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-6"
          style={{
            textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
          }}
        >
          Welcome to Mars Area
        </motion.h1>
        
        <motion.p
          className="text-xl text-orange-200 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You've successfully connected to the Martian exploration zone. Ready to explore the Red Planet!
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={() => window.open('https://mars-viewer-nasa-1.onrender.com/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg mb-4"
          >
            Explore Further
          </Button>
          <Button 
            onClick={onReturnToArena}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
          >
            Return to Arena
          </Button>
        </motion.div>

        {/* Mars helicopter animation */}
        <motion.div
          className="absolute bottom-48 right-20"
          animate={{
            y: [-10, -30, -10],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Helicopter body */}
            <div className="w-8 h-6 bg-gray-300 rounded-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-400"></div>
              {/* Rotor blades */}
              <motion.div
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gray-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            {/* Landing legs */}
            <div className="absolute -bottom-1 left-1 w-1 h-2 bg-gray-500"></div>
            <div className="absolute -bottom-1 right-1 w-1 h-2 bg-gray-500"></div>
          </div>
        </motion.div>

        {/* Dust devil animation */}
        <motion.div
          className="absolute bottom-20 left-1/4"
          animate={{
            rotate: 360,
            x: [0, 100, 200],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            x: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className="w-2 h-16 bg-gradient-to-t from-orange-400 to-transparent opacity-60 rounded-full"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}