"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LogoHeader() {
  return (
    <header className="py-6 text-center relative z-50">
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-surface shadow-sm border border-border rounded-full group cursor-pointer"
        >
          <div className="w-8 h-8 lg:w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
            <Sparkles className="w-4.5 h-4.5 lg:w-5 h-5 fill-current" />
          </div>
          <span className="text-lg lg:text-xl font-extrabold tracking-tight text-secondary">LeadGen AI</span>
        </motion.div>
      </Link>
    </header>
  );
}
