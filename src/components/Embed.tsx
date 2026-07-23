import React from 'react';
import { BuildingIcon, ShieldCheckIcon } from 'lucide-react';
import { Reveal } from './Reveal';

const COLUMNS = [
{
  icon: BuildingIcon,
  title: 'Health Systems',
  paras: [
  'We embed directly into hospital claims operations to assemble fragmented patient records, generate payer-ready documentation, and identify issues before submission.',
  'From clinical reconciliation and form completion to payer-rule validation and follow-up, Sala helps providers file faster, recover more revenue, and eliminate administrative work.']

},
{
  icon: ShieldCheckIcon,
  title: 'Insurers',
  paras: [
  'We embed directly into claims intake and review to turn physical and digital claim packets into structured, adjudication-ready data.',
  'From document separation and extraction to policy validation and workflow orchestration, Sala helps insurers process claims faster, lower operating costs, and reduce leakage.']

}];


export function Embed() {
  return (
    <section id="embed" className="w-full border-t border-line bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
        <Reveal>
          <p className="mb-8 text-xs uppercase tracking-eyebrow text-muted">Where we embed</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-20 max-w-2xl font-serif text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-tight text-ink">
            Two sides of the same claim — one intelligence layer.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {COLUMNS.map((col, i) => {
            const Icon = col.icon;
            return (
              <Reveal key={col.title} delay={i * 0.12} className="bg-paper">
                <div className="flex h-full flex-col p-8 lg:p-12">
                  <span className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-forest text-bone">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-serif text-3xl font-light tracking-tight text-ink lg:text-4xl">
                    {col.title}
                  </h3>
                  <div className="mt-6 space-y-5">
                    {col.paras.map((p) =>
                    <p key={p} className="text-base leading-relaxed text-muted">
                        {p}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}