import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { PLANS, type PlanName, type Plan } from '@/data/tour';

type PricingProps = {
  onSelectPlan: (plan: PlanName) => void;
};

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [plans, setPlans] = useState<Plan[]>(PLANS);

  useEffect(() => {
    fetch('http://localhost:8000/api/tours/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tariffs');
        return res.json();
      })
      .then((data) => {
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          Array.isArray(data[0].tariffs) &&
          data[0].tariffs.length > 0
        ) {
          const apiTariffs = data[0].tariffs;
          setPlans((prevPlans) =>
            prevPlans.map((p) => {
              const matched = apiTariffs.find(
                (t: any) => t.name.toLowerCase() === p.name.toLowerCase()
              );
              if (!matched) return p;
              return {
                ...p,
                price: `${Number(matched.price).toLocaleString('ru-RU')} ₽`,
                description: matched.description || p.description,
                spotsLeft:
                  matched.spots_left !== undefined ? matched.spots_left : p.spotsLeft,
              };
            })
          );
        }
      })
      .catch((err) => {
        console.error('Error fetching tariffs:', err);
      });
  }, []);

  return (
    <section id="tariffs" className="tariffs bg-navy-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Стоимость</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Тарифы</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Выберите формат, который подходит именно вам. Во всех тарифах работают инструкторы.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`tariff-card relative flex flex-col rounded-2xl bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.highlighted
                  ? 'border-2 border-accent-500 shadow-2xl md:-my-6 md:scale-[1.03]'
                  : 'border border-navy-100 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-4 py-1 text-xs font-semibold text-white shadow-md">
                  Хит
                </span>
              )}
              <h3 className="text-xl font-semibold text-navy-900">{plan.name}</h3>
              <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-navy-700">{plan.description}</p>
              <p className="mt-6 text-3xl font-bold text-navy-900">{plan.price}</p>
              <p className="text-sm text-navy-700">за человека</p>
              <p className="mt-3 text-sm font-semibold text-accent-600">Осталось мест: {plan.spotsLeft}</p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-navy-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#request"
                onClick={() => onSelectPlan(plan.name)}
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? 'bg-accent-600 text-white shadow-md hover:bg-accent-700'
                    : 'bg-navy-800 text-white hover:bg-navy-900'
                }`}
              >
                Выбрать «{plan.name}»
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
