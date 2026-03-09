import React from 'react';
import { motion } from 'framer-motion';
export function CTASection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-void text-center relative overflow-hidden">

      {/* Animated Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-20 mix-blend-screen pointer-events-none"></div>

      {/* Large radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_50%)] blur-3xl rounded-full pointer-events-none animate-breathe"></div>

      {/* Offset cyan glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_50%)] blur-3xl rounded-full pointer-events-none animate-float-slow"></div>

      {/* Floating light particles */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-blue-bright/60 blur-[1px] animate-float-fast pointer-events-none"></div>
      <div
        className="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full bg-cyan/50 blur-[2px] animate-float-diagonal pointer-events-none"
        style={{
          animationDelay: '1s'
        }}>
      </div>
      <div
        className="absolute top-[60%] left-[25%] w-1.5 h-1.5 rounded-full bg-purple/60 blur-[1px] animate-float-slow pointer-events-none"
        style={{
          animationDelay: '2s'
        }}>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-6 tracking-tight text-gradient-animated pb-2">
            Ready to build the future of SEA healthcare?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-body leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you are a health system, payer, or pharmaceutical company —
            we would love to explore how Sala Health can transform your
            operations.
          </p>
          <a
            href="mailto:support@salahealth.co"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-blue hover:bg-cyan rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:-translate-y-1 animate-pulse-glow group relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>);

}