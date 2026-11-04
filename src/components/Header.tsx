import { useEffect, useState } from 'react';
import { Menu, Mountain, X } from 'lucide-react';
import { TOUR } from '@/data/tour';

const NAV_LINKS = [
  { href: '#about', label: 'О туре' },
  { href: '#tariffs', label: 'Тарифы' },
  { href: '#program', label: 'Программа' },
  { href: '#hotels', label: 'Отели' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <a href="#top" className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              solid ? 'bg-navy-800 text-white' : 'bg-white/15 text-white ring-1 ring-white/30'
            }`}
          >
            <Mountain className="h-5 w-5" />
          </span>
          <span
            className={`text-base font-semibold transition-colors ${
              solid ? 'text-navy-900' : 'text-white'
            }`}
          >
            Elbrus Camp
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-600 ${
                solid ? 'text-navy-800' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#request"
            className="hidden rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg sm:inline-flex"
          >
            Оставить заявку
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-lg xl:hidden ${
              solid ? 'text-navy-900' : 'text-white'
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-6 pb-6 pt-4 xl:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-navy-800"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#request"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Оставить заявку
            </a>
            <p className="text-sm text-navy-700">{TOUR.phone}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
