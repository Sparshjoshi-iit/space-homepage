import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

interface LunarAreaProps {
  onReturnToArena: () => void;
}

export function LunarArea({ onReturnToArena }: LunarAreaProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center relative overflow-hidden">
      {/* Moon surface background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-600 to-gray-500"></div>
        
        {/* Craters */}
        <div className="absolute bottom-10 left-20 w-16 h-8 bg-gray-700 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-32 w-24 h-12 bg-gray-700 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/3 w-12 h-6 bg-gray-700 rounded-full opacity-50"></div>
        
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Earth in the distance */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded-full shadow-lg"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-2 left-3 w-6 h-4 bg-green-500 rounded opacity-80"></div>
          <div className="absolute bottom-3 right-2 w-8 h-3 bg-green-500 rounded opacity-80"></div>
          <div className="absolute top-8 right-4 w-4 h-6 bg-green-500 rounded opacity-80"></div>
        </motion.div>
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
            textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
          }}
        >
          Welcome to the Lunar Area
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You've successfully connected to the lunar exploration zone. Prepare for moon adventures!
        </motion.p>

        <motion.div
  className="space-y-4"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 1 }}
>
  <Button 
    onClick={() => window.open('http://localhost:8000/nasa_lunar.html', '_blank')}
    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg mb-4"
  >
    Explore Further
  </Button>

  <Button 
    onClick={() => window.open('/lunar3d', '_self')}   // 👈 NEW BUTTON
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg mb-4"
  >
    Interact with 3D Moon 
  </Button>

  <Button 
    onClick={onReturnToArena}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
  >
    Return to Arena
  </Button>
</motion.div>


        {/* Lunar rover animation */}
        <motion.div
          className="absolute bottom-40 left-10"
          animate={{
            x: [0, 200, 400, 600],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-16 h-10 bg-gray-300 rounded-lg relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gray-400 rounded"></div>
            <div className="absolute -bottom-3 left-1 w-4 h-4 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-3 right-1 w-4 h-4 bg-gray-600 rounded-full"></div>
            <div className="absolute -bottom-2 left-2 w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="absolute -bottom-2 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}