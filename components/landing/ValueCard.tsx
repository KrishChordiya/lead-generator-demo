"use client";

import { motion } from "framer-motion";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <motion.div 
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(217, 119, 6, 0.15)" }}
      className="bg-surface p-10 rounded-3xl border border-border shadow-sm transition-all duration-300 group relative overflow-hidden"
    >
      <div className="mb-8 p-4 bg-brand-light rounded-2xl w-fit group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-5 tracking-tight">{title}</h3>
      <p className="text-muted leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}
