import type React from "react";
import { useState } from "react";
import { BookingData } from "../interfaces/booking";
import ProgressIndicator from "../components/progress-indicator";
import "../assets/contact-infomation-page.css";
import { createBooking } from "../api/booking";
import { TITLE_OPTIONS } from "../constants/title-options";

interface ContactInformationPageProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export default function ContactInformationPage({
  bookingData,
  updateBookingData,
  onNext,
}: ContactInformationPageProps) {
  const [formData, setFormData] = useState({
    title: "Mr.",
    name: "Adam",
    email: "bazytepu@teleg.eu",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.selectedRoom) {
      setApiError("No room selected.");
      return;
    }
    if (validateForm()) {
      setLoading(true);
      setApiError(null);
      try {
        const booking = await createBooking({
          roomId: bookingData.selectedRoom.id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: bookingData.guests,
          title: formData.title,
          name: formData.name,
          email: formData.email,
        });
        const fixedBooking = booking as any;
        updateBookingData({
          contactInfo: formData,
          bookingNumber: fixedBooking.booking_number,
          total: booking.total,
          selectedRoom: booking.room,
        });
        onNext();
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setApiError("Session expired. Please log in again.");
        } else {
          setApiError("Failed to create booking. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="contact-information-page">
      <ProgressIndicator currentStep={3} />

      <div className="contact-container">
        <div className="content-wrapper">
          <div className="form-section">
            <h2>CONTACT INFORMATION</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              {apiError && <div className="error-message">{apiError}</div>}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <select id="title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)}>
                  {TITLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <button type="submit" className="proceed-button" disabled={loading}>
                {loading ? "Processing..." : "PROCEED"}
              </button>
            </form>
          </div>

          <div className="summary-section">
            <div className="booking-dates-info">
              <div className="dates">
                {formatDate(bookingData.checkIn)} → {formatDate(bookingData.checkOut)}
              </div>
              <div className="nights">{bookingData.nights} NIGHT</div>
              <div className="room-guests">ROOM: {bookingData.guests} GUEST</div>
            </div>

            <div className="contact-room-image">
              <img src={bookingData.selectedRoom?.image} alt="Room image" />
            </div>

            <div className="room-details">
              <h3>{bookingData.selectedRoom?.title || "i"}</h3>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Room</span>
                  <span>S${bookingData.selectedRoom?.price.toLocaleString()}.00</span>
                </div>
                <div className="price-row">
                  <span>Tax & Service Charges (9%)</span>
                  <span>S${((bookingData.selectedRoom?.price || 0) * 0.09).toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>TOTAL</span>
                  <span>S${((bookingData.selectedRoom?.price || 0) * 1.09).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
