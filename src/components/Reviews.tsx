import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { REVIEWS } from '@/data/tour';

type ReviewItem = {
  name: string;
  age?: number | string;
  rating: number;
  text: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);

  useEffect(() => {
    fetch('http://localhost:8000/api/reviews/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(
            data.map((r: any) => ({
              name: r.author_name || 'Участник',
              age: r.age || 29,
              rating: r.rating,
              text: r.text,
            }))
          );
        }
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, []);

  return (
    <section id="reviews" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">Отзывы</p>
          <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Что говорят участники</h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <figure
              key={`${review.name}-${idx}`}
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
                {review.name}{review.age ? `, ${review.age}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
