import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { TOUR } from '@/data/tour';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-900">
      <img
        src={HERO_IMAGE}
        alt="Заснеженные горные вершины Эльбруса"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/95" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32 md:pt-40">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
          {TOUR.subtitle}
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl font-bold leading-[1.15] text-white md:text-6xl">
          {TOUR.title}
        </h1>

        <div className="animate-fade-up mt-8 flex flex-wrap gap-x-8 gap-y-4 text-white/90">
          <span className="flex items-center gap-2 text-base">
            <Calendar className="h-5 w-5 text-accent-400" />
            {TOUR.dates} · {TOUR.duration}
          </span>
          <span className="flex items-center gap-2 text-base">
            <MapPin className="h-5 w-5 text-accent-400" />
            {TOUR.address}
          </span>
        </div>

        <div className="animate-fade-up mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <a
            href="#request"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-2xl"
          >
            Оставить заявку
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <div>
            <p className="text-sm text-white/75">Стоимость тура</p>
            <p className="text-2xl font-bold text-white">от {TOUR.priceFrom}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
