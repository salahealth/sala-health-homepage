import React from 'react';
import { Reveal } from './Reveal';

const ALUMNI = [
'Scale AI',
'Stanford',
'Stanford Medicine',
'BCG',
'Google',
'LinkedIn'];


export function Team() {
  return (
    <section className="w-full border-t border-line bg-forest text-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <p className="mb-12 text-center text-xs uppercase tracking-eyebrow text-bone/60">
            Built by alumni from
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            {ALUMNI.map((name) =>
            <span
              key={name}
              className="font-serif text-xl font-light tracking-tight text-bone/85 sm:text-2xl lg:text-3xl">
              
                {name}
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>);

}