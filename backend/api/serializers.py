from rest_framework import serializers
from .models import Country, Tour, TourTariff, TourDay, Hotel, Review, Booking, FAQItem


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name"]


class TourTariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourTariff
        fields = ["id", "tour", "name", "price", "description", "spots_left"]
        extra_kwargs = {
            "tour": {"required": False}
        }


class TourDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDay
        fields = ["id", "tour", "day_number", "title", "description"]
        extra_kwargs = {
            "tour": {"required": False}
        }


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ["id", "name", "description", "features"]


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ["id", "tour", "question", "answer", "order"]
        extra_kwargs = {
            "tour": {"required": False}
        }


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "tour", "user", "author_name", "rating", "text", "created_at"]
        extra_kwargs = {
            "tour": {"required": False},
            "user": {"required": False, "allow_null": True},
            "author_name": {"required": False, "allow_blank": True},
        }


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "tour", "tariff", "name", "phone", "email", "comment", "created_at"]
        extra_kwargs = {
            "tour": {"required": False},
            "tariff": {"required": False, "allow_null": True},
            "email": {"required": False, "allow_blank": True},
            "comment": {"required": False, "allow_blank": True},
        }

    def create(self, validated_data):
        # If tour is not provided in validated_data, assign the first active tour if available
        if "tour" not in validated_data:
            first_tour = Tour.objects.filter(is_active=True).first() or Tour.objects.first()
            if first_tour:
                validated_data["tour"] = first_tour
        return super().create(validated_data)


class TourSerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)
    country_id = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(),
        source="country",
        write_only=True,
        required=False
    )
    tariffs = TourTariffSerializer(many=True, read_only=True)
    days = TourDaySerializer(many=True, read_only=True)
    hotels = HotelSerializer(many=True, read_only=True)
    faq = FAQItemSerializer(source="faq_items", many=True, read_only=True)
    faq_items = FAQItemSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Tour
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "country",
            "country_id",
            "start_date",
            "end_date",
            "base_price",
            "image_url",
            "is_active",
            "tariffs",
            "days",
            "hotels",
            "faq",
            "faq_items",
            "reviews",
        ]
