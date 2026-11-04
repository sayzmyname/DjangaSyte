import { useState, useEffect } from 'react';
import { PROGRAM } from '@/data/tour';

type ProgramDay = {
  date: string;
  title: string;
  text: string;
  highlighted?: boolean;
};

export default function Program() {
  const [program, setProgram] = useState<ProgramDay[]>(PROGRAM);

  useEffect(() => {
    fetch('http://localhost:8000/api/tours/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tour program');
        return res.json();
      })
      .then((data) => {
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          Array.isArray(data[0].days) &&
          data[0].days.length > 0
        ) {
          const apiDays = data[0].days;
          setProgram((prev) =>
            prev.map((day, idx) => {
              const matched = apiDays.find((d: any) => d.day_number === idx + 1);
              if (!matched) return day;
              return {
                ...day,
                title: matched.title || day.title,
                text: matched.description || day.text,
              };
            })
          );
        }
      })
      .catch((err) => {
        console.error('Error fetching program:', err);
      });
  }, []);

  return (
    <section id="program" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Маршрут</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Программа по дням</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Семь дней катания, отдыха и новогоднего праздника в горах.
          </p>
        </div>

        <ol className="relative mx-auto mt-16 max-w-2xl">
          <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-navy-100" />
          {program.map((item, index) => {
            const dayNumber = index + 1;
            return (
              <li
                key={item.date || dayNumber}
                data-day={dayNumber}
                className="tour-day relative pb-10 pl-20 last:pb-0"
              >
                <span
                  className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-bold ${
                    item.highlighted
                      ? 'border-accent-600 bg-accent-600 text-white shadow-lg'
                      : 'border-navy-200 bg-white text-navy-800'
                  }`}
                >
                  {dayNumber}
                </span>
                <div
                  className={`rounded-2xl p-6 transition duration-300 hover:shadow-md ${
                    item.highlighted ? 'border border-accent-200 bg-accent-50' : 'bg-navy-50/60'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      item.highlighted ? 'text-accent-700' : 'text-accent-600'
                    }`}
                  >
                    День {dayNumber} · {item.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
