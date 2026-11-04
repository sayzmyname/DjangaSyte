import { Bed, Star } from 'lucide-react';
import { HOTELS } from '@/data/tour';

export default function Hotels() {
  return (
    <section id="hotels" className="bg-navy-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Проживание</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Отели</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Тёплые номера после восхождения и вид на горы из окна.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {HOTELS.map((hotel) => (
            <article
              key={hotel.name}
              className="hotel-card group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-1 text-accent-500" aria-label={`${hotel.stars} звезды`}>
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-navy-900">{hotel.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-700">{hotel.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {hotel.amenities.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-800"
                    >
                      <Bed className="h-3.5 w-3.5 text-navy-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
