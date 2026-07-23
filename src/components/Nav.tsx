import React, { useEffect, useState } from 'react';

const LINKS = [
{ label: 'Mission', href: '#mission' },
{ label: 'Impact', href: '#impact' },
{ label: 'Where we embed', href: '#embed' }];


export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
      scrolled ? 'bg-bone/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'}`
      }>
      
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="font-serif text-2xl font-medium tracking-tight text-ink">
          Sala
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="text-sm text-muted transition-colors hover:text-ink">
            
              {l.label}
            </a>
          )}
        </div>
        <a
          href="#embed"
          className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-forestdark">
          
          Get in touch
        </a>
      </nav>
    </header>);

}