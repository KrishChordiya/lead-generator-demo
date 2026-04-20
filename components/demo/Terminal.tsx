"use client";

import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { RefObject } from "react";

interface Log {
  id: number;
  message: string;
  type: "system" | "scraper" | "analyst" | "copywriter";
}

interface TerminalProps {
  logs: Log[];
  loading: boolean;
  logContainerRef: RefObject<HTMLDivElement | null>;
}

export function Terminal({ logs, loading, logContainerRef }: TerminalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary rounded-2xl shadow-2xl overflow-hidden border border-white/5"
    >
      <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Live Agent Tracker</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
      </div>
      <div 
        ref={logContainerRef}
        className="p-6 h-48 overflow-y-auto font-mono text-xs space-y-2 scrollbar-hide bg-black/20"
      >
        {logs.length === 0 && <span className="text-white/20 italic">Waiting for orchestrator signal...</span>}
        {logs.map((log) => (
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            key={log.id} 
            className="flex gap-3"
          >
            <span className={`uppercase font-black min-w-[80px] ${
              log.type === "system" ? "text-primary" :
              log.type === "scraper" ? "text-emerald-400" :
              log.type === "analyst" ? "text-amber-400" : "text-orange-400"
            }`}>
              [{log.type}]
            </span>
            <span className="text-white/80 font-medium">{log.message}</span>
          </motion.div>
        ))}
        {loading && (
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-4 bg-primary inline-block ml-1"
          />
        )}
      </div>
    </motion.div>
  );
}
