"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, BarChart3, ChevronRight, Globe, Send, Sparkles, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoHeader } from "@/components/layout/LogoHeader";
import { Footer } from "@/components/layout/Footer";
import { ValueCard } from "@/components/landing/ValueCard";

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-brand-light selection:text-primary">
      <LogoHeader />

      {/* Hero Section */}
      <section className="relative pt-10 pb-32 overflow-hidden px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-40">
          <div className="absolute top-[-100px] left-[10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute top-[-50px] right-[10%] w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Content Column */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left space-y-10 relative z-10"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light border border-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase"
              >
                <Wand2 className="w-3.5 h-3.5" />
                The Outreach Revolution
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-[800] leading-[1.05] text-secondary tracking-tight"
              >
                Stop Guessing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Start Closing.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                AI-Driven Lead Research that converts. Turn any URL into a high-conversion sales dossier in under 20 seconds.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4"
              >
                <Link href="/demo">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-primary text-white px-6 py-5 rounded-xl font-bold text-lg shadow-2xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    Run a Live Search
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="text-muted text-sm font-semibold tracking-wide flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  124 Sales dossiers generated today
                </div>
              </motion.div>
            </motion.div>

            {/* Aesthetic Hero Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="lg:w-1/2 w-full relative h-[500px]"
            >
              <div className="absolute inset-0 bg-surface shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border rounded-[2.5rem] overflow-hidden p-10 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  {[0, 1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${activeStep >= step ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-background text-muted"
                        }`}>
                        {step + 1}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 bg-background rounded-full relative overflow-hidden hidden sm:block`}>
                          {activeStep > step && <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} className="absolute inset-0 bg-primary" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                      <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-sm space-y-6">
                        <div className="p-4 bg-background border border-border rounded-2xl flex items-center gap-4 shadow-sm">
                          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center border border-border">
                            <Globe className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2 w-3/4 bg-border rounded-full" />
                            <div className="h-1.5 w-1/2 bg-border opacity-50 rounded-full" />
                          </div>
                        </div>
                        <h3 className="text-center text-sm font-bold text-muted uppercase tracking-[0.2em]">Sourcing Raw Data</h3>
                      </motion.div>
                    )}

                    {activeStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="relative">
                        <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30">
                          <Sparkles className="text-white w-14 h-14" />
                        </div>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -inset-6 border-2 border-dashed border-primary/20 rounded-full" />
                        <p className="mt-10 text-center text-sm font-bold text-primary uppercase tracking-[0.2em]">Contextual Analysis</p>
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full grid grid-cols-2 gap-5">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-4 bg-background border border-border rounded-2xl space-y-3">
                            <div className="h-2 w-2/3 bg-primary/20 rounded-full" />
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-border rounded-full" />
                              <div className="h-1.5 w-4/5 bg-border rounded-full" />
                            </div>
                          </div>
                        ))}
                        <div className="col-span-2 text-center text-sm font-bold text-muted uppercase tracking-[0.2em] mt-4">Matchmaking Engine</div>
                      </motion.div>
                    )}

                    {activeStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
                        <div className="p-8 bg-primary text-white rounded-3xl shadow-2xl shadow-primary/30 space-y-6 relative overflow-hidden group">
                          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                              <Send className="w-4 h-4 text-white" />
                            </div>
                            <div className="h-2.5 w-1/3 bg-white/40 rounded-full" />
                          </div>
                          <div className="space-y-3">
                            <div className="h-2 w-full bg-white/20 rounded-full" />
                            <div className="h-2 w-full bg-white/20 rounded-full" />
                            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                          </div>
                        </div>
                        <p className="mt-8 text-center text-sm font-bold text-secondary uppercase tracking-[0.2em]">Perfect Outreach Synthesis</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-32 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <ValueCard
            icon={<Zap className="w-7 h-7" />}
            title="Instant Sourcing"
            description="Our engine navigates the web in real-time. No static databases, no stale data. Just fresh, sub-20-second intelligence."
          />
          <ValueCard
            icon={<Target className="w-7 h-7" />}
            title="Deep Resonance"
            description="We don't just find names. We find the pain points that keep your prospects up at night, and map your solution to them."
          />
          <ValueCard
            icon={<BarChart3 className="w-7 h-7" />}
            title="Scaling Trust"
            description="Empower your SDRs to write emails that feel like they were researched for hours—in the time it takes to sip their coffee."
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
