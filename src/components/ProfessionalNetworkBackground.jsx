import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ProfessionalNetworkBackground = ({ 
  density = "medium",
  variant = "default" 
}) => {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // More nodes for denser, more professional look
    const nodeCount = density === "high" ? 40 : density === "low" ? 25 : 35;
    
    // Generate nodes in a more structured pattern
    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      // Create a more grid-like distribution for professional look
      const row = Math.floor(i / Math.sqrt(nodeCount));
      const col = i % Math.ceil(Math.sqrt(nodeCount));
      const gridSize = Math.ceil(Math.sqrt(nodeCount));
      
      return {
        id: i,
        // Grid-based with randomization for organic feel
        x: (col / gridSize) * 100 + (Math.random() * 10 - 5),
        y: (row / gridSize) * 100 + (Math.random() * 10 - 5),
        size: Math.random() * 2 + 1.5,
        duration: Math.random() * 30 + 25, // Slower, more elegant
        delay: Math.random() * 8,
        pulseDelay: Math.random() * 4,
      };
    });

    // Generate lines between nearby nodes
    const newLines = [];
    const maxDistance = 20; // Tighter connections for denser network

    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const dx = newNodes[i].x - newNodes[j].x;
        const dy = newNodes[i].y - newNodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          newLines.push({
            id: `${i}-${j}`,
            x1: newNodes[i].x,
            y1: newNodes[i].y,
            x2: newNodes[j].x,
            y2: newNodes[j].y,
            distance: distance,
            opacity: (1 - distance / maxDistance) * 0.4,
            delay: Math.random() * 3,
          });
        }
      }
    }

    setNodes(newNodes);
    setLines(newLines);
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow effect for nodes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated lines with gradient */}
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="text-primary/30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: line.opacity,
            }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut", delay: line.delay },
              opacity: { duration: 2, delay: line.delay },
            }}
          />
        ))}

        {/* Pulsing data flow along lines */}
        {lines.slice(0, 8).map((line, index) => (
          <motion.circle
            key={`flow-${line.id}`}
            r="2.5"
            fill="currentColor"
            className="text-primary"
            filter="url(#glow)"
            initial={{
              cx: `${line.x1}%`,
              cy: `${line.y1}%`,
              opacity: 0,
            }}
            animate={{
              cx: [`${line.x1}%`, `${line.x2}%`, `${line.x1}%`],
              cy: [`${line.y1}%`, `${line.y2}%`, `${line.y1}%`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.75,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Professional nodes with glow */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 3}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: node.pulseDelay,
                ease: "easeOut",
              }}
            />
            
            {/* Main node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="currentColor"
              className="text-primary"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* Subtle grid overlay for structure */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60 pointer-events-none" />
    </div>
  );
};

// Variant for hero sections - more prominent
export const HeroNetworkBackground = () => {
  return <ProfessionalNetworkBackground density="high" variant="hero" />;
};

// Variant for content sections - more subtle
export const SubtleNetworkBackground = () => {
  return <ProfessionalNetworkBackground density="low" variant="subtle" />;
};
