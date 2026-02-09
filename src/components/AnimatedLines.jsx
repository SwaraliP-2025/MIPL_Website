import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedLines = ({ density = "medium" }) => {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const nodeCount = density === "high" ? 30 : density === "low" ? 15 : 20;
    
    // Generate random nodes
    const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));

    // Generate lines between nearby nodes
    const newLines = [];
    const maxDistance = 25; // Maximum distance to draw a line

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
            opacity: 1 - distance / maxDistance,
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
        {/* Animated lines */}
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: line.opacity * 0.3,
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 1 },
            }}
          />
        ))}

        {/* Animated nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated data flow particles */}
        {lines.slice(0, 5).map((line, index) => (
          <motion.circle
            key={`particle-${line.id}`}
            r="2"
            fill="currentColor"
            className="text-primary"
            initial={{
              cx: `${line.x1}%`,
              cy: `${line.y1}%`,
              opacity: 0,
            }}
            animate={{
              cx: [`${line.x1}%`, `${line.x2}%`, `${line.x1}%`],
              cy: [`${line.y1}%`, `${line.y2}%`, `${line.y1}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Variant with hexagonal pattern
export const HexagonalPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <motion.path
              d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </pattern>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#hexagons)"
          animate={{
            x: [0, 50, 0],
            y: [0, 43.5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};

// Circuit board pattern
export const CircuitPattern = () => {
  const circuits = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: Math.random() * 30 + 10,
    height: Math.random() * 30 + 10,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {circuits.map((circuit) => (
          <g key={circuit.id}>
            {/* Horizontal line */}
            <motion.line
              x1={`${circuit.x}%`}
              y1={`${circuit.y}%`}
              x2={`${circuit.x + circuit.width}%`}
              y2={`${circuit.y}%`}
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: circuit.delay,
                ease: "easeInOut",
              }}
            />
            {/* Vertical line */}
            <motion.line
              x1={`${circuit.x + circuit.width}%`}
              y1={`${circuit.y}%`}
              x2={`${circuit.x + circuit.width}%`}
              y2={`${circuit.y + circuit.height}%`}
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: circuit.delay + 0.5,
                ease: "easeInOut",
              }}
            />
            {/* Node */}
            <motion.circle
              cx={`${circuit.x + circuit.width}%`}
              cy={`${circuit.y + circuit.height}%`}
              r="3"
              fill="currentColor"
              className="text-primary"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 2,
                delay: circuit.delay + 1,
                repeat: Infinity,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
