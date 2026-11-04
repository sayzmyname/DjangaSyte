import { INCLUDED } from '@/data/tour';

export default function Included() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Включено</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Что входит в тур</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Катание, отдых и праздник в горах — без лишних забот.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-2xl border border-navy-100 bg-navy-50/50 p-8 transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:bg-white hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-white transition-colors group-hover:bg-accent-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
