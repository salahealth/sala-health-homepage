import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';

const highlights = [
  'Automated form filling and submission preparation',
  'Pre-submission risk flags for coding, documentation, and eligibility gaps',
  'Reimbursement timing visibility across government and private insurance queues',
];

export function PhilHealthSpotlight() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_80%_50%,rgba(16,185,129,0.06)_0%,transparent_60%)] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_60%)] blur-3xl rounded-full pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold tracking-widest text-emerald uppercase mb-4 block">
              PhilHealth · Philippines
            </span>

            <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight tracking-tight mb-6 max-w-lg">
              Automate PhilHealth submissions before claims leave the hospital.
            </h2>

            <p className="text-gray-400 font-body leading-relaxed mb-10 max-w-md">
              Atomix fills PhilHealth requirements, checks claim packets for
              denial risk, and gives finance teams a faster path from discharge
              to reimbursement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/atomix/philhealth"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-void bg-emerald hover:bg-emerald-bright rounded-full transition-all duration-300 shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                See how it works
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>

              <Link
                to="/atomix/philhealth/report"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white border border-white/20 hover:bg-white/10 hover:border-white/40 rounded-full transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Estimate recovery
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative bg-surface border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-white">What Atomix does for your claims team</div>
                <span className="shrink-0 rounded-full bg-emerald/10 border border-emerald/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-emerald">
                  PhilHealth
                </span>
              </div>

              <div className="px-6 py-6 space-y-5">
                {highlights.map((highlight, i) => (
                  <motion.div
                    key={highlight}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                      <CheckIcon className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <Link
                  to="/atomix/philhealth/report"
                  className="flex items-center justify-center w-full py-3 rounded-lg border border-white/8 text-sm font-medium text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200 gap-1.5 group"
                >
                  Estimate your PhilHealth cash recovery
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
