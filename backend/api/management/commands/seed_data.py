from django.core.management.base import BaseCommand
from api.models import Country, Tour, TourTariff, TourDay, Hotel, Review, FAQItem
from decimal import Decimal
import datetime


class Command(BaseCommand):
    help = "Seed initial data for tours, tariffs, hotels, reviews, and FAQs"

    def handle(self, *args, **options):
        country, _ = Country.objects.get_or_create(name="Россия")

        tour, _ = Tour.objects.get_or_create(
            slug="elbrus-new-year-camp",
            defaults={
                "title": "Elbrus New Year Camp",
                "description": "Новогодний кэмп на Эльбрусе",
                "country": country,
                "start_date": datetime.date(2026, 12, 31),
                "end_date": datetime.date(2027, 1, 6),
                "base_price": Decimal("49900.00"),
                "image_url": "https://images.pexels.com/photos/16722095/pexels-photo-16722095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                "is_active": True,
            },
        )

        tariffs = [
            ("Лайт", Decimal("49900.00"), "Базовый формат для тех, кто хочет попробовать горы.", 8),
            ("Стандарт", Decimal("59900.00"), "Самый выбираемый вариант: комфорт и полная поддержка.", 12),
            ("Комфорт", Decimal("74900.00"), "Максимум удобства и индивидуальный подход.", 3),
        ]
        for name, price, desc, spots in tariffs:
            TourTariff.objects.get_or_create(
                tour=tour,
                name=name,
                defaults={"price": price, "description": desc, "spots_left": spots},
            )

        days = [
            (1, "Приезд и заселение", "Трансфер из аэропорта Минеральные Воды в Терскол, заселение в отель и знакомство с группой."),
            (2, "Новый год в горах", "Утреннее катание на склонах, праздничный ужин и фейерверк над заснеженными вершинами."),
            (3, "Первые шаги", "Подгонка снаряжения и первые спуски с инструктором на учебных склонах."),
            (4, "Катание по склонам Эльбруса", "Спуски по трассам разного уровня сложности вместе с инструктором."),
            (5, "Фрирайд и экскурсия", "День свободного катания и экскурсия к водопадам и ледникам."),
            (6, "Отдых и сауна", "Свободное катание, вечер в сауне и банкет в честь окончания тура."),
            (7, "Отъезд", "Завтрак, трансфер в аэропорт и тёплые воспоминания."),
        ]
        for num, title, desc in days:
            TourDay.objects.get_or_create(
                tour=tour,
                day_number=num,
                defaults={"title": title, "description": desc},
            )

        h1, _ = Hotel.objects.get_or_create(
            name="Горный отель «Снежная долина»",
            defaults={
                "description": "Уютный отель у подножия Эльбруса с видом на ледники и сауной после катания.",
                "features": "Сауна, Ресторан, Сушилка для обуви",
            },
        )
        h1.tour.add(tour)

        h2, _ = Hotel.objects.get_or_create(
            name="Шале «Эльбрус Лодж»",
            defaults={
                "description": "Деревянные шале в тихой части посёлка, идеальны для небольших групп.",
                "features": "Камин, Тёплые номера, Парковка",
            },
        )
        h2.tour.add(tour)

        reviews = [
            ("Анна", 5, "Катание было потрясающим, инструкторы внимательные, а Новый год в горах — незабываемо!"),
            ("Дмитрий", 5, "Впервые встал на сноуборд — инструкторы всё объяснили понятно. Организация на высшем уровне."),
            ("Елена", 4, "Праздничная атмосфера, сауна после склона, свежий воздух — обязательно вернусь!"),
        ]
        for author, rating, text in reviews:
            Review.objects.get_or_create(
                tour=tour,
                author_name=author,
                text=text,
                defaults={"rating": rating},
            )

        faqs = [
            (1, "Когда проходит тур?", "С 31 декабря 2026 по 6 января 2027 года: 7 дней и 6 ночей в Терсколе."),
            (2, "Нужна ли подготовка?", "Опыт катания не обязателен: инструкторы научат с нуля. Базовая физическая форма поможет получить от тура больше удовольствия."),
            (3, "Что входит в стоимость?", "Проживание, питание, занятия с инструкторами, трансфер из аэропорта и страховка. Детали зависят от выбранного тарифа."),
            (4, "Можно ли арендовать снаряжение?", "Да, в тарифах Стандарт и Комфорт прокат лыж, сноуборда и экипировки включён. В тарифе Лайт его можно арендовать отдельно."),
            (5, "Что если изменится погода?", "Расписание гибкое: при сильном ветре или снегопаде катание переносим на другой день в рамках тура."),
        ]
        for order, q, a in faqs:
            FAQItem.objects.get_or_create(
                tour=tour,
                question=q,
                defaults={"answer": a, "order": order},
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded initial data."))
