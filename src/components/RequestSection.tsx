import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail, Phone, Send } from 'lucide-react';
import { PLANS, TOUR, type PlanName } from '@/data/tour';
import { formatPhone, isCompletePhone } from '@/lib/phoneMask';

type RequestSectionProps = {
  selectedPlan: PlanName;
  onPlanChange: (plan: PlanName) => void;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

type FormErrors = Partial<Record<'name' | 'phone' | 'email', string>>;

const EMPTY_FORM: FormState = { name: '', phone: '', email: '', comment: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Укажите имя';
  if (!isCompletePhone(form.phone)) errors.phone = 'Введите номер телефона полностью';
  if (!form.email.trim()) {
    errors.email = 'Укажите почту';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Проверьте адрес почты';
  }
  return errors;
}

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-700/50 transition focus:outline-none focus:ring-4';
const inputOk = 'border-navy-100 focus:border-navy-500 focus:ring-navy-100';
const inputError = 'border-accent-600 focus:ring-accent-100';

export default function RequestSection({ selectedPlan, onPlanChange }: RequestSectionProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('submitting');
    fetch('http://localhost:8000/api/bookings/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        plan: selectedPlan,
        comment: form.comment.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking failed');
        return res.json();
      })
      .then(() => {
        setForm(EMPTY_FORM);
        setStatus('success');
      })
      .catch((err) => {
        console.error('Booking error:', err);
        setStatus('error');
      });
  };

  const fieldClass = (field: keyof FormErrors) => `${inputBase} ${errors[field] ? inputError : inputOk}`;

  return (
    <section id="request" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Заявка</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Оставить заявку</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">
            Оставьте контакты, и мы свяжемся с вами в течение рабочего дня, чтобы помочь выбрать тариф и ответить на вопросы.
          </p>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6 shadow-sm md:p-10 lg:col-span-3">
          {status === 'success' ? (
            <div
              role="status"
              className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
            >
              <CheckCircle2 className="h-14 w-14 text-emerald-700" />
              <h3 className="mt-6 text-2xl font-bold text-emerald-900">Спасибо за заявку!</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-emerald-800">
                Мы свяжемся с вами в ближайшее время, чтобы обсудить детали тура.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 rounded-full border border-emerald-300 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy-900">Имя *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Как к вам обращаться"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass('name')}
                  />
                  {errors.name && <span className="mt-1.5 block text-xs font-medium text-accent-600">{errors.name}</span>}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy-900">Телефон *</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', formatPhone(e.target.value))}
                    placeholder="+7 (900) 000-00-00"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    className={fieldClass('phone')}
                  />
                  {errors.phone && <span className="mt-1.5 block text-xs font-medium text-accent-600">{errors.phone}</span>}
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy-900">Почта *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass('email')}
                  />
                  {errors.email && <span className="mt-1.5 block text-xs font-medium text-accent-600">{errors.email}</span>}
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-navy-900">Тариф</span>
                  <select
                    value={selectedPlan}
                    onChange={(e) => onPlanChange(e.target.value as PlanName)}
                    className={`${inputBase} ${inputOk}`}
                  >
                    {PLANS.map((plan) => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name} — {plan.price}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-navy-900">Комментарий</span>
                <textarea
                  rows={4}
                  value={form.comment}
                  onChange={(e) => updateField('comment', e.target.value)}
                  placeholder="Пожелания по размещению, опыт катания, вопросы"
                  className={`${inputBase} ${inputOk} resize-none`}
                />
              </label>

              {status === 'error' && (
                <p role="alert" className="rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700">
                  Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-8 py-4 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              <div className="flex flex-col gap-3 border-t border-navy-100 pt-6 text-sm text-navy-800 sm:flex-row sm:justify-between">
                <a
                  href={`tel:${TOUR.phoneHref}`}
                  className="inline-flex items-center gap-2 font-semibold text-navy-900 transition hover:text-accent-600"
                >
                  <Phone className="h-4 w-4 text-accent-600" />
                  {TOUR.phone}
                </a>
                <a
                  href={`mailto:${TOUR.email}`}
                  className="inline-flex items-center gap-2 font-semibold text-navy-900 transition hover:text-accent-600"
                >
                  <Mail className="h-4 w-4 text-accent-600" />
                  {TOUR.email}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
