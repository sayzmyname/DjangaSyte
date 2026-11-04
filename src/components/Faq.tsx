import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/tour';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-navy-50 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Частые вопросы</h2>
        </div>

        <div className="mt-12 divide-y divide-navy-100 overflow-hidden rounded-2xl bg-white shadow-sm">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="faq-item">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-navy-50"
                >
                  <span className="font-semibold text-navy-900">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-navy-700">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
