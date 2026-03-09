import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Building2Icon, ShieldIcon, PillIcon } from 'lucide-react';
const sectors = [
{
  title: 'Health Systems',
  icon: Building2Icon,
  description:
  'Hospitals and health networks across Southeast Asia modernizing their operations and patient pathways.',
  colorTheme: 'blue',
  textClass: 'text-blue',
  glowClass: 'bg-blue/20',
  hoverBorderClass: 'hover:border-blue/40',
  gradientDivider: 'from-blue/50 via-blue-bright/50 to-transparent'
},
{
  title: 'Payers',
  icon: ShieldIcon,
  description:
  'Insurance companies and government health programs optimizing coverage, claims, and member engagement.',
  colorTheme: 'cyan',
  textClass: 'text-cyan',
  glowClass: 'bg-cyan/20',
  hoverBorderClass: 'hover:border-cyan/40',
  gradientDivider: 'from-cyan/50 via-blue/50 to-transparent'
},
{
  title: 'Pharmaceutical Companies',
  icon: PillIcon,
  description:
  'Pharma organizations improving market access, distribution, and real-world evidence across SEA markets.',
  colorTheme: 'emerald',
  textClass: 'text-emerald',
  glowClass: 'bg-emerald/20',
  hoverBorderClass: 'hover:border-emerald/40',
  gradientDivider: 'from-emerald/50 via-emerald-bright/50 to-transparent'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    x: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
export function WhoWeServe() {
  return (
    <section
      id="sectors"
      className="py-24 md:py-32 bg-void relative overflow-hidden">

      {/* Slowly moving radial glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_50%)] blur-3xl rounded-full animate-float-slow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-cyan uppercase mb-4 block">
            Who We Serve
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight">
            Partnering across the healthcare value chain
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-100px'
          }}>

          {sectors.map((sector, index) =>
          <motion.div
            key={index}
            variants={itemVariants}
            className={`flex flex-col pt-8 transition-colors duration-500 relative group`}>

              {/* Animated gradient dividers replacing static border-t */}
              <div
              className={`absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r ${sector.gradientDivider} bg-[length:200%_auto] animate-[gradient-text_3s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500`}>
            </div>

              {/* Subtle glow behind icon */}
              <div
              className={`absolute top-8 left-0 w-16 h-16 ${sector.glowClass} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
            </div>

              <div
              className={`mb-6 ${sector.textClass} relative z-10 group-hover:animate-breathe group-hover:scale-110 transition-transform duration-500 origin-left`}>

                <sector.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-heading text-white mb-4 relative z-10">
                {sector.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-body relative z-10">
                {sector.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}