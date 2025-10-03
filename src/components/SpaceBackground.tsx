import { motion } from 'motion/react';

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated waves */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,400 C300,350 600,450 900,400 C1050,375 1150,400 1200,400 L1200,800 L0,800 Z"
            fill="url(#wave1)"
            animate={{
              d: [
                "M0,400 C300,350 600,450 900,400 C1050,375 1150,400 1200,400 L1200,800 L0,800 Z",
                "M0,420 C300,370 600,470 900,420 C1050,395 1150,420 1200,420 L1200,800 L0,800 Z",
                "M0,400 C300,350 600,450 900,400 C1050,375 1150,400 1200,400 L1200,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M0,500 C400,450 800,550 1200,500 L1200,800 L0,800 Z"
            fill="url(#wave2)"
            animate={{
              d: [
                "M0,500 C400,450 800,550 1200,500 L1200,800 L0,800 Z",
                "M0,520 C400,470 800,570 1200,520 L1200,800 L0,800 Z",
                "M0,500 C400,450 800,550 1200,500 L1200,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <motion.path
            d="M0,600 C300,580 600,620 900,600 C1050,590 1150,600 1200,600 L1200,800 L0,800 Z"
            fill="url(#wave3)"
            animate={{
              d: [
                "M0,600 C300,580 600,620 900,600 C1050,590 1150,600 1200,600 L1200,800 L0,800 Z",
                "M0,610 C300,590 600,630 900,610 C1050,600 1150,610 1200,610 L1200,800 L0,800 Z",
                "M0,600 C300,580 600,620 900,600 C1050,590 1150,600 1200,600 L1200,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}