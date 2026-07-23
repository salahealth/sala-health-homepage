import React from 'react';
import { Reveal } from './Reveal';

const STATS = [
{
  label: 'Productivity',
  value: '20×',
  body: 'faster claims workflows across complex, paper-based operations.'
},
{
  label: 'Accuracy',
  value: '97%+',
  body: 'quality on complex scanned and handwritten healthcare documents.'
},
{
  label: 'Cash flow',
  value: '45 days',
  body: 'potential reduction in hospital cash cycles through faster claim preparation and submission.'
}];


export function Impact() {
  return (
    <section id="impact" className="w-full border-t border-line bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <p className="mb-8 text-xs uppercase tracking-eyebrow text-muted">Impact</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight text-ink">
              Healthcare, <span className="italic text-forest">transformed.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg text-muted">
              Real outcomes across health systems and insurers.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {STATS.map((s, i) =>
          <Reveal key={s.label} delay={i * 0.1} className="bg-paper">
              <div className="flex h-full flex-col p-8 lg:p-10">
                <p className="text-xs uppercase tracking-eyebrow text-muted">{s.label}</p>
                <p className="mt-8 font-serif text-6xl font-light tracking-tight text-ink lg:text-7xl">
                  {s.value}
                </p>
                <p className="mt-auto pt-10 text-base leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}