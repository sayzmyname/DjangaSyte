from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class Country(models.Model):
    name = models.CharField(max_length=150, verbose_name="Название страны")

    class Meta:
        verbose_name = "Страна"
        verbose_name_plural = "Страны"

    def __str__(self):
        return self.name


class Tour(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название тура")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Слаг")
    description = models.TextField(verbose_name="Описание")
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        related_name="tours",
        verbose_name="Страна",
    )
    start_date = models.DateField(verbose_name="Дата начала")
    end_date = models.DateField(verbose_name="Дата окончания")
    base_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Базовая цена",
    )
    image_url = models.URLField(
        max_length=500,
        blank=True,
        default="",
        verbose_name="Ссылка на изображение",
    )
    is_active = models.BooleanField(default=True, verbose_name="Активен")

    class Meta:
        verbose_name = "Тур"
        verbose_name_plural = "Туры"
        ordering = ["start_date"]

    def __str__(self):
        return self.title


class TourTariff(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="tariffs",
        verbose_name="Тур",
    )
    name = models.CharField(max_length=100, verbose_name="Название тарифа")
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Цена",
    )
    description = models.TextField(
        blank=True,
        default="",
        verbose_name="Описание",
    )
    spots_left = models.IntegerField(default=0, verbose_name="Осталось мест")

    class Meta:
        verbose_name = "Тариф тура"
        verbose_name_plural = "Тарифы туров"

    def __str__(self):
        return f"{self.tour.title} — {self.name}"


class TourDay(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="days",
        verbose_name="Тур",
    )
    day_number = models.PositiveIntegerField(verbose_name="Номер дня")
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание дня")

    class Meta:
        verbose_name = "День программы тура"
        verbose_name_plural = "Дни программы тура"
        ordering = ["day_number"]

    def __str__(self):
        return f"День {self.day_number}: {self.title}"


class Hotel(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название отеля")
    description = models.TextField(blank=True, default="", verbose_name="Описание")
    features = models.TextField(blank=True, default="", verbose_name="Удобства")
    tour = models.ManyToManyField(
        Tour,
        related_name="hotels",
        blank=True,
        verbose_name="Туры",
    )

    class Meta:
        verbose_name = "Отель"
        verbose_name_plural = "Отели"

    def __str__(self):
        return self.name


class Review(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name="Тур",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviews",
        verbose_name="Пользователь",
    )
    author_name = models.CharField(
        max_length=150,
        blank=True,
        default="Гость",
        verbose_name="Имя автора",
    )
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Оценка (1-5)",
    )
    text = models.TextField(verbose_name="Текст отзыва")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-created_at"]

    def __str__(self):
        author = self.user.username if self.user else self.author_name
        return f"Отзыв от {author} ({self.rating}/5)"


class Booking(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="bookings",
        verbose_name="Тур",
    )
    tariff = models.ForeignKey(
        TourTariff,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="bookings",
        verbose_name="Тариф",
    )
    name = models.CharField(max_length=200, verbose_name="Имя")
    phone = models.CharField(max_length=50, verbose_name="Телефон")
    email = models.EmailField(blank=True, default="", verbose_name="Email")
    comment = models.TextField(blank=True, default="", verbose_name="Комментарий")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирования"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Бронь: {self.name} ({self.phone}) на {self.tour.title}"


class FAQItem(models.Model):
    tour = models.ForeignKey(
        Tour,
        on_delete=models.CASCADE,
        related_name="faq_items",
        verbose_name="Тур",
    )
    question = models.CharField(max_length=255, verbose_name="Вопрос")
    answer = models.TextField(verbose_name="Ответ")
    order = models.IntegerField(default=0, verbose_name="Порядок")

    class Meta:
        verbose_name = "Вопрос-ответ (FAQ)"
        verbose_name_plural = "Вопросы-ответы (FAQ)"
        ordering = ["order"]

    def __str__(self):
        return self.question
