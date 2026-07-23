import React from 'react';
import { Reveal } from './Reveal';

export function Mission() {
  return (
    <section id="mission" className="w-full border-t border-line bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <Reveal>
          <p className="mb-14 text-xs uppercase tracking-eyebrow text-muted">Our mission</p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight text-ink">
                Sala is on a mission to transform healthcare in the markets that
                need it <span className="italic text-forest">most.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:pt-3">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-muted">
                Sala embeds directly across health systems and insurers, equipping
                claims teams with AI operators that eliminate manual work — and
                executives with a real-time intelligence layer across care, cost,
                and payment.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

}