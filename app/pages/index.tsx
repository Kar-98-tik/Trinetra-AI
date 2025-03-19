// pages/index.tsx
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Nodes and connections
    const nodes: {x: number, y: number, vx: number, vy: number, color: string}[] = [];
    const connections: {from: number, to: number}[] = [];
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: ['#6366f1', '#8b5cf6', '#d946ef'][Math.floor(Math.random() * 3)]
      });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < 3; j++) {
        const target = Math.floor(Math.random() * nodes.length);
        if (i !== target) {
          connections.push({from: i, to: target});
        }
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      for (const connection of connections) {
        const from = nodes[connection.from];
        const to = nodes[connection.to];
        const distance = Math.sqrt(
          Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
        );
        
        if (distance < 300) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 - distance / 3000})`;
          ctx.stroke();
        }
      }
      
      // Draw and update nodes
      for (const node of nodes) {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <Head>
        <title>Trinetra-AI</title>
        <meta name="description" content="Real-time AI visualization platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background canvas for network visualization */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 relative mr-2">
            <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-20 blur-md"></div>
            <div className="relative h-full w-full flex items-center justify-center text-cyan-400">
              <span className="text-xl font-bold">T</span>
            </div>
          </div>
          <span className="text-cyan-400 font-semibold">Trinetra-AI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-white opacity-80 hover:opacity-100 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload
          </button>
          
          <button className="text-white opacity-80 hover:opacity-100 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Realtime
          </button>
          
          <button className="text-white opacity-80 hover:opacity-100 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Library
          </button>
          
          <button className="text-white opacity-80 hover:opacity-100 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Statistics
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="text-white/80 hover:text-white px-4 py-1 rounded-full text-sm">
            Sign in
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1 rounded-full text-sm">
            Sign up
          </button>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-6xl font-bold tracking-wide text-white mb-4 relative">
          <span className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></span>
          <span className="relative inline-block">Trinetra-AI</span>
        </h1>
        
        <p className="text-white/70 text-xl mb-8">
          Real-tim
        </p>
        
        <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full shadow-lg shadow-purple-500/30">
          Get Started
        </button>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 p-6 text-white/50 text-sm">
        <div className="absolute bottom-6 left-6">
          <span className="bg-black/50 px-2 py-1 rounded-full">N</span>
        </div>
      </footer>
    </div>
  );
}