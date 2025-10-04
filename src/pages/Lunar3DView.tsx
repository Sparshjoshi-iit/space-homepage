// src/pages/ThreeDView.tsx
import React, { lazy, Suspense } from 'react';

// Dynamically import the MoonCanvas for better performance
const MoonCanvas = lazy(() => import('@/components/MoonCanvas'));

// A simple, elegant loader component
const SimpleLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }}>
    <p style={{
      color: 'rgba(255, 255, 255, 0.5)',
      fontFamily: 'monospace',
      fontSize: '1rem',
      // Simple pulse animation for a clean loading effect
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }}>
      Loading Scene...
    </p>
    <style>
      {`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}
    </style>
  </div>
);

const ThreeDViewPage = () => {
  return (
    // Main container for the 3D view
    <main style={{ 
      backgroundColor: 'black', 
      height: '100vh', 
      overflow: 'hidden' 
    }}>
      
      {/* Suspense handles the loading state while the 3D model is fetched */}
      <Suspense fallback={<SimpleLoader />}>
        <MoonCanvas />
      </Suspense>
      
      {/* A minimalist back link for navigation */}
      <a 
        href="/"
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          zIndex: 10,
          color: '#999', // A softer grey color
          textDecoration: 'none',
          fontSize: '16px',
          fontFamily: 'sans-serif',
          transition: 'color 0.3s ease',
        }}
        // Change color on hover for better user feedback
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#999'}
      >
        ← Back
      </a>
    </main>
  );
};

export default ThreeDViewPage;