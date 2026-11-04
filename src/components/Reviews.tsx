import { Quote, Star } from 'lucide-react';
import { REVIEWS } from '@/data/tour';

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Отзывы</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Что говорят участники</h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="review-card flex flex-col rounded-2xl border border-navy-100 bg-navy-50/50 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="h-8 w-8 text-accent-500" />
              <div className="mt-4 flex gap-0.5 text-accent-500" aria-label={`Оценка ${review.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-navy-100'}`}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-800">
                {review.text}
              </blockquote>
              <figcaption className="mt-8 border-t border-navy-100 pt-6 font-semibold text-navy-900">
                {review.name}, {review.age}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
