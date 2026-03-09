import React, { useEffect, useState, useRef, Children } from 'react';
import { motion, useInView } from 'framer-motion';
// Simple counter component
function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2





}: {value: number;prefix?: string;suffix?: string;duration?: number;}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.round(duration * 1000 / 16); // ~60fps
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quad
        const currentCount = Math.round(
          end * (1 - (1 - progress) * (1 - progress))
        );
        setCount(currentCount);
        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(end);
        }
      }, 16);
      return () => clearInterval(counter);
    }
  }, [isInView, value, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>);

}
const companyVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
export function Traction() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt text-white relative overflow-hidden">
      {/* Radial blue glow behind stats */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] blur-3xl rounded-full pointer-events-none"></div>

      {/* Subtle floating particles */}
      <div className="absolute top-[10%] left-[20%] w-2 h-2 rounded-full bg-blue/40 blur-[1px] animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[25%] w-3 h-3 rounded-full bg-cyan/30 blur-[2px] animate-float-diagonal pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-xs font-bold tracking-widest text-blue uppercase mb-4 block">
            Our Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="flex flex-col items-center text-center relative">

            <div className="absolute inset-0 bg-blue/10 blur-3xl rounded-full animate-breathe -z-10 scale-150"></div>
            <div className="text-6xl md:text-7xl font-heading mb-4 text-gradient-animated relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <AnimatedCounter
                value={425}
                prefix="$"
                suffix="B+"
                duration={2.5} />

            </div>
            <p className="text-gray-400 font-body text-lg leading-relaxed max-w-xs">
              Combined market capitalization of our client and engagement base
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="flex flex-col items-center text-center relative">

            <div
              className="absolute inset-0 bg-cyan/10 blur-3xl rounded-full animate-breathe -z-10 scale-150"
              style={{
                animationDelay: '1s'
              }}>
            </div>
            <div className="text-6xl md:text-7xl font-heading mb-4 text-gradient-animated relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <AnimatedCounter value={2025} duration={1.5} />
            </div>
            <p className="text-gray-400 font-body text-lg leading-relaxed max-w-xs">
              Year founded — moving fast from day one
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="flex flex-col items-center text-center relative">

            <div
              className="absolute inset-0 bg-purple/10 blur-3xl rounded-full animate-breathe -z-10 scale-150"
              style={{
                animationDelay: '2s'
              }}>
            </div>
            <div className="text-6xl md:text-7xl font-heading mb-4 text-gradient-animated relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <AnimatedCounter value={3} duration={1} />
            </div>
            <p className="text-gray-400 font-body text-lg leading-relaxed max-w-xs">
              Core verticals across the SEA healthcare ecosystem
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true
          }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
          className="max-w-5xl mx-auto border-t border-white/5 pt-12 text-center">

          <motion.p
            variants={companyVariants}
            className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-10">

            Our team comes from
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 md:gap-x-14">
            {[
            {
              name: 'Stanford',
              style: 'font-heading text-xl md:text-2xl tracking-tight'
            },
            {
              name: 'Harvard',
              style: 'font-heading text-xl md:text-2xl tracking-tight'
            },
            {
              name: 'Google',
              style:
              'font-body text-xl md:text-2xl font-medium tracking-tight'
            },
            {
              name: 'LinkedIn',
              style: 'font-body text-xl md:text-2xl font-bold tracking-tight'
            },
            {
              name: 'Scale AI',
              style:
              'font-body text-xl md:text-2xl font-semibold tracking-wider uppercase text-[0.85em]'
            },
            {
              name: 'Oscar Health',
              style:
              'font-body text-xl md:text-2xl font-medium tracking-tight'
            },
            {
              name: 'Tia Health',
              style:
              'font-body text-xl md:text-2xl font-medium tracking-tight'
            }].
            map((company, i) =>
            <motion.span
              key={i}
              variants={companyVariants}
              className={`text-gray-500 hover:text-blue-bright transition-colors duration-300 ${company.style} cursor-default hover:scale-110 inline-block`}>

                {company.name}
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

}