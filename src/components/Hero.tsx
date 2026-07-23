import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRightIcon } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] w-full overflow-hidden bg-bone">
      <div className="flex w-full flex-col px-6 pb-8 pt-28 lg:px-10">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="hero-title flex flex-col font-serif font-light tracking-tight text-ink">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title-line">
              
              Reconcile
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title-line italic text-forest">
              
              healthcare.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              An intelligence layer across care, cost, and payment. Built for emerging markets.
            </p>
            <a
              href="#mission"
              className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink">
              
              Discover our mission
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors group-hover:border-ink">
                <ArrowDownRightIcon className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>);

}