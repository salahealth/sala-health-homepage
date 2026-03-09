import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { ZapIcon, UsersIcon, BarChart3Icon } from 'lucide-react';
const pillars = [
{
  title: 'Workflow Automation',
  icon: ZapIcon,
  description:
  'Streamlining clinical and operational workflows across fragmented health systems, reducing manual overhead and accelerating care delivery.',
  colorTheme: 'blue',
  bgClass: 'bg-blue/10',
  textClass: 'text-blue',
  hoverBorderClass: 'hover:border-blue/40',
  hoverGlowClass: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
  gradientFrom: 'from-blue/10'
},
{
  title: 'Engagement Platforms',
  icon: UsersIcon,
  description:
  'Optimized platforms that connect payers, providers, and patients — driving better outcomes through intelligent engagement.',
  colorTheme: 'cyan',
  bgClass: 'bg-cyan/10',
  textClass: 'text-cyan',
  hoverBorderClass: 'hover:border-cyan/40',
  hoverGlowClass: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]',
  gradientFrom: 'from-cyan/10'
},
{
  title: 'Operational Insight',
  icon: BarChart3Icon,
  description:
  'Real-time analytics and decision intelligence that turn healthcare data into actionable operational clarity.',
  colorTheme: 'purple',
  bgClass: 'bg-purple/10',
  textClass: 'text-purple',
  hoverBorderClass: 'hover:border-purple/40',
  hoverGlowClass: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]',
  gradientFrom: 'from-purple/10'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    rotate: -2
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
export function WhatWeDo() {
  return (
    <section
      id="solutions"
      className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">

      {/* Animated gradient sweep background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent bg-[length:200%_100%] animate-[gradient-shift_8s_linear_infinite] pointer-events-none"></div>

      {/* Subtle floating particles */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-blue/30 blur-[1px] animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-3 h-3 rounded-full bg-purple/20 blur-[2px] animate-float-diagonal pointer-events-none"></div>
      <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 rounded-full bg-cyan/40 blur-[1px] animate-float-fast pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight">
            Three pillars of healthcare intelligence
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-100px'
          }}>

          {pillars.map((pillar, index) =>
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group bg-surface border border-white/5 p-8 md:p-10 ${pillar.hoverBorderClass} ${pillar.hoverGlowClass} transition-all duration-500 rounded-2xl flex flex-col h-full relative overflow-hidden hover:scale-[1.03]`}>

              {/* Animated gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] animated-border opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Subtle hover gradient inside card */}
              <div
              className={`absolute inset-0 bg-gradient-to-b ${pillar.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
            </div>

              <div
              className={`w-12 h-12 rounded-xl ${pillar.bgClass} flex items-center justify-center mb-8 ${pillar.textClass} relative z-10 group-hover:animate-breathe`}>

                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading text-white mb-4 relative z-10">
                {pillar.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-body flex-grow relative z-10">
                {pillar.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}