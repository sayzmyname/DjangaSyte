from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TourViewSet, BookingCreateView, ReviewCreateView, FAQListView

router = DefaultRouter()
router.register(r'tours', TourViewSet, basename='tour')

urlpatterns = [
    path('bookings/', BookingCreateView.as_view(), name='booking-create'),
    path('reviews/', ReviewCreateView.as_view(), name='review-create'),
    path('faq/', FAQListView.as_view(), name='faq-list'),
    path('', include(router.urls)),
]
