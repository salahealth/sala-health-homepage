import React from 'react';
import { motion } from 'framer-motion';
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-void pt-32 pb-20 overflow-hidden">
      {/* Abstract Background Pattern & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern"></div>

        {/* Animated Aurora Mesh Gradient */}
        <div className="absolute inset-0 aurora-bg opacity-40 mix-blend-screen"></div>

        {/* Central radial blue glow - Breathing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] blur-3xl rounded-full animate-breathe"></div>

        {/* Secondary cyan glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1)_0%,transparent_50%)] blur-3xl rounded-full animate-float-slow"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void"></div>

        {/* Animated Light Streaks */}
        <div
          className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue/30 to-transparent animate-streak"
          style={{
            animationDelay: '0s'
          }}>
        </div>
        <div
          className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple/30 to-transparent animate-streak"
          style={{
            animationDelay: '4s'
          }}>
        </div>

        {/* Floating decorative particles (Parallax depth) */}
        <div
          className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-blue/60 blur-[1px] animate-float-slow"
          style={{
            animationDelay: '0s'
          }}>
        </div>
        <div
          className="absolute top-[25%] right-[25%] w-3 h-3 rounded-full bg-cyan/50 blur-[2px] animate-float-fast"
          style={{
            animationDelay: '1s'
          }}>
        </div>
        <div
          className="absolute bottom-[30%] left-[15%] w-4 h-4 rounded-full bg-purple/40 blur-[3px] animate-float-diagonal"
          style={{
            animationDelay: '2s'
          }}>
        </div>
        <div
          className="absolute top-[45%] left-[10%] w-1.5 h-1.5 rounded-full bg-emerald/60 blur-[1px] animate-float-fast"
          style={{
            animationDelay: '0.5s'
          }}>
        </div>
        <div
          className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-blue-bright/50 blur-[1px] animate-float-slow"
          style={{
            animationDelay: '3s'
          }}>
        </div>
        <div
          className="absolute top-[60%] right-[10%] w-5 h-5 rounded-full bg-purple-bright/30 blur-[4px] animate-float-diagonal"
          style={{
            animationDelay: '1.5s'
          }}>
        </div>
        <div
          className="absolute bottom-[15%] left-[40%] w-3 h-3 rounded-full bg-cyan/60 blur-[2px] animate-float-fast"
          style={{
            animationDelay: '2.5s'
          }}>
        </div>
        <div
          className="absolute top-[10%] right-[40%] w-2 h-2 rounded-full bg-emerald-bright/50 blur-[1px] animate-float-slow"
          style={{
            animationDelay: '0.8s'
          }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex-grow flex flex-col justify-center items-center text-center">
        {/* Badge Pills */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-wrap justify-center gap-4 mb-10">

          <div className="relative overflow-hidden inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-gray-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse mr-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            Healthcare Intelligence
          </div>
          <div className="relative overflow-hidden inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"
              style={{
                animationDelay: '1.5s'
              }}>
            </div>
            Southeast Asia Focus
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.1] mb-8 tracking-tight text-gradient-animated pb-2">
            Building the intelligence layer for healthcare in Southeast Asia
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="max-w-2xl mx-auto">

          <p className="text-lg md:text-xl text-gray-400 font-body leading-relaxed mb-12">
            We transform fragmented healthcare workflows and data into
            intelligent systems — powering smarter decisions across health
            systems, payers, and pharmaceutical companies.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">

          <a
            href="#contact"
            className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue hover:bg-blue-bright rounded-full transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:-translate-y-1 group">

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            Get in Touch
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 rounded-full transition-all duration-300 w-full sm:w-auto hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">

            Learn More{' '}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>);

}