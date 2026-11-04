import { Mountain, Phone, Mail, MapPin } from 'lucide-react';
import { TOUR } from '@/data/tour';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold">Elbrus Camp</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Новогодние горные туры на Эльбрус с опытными гидами, безопасной подготовкой и тёплым приёмом.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400">Контакты</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/85">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-400" />
              <a href={`tel:${TOUR.phoneHref}`} className="transition hover:text-white">

                {TOUR.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-400" />
              <a href={`mailto:${TOUR.email}`} className="transition hover:text-white">
                {TOUR.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent-400" />
              <span>{TOUR.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400">Готовы поехать?</h3>
          <p className="mt-5 text-sm leading-relaxed text-white/75">
            Места в группах ограничены. Оставьте заявку, и мы забронируем ваш тариф.
          </p>
          <a
            href="#request"
            className="mt-6 inline-flex rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700"
          >
            Оставить заявку
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/60">
          © 2026 {TOUR.title}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
