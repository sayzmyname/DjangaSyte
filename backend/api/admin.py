from django.contrib import admin
from .models import Country, Tour, TourTariff, TourDay, Hotel, Review, Booking, FAQItem


class TourTariffInline(admin.TabularInline):
    model = TourTariff
    extra = 1


class TourDayInline(admin.TabularInline):
    model = TourDay
    extra = 1


class FAQItemInline(admin.TabularInline):
    model = FAQItem
    extra = 1


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "country", "start_date", "end_date", "base_price", "is_active")
    list_filter = ("is_active", "country")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [TourTariffInline, TourDayInline, FAQItemInline]


@admin.register(TourTariff)
class TourTariffAdmin(admin.ModelAdmin):
    list_display = ("id", "tour", "name", "price", "spots_left")
    list_filter = ("tour",)
    search_fields = ("name", "description")


@admin.register(TourDay)
class TourDayAdmin(admin.ModelAdmin):
    list_display = ("id", "tour", "day_number", "title")
    list_filter = ("tour",)
    search_fields = ("title", "description")


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name", "description", "features")
    filter_horizontal = ("tour",)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "tour", "author_name", "user", "rating", "created_at")
    list_filter = ("rating", "tour")
    search_fields = ("author_name", "text")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "tour", "tariff", "name", "phone", "email", "created_at")
    list_filter = ("tour", "tariff", "created_at")
    search_fields = ("name", "phone", "email", "comment")


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ("id", "tour", "order", "question")
    list_filter = ("tour",)
    search_fields = ("question", "answer")
