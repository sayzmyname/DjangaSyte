from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from .models import Tour, Booking, Review, FAQItem
from .serializers import (
    TourSerializer,
    BookingSerializer,
    ReviewSerializer,
    FAQItemSerializer,
)


class TourViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ListAPIView & RetrieveAPIView:
    GET /api/tours/
    GET /api/tours/{id}/
    """
    queryset = Tour.objects.all().prefetch_related(
        "tariffs", "days", "hotels", "faq_items", "reviews"
    )
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]


class BookingCreateView(generics.CreateAPIView):
    """
    POST /api/bookings/
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Support both plan name (e.g. "Стандарт", "Лайт", "Комфорт") and direct tariff id
        data = request.data.copy()
        if "tour" not in data or not data.get("tour"):
            tour = Tour.objects.filter(is_active=True).first() or Tour.objects.first()
            if tour:
                data["tour"] = tour.id

        plan_name = data.get("plan")
        if plan_name and ("tariff" not in data or not data.get("tariff")):
            tariff = None
            tour_id = data.get("tour")
            if tour_id:
                from .models import TourTariff
                tariff = TourTariff.objects.filter(tour_id=tour_id, name__iexact=plan_name).first()
            if not tariff:
                from .models import TourTariff
                tariff = TourTariff.objects.filter(name__iexact=plan_name).first()
            if tariff:
                data["tariff"] = tariff.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ReviewCreateView(generics.ListCreateAPIView):
    """
    POST /api/reviews/ (and GET /api/reviews/)
    """
    queryset = Review.objects.all().order_by("-created_at")
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        tour = serializer.validated_data.get("tour")
        if not tour:
            tour = Tour.objects.filter(is_active=True).first() or Tour.objects.first()
            serializer.save(tour=tour)
        else:
            serializer.save()


class FAQListView(generics.ListAPIView):
    """
    GET /api/faq/
    """
    queryset = FAQItem.objects.all().order_by("order")
    serializer_class = FAQItemSerializer
    permission_classes = [permissions.AllowAny]
