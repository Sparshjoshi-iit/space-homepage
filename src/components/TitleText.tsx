import { motion } from 'motion/react';

export function TitleText() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <motion.h1
        className="text-6xl font-bold text-white text-center"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
        style={{
          textShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.4)',
          background: 'linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 20px rgba(99, 102, 241, 0.8)',
              '0 0 30px rgba(147, 51, 234, 0.8)',
              '0 0 20px rgba(99, 102, 241, 0.8)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          CtrlESC's Arena
        </motion.span>
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p
        className="text-xl text-blue-200 text-center mt-4 opacity-80"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ 
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        Connect the pipe to explore the universe
      </motion.p>

      {/* Animated underline */}
      <motion.div
        className="mx-auto mt-4 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ 
          duration: 2,
          delay: 1,
          ease: "easeOut"
        }}
      />
    </div>
  );
}