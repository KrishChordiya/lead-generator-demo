"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Target, Zap, Copy, Check, Database, Globe } from "lucide-react";
import { LogoHeader } from "@/components/layout/LogoHeader";
import { IntegrationNote } from "@/components/demo/IntegrationNote";
import { Terminal } from "@/components/demo/Terminal";
import { BriefSection } from "@/components/demo/BriefSection";

interface AnalysisData {
  industry: string;
  valueProposition: string;
  techStack: string[];
  likelyPainPoints: string[];
  matchRelevance: number;
  conversionStrategy: string;
  confidence: number;
}

interface DraftData {
  subject: string;
  body: string;
}

interface Log {
  id: number;
  message: string;
  type: "system" | "scraper" | "analyst" | "copywriter";
}

export default function DemoPage() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisData | null>(null);
  const [draft, setDraft] = useState<DraftData | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: Log["type"]) => {
    setLogs((prev) => [...prev, { id: Math.random() + Date.now(), message, type }]);
  };

  const useSampleData = () => {
    setSourceUrl("https://linear.app");
    setTargetUrl("https://stripe.com");
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);
    setDraft(null);
    setLogs([]);

    try {
      addLog("Booting multi-agent orchestrator...", "system");
      await new Promise(r => setTimeout(r, 800));

      const sRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sourceUrl }),
      });
      const sData = await sRes.json();
      if (!sData.success) throw new Error(sData.error);
      addLog("Source context extracted successfully.", "scraper");

      const tRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });
      const tData = await tRes.json();
      if (!tData.success) throw new Error(tData.error);
      addLog("Target context extracted successfully.", "scraper");

      const aRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceContext: sData.context, targetContext: tData.context }),
      });
      const aData = await aRes.json();
      if (!aData.success) throw new Error(aData.error);
      setResults(aData.data);
      addLog("Core product pain points identified.", "analyst");

      const dRes = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis: aData.data, sourceContext: sData.context, targetUrl }),
      });
      const dData = await dRes.json();
      if (!dData.success) throw new Error(dData.error);
      setDraft(dData.draft);
      addLog("Outreach strategy finalized. Dashboard ready.", "system");
    } catch (err: any) {
      addLog(`CRITICAL ERROR: ${err.message}`, "system");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (draft) {
      navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-brand-light selection:text-primary">
      <LogoHeader />

      <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8">
        <IntegrationNote />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h1 className="text-3xl font-[800] text-secondary tracking-tight">Interactive Sandbox</h1>
             <p className="text-muted font-medium">Test the intelligence engine in real-time.</p>
           </div>
           <button 
             onClick={useSampleData}
             className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-sm font-bold text-muted hover:border-primary hover:text-primary transition-all shadow-sm group"
           >
             <Database className="w-4 h-4 group-hover:scale-110 transition-transform" />
             Use Sample Data
           </button>
        </div>

        {/* Horizontal Input Header */}
        <div className="bg-surface p-2 rounded-2xl shadow-xl shadow-secondary/5 border border-border">
          <form onSubmit={handleAnalyze} className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="url"
                  placeholder="Your Company URL"
                  className="w-full pl-11 pr-4 py-4 bg-background border-none rounded-xl text-sm font-bold text-secondary placeholder:text-muted focus:ring-2 focus:ring-primary transition-all"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="url"
                  placeholder="Target Lead URL"
                  className="w-full pl-11 pr-4 py-4 bg-background border-none rounded-xl text-sm font-bold text-secondary placeholder:text-muted focus:ring-2 focus:ring-primary transition-all"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="lg:w-64 bg-primary text-white py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all disabled:bg-border flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Generate Strategy
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <Terminal logs={logs} loading={loading} logContainerRef={logContainerRef} />

        <AnimatePresence>
          {results && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              <div className="bg-surface rounded-[2rem] border border-border shadow-xl overflow-hidden flex flex-col">
                 <div className="p-8 border-b border-border flex items-center gap-4 bg-background">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                       <Zap className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                       <h2 className="text-xl font-extrabold text-secondary">Intelligence Brief</h2>
                       <p className="text-xs font-bold text-primary uppercase tracking-widest">Company Footprint</p>
                    </div>
                 </div>
                 <div className="p-6 md:p-8 space-y-8 flex-1">
                    <BriefSection label="Industry Segment" content={results.industry} />
                    <BriefSection label="Assumed Tech Stack" content={
                      <div className="flex flex-wrap gap-2 mt-2">
                        {results.techStack?.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-brand-light text-primary text-[11px] font-black rounded-lg uppercase tracking-wider border border-primary/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    } />
                    <BriefSection label="Identified Pain Points" content={
                      <ul className="space-y-3 mt-3">
                        {results.likelyPainPoints?.map((point, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted font-medium">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    } />
                 </div>
              </div>

              <div className="bg-surface rounded-[2rem] border-2 border-primary shadow-2xl shadow-primary/10 overflow-hidden flex flex-col relative">
                 <div className="p-6 border-b border-primary/10 flex items-center justify-between bg-brand-light/20">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
                          <Send className="w-6 h-6" />
                       </div>
                       <div>
                          <h2 className="text-xl font-extrabold text-secondary">Outreach Asset</h2>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest">Synthesis Draft</p>
                       </div>
                    </div>
                    <button onClick={copyToClipboard} className="p-3 bg-surface border border-primary/20 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm group">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    </button>
                 </div>
                 {draft && (
                   <div className="p-6 md:p-8 space-y-6 flex-1">
                      <div className="space-y-2">
                         <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Subject Line</span>
                         <div className="text-lg font-bold text-secondary leading-tight">{draft.subject}</div>
                      </div>
                      <div className="space-y-2">
                         <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Email Narrative</span>
                         <div className="text-muted leading-relaxed font-medium whitespace-pre-wrap italic bg-background p-6 rounded-2xl border border-border relative">
                            {draft.body}
                         </div>
                      </div>
                   </div>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-bold flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-rose-500" />
             {error}
          </div>
        )}
      </div>
    </div>
  );
}
