"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 border-t border-border text-center px-4 bg-surface">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="flex justify-center items-center gap-2 text-primary font-bold tracking-tighter text-xl mb-4">
          <Sparkles className="w-5 h-5 fill-current" />
          LeadGen AI
        </div>
        <p className="text-sm text-muted font-medium tracking-wide">
          The future of outbound. Optimized for high-conversion sales teams.
        </p>
      </motion.div>
    </footer>
  );
}
