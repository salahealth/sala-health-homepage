import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-line bg-forest text-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-5xl font-light tracking-tight lg:text-7xl">
              Reconcile <span className="italic">healthcare.</span>
            </p>
          </div>
          <a
            href="mailto:hello@sala.health"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-bone/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-bone hover:text-forest">
            
            hello@sala.health
            <ArrowUpRightIcon className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-bone/20 pt-8 text-sm text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-lg text-bone">Sala</span>
          <span>© {new Date().getFullYear()} Sala Health. All rights reserved.</span>
        </div>
      </div>
    </footer>);

}