import { motion } from "framer-motion";

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-30 mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] opacity-30 mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] opacity-20"
      />
    </div>
  );
}
