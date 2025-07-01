import type { BookingData } from "../App";
import ProgressIndicator from "../components/progress-indicatior";
import "../assets/confirmation-page.css";

interface ConfirmationPageProps {
  bookingData: BookingData;
  onBack: () => void;
}

export default function ConfirmationPage({ bookingData, onBack }: ConfirmationPageProps) {
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

  const tax = (bookingData.selectedRoom?.price || 0) * 0.09;
  const bookingNumber = bookingData.bookingNumber || "-";
  const guestName = bookingData.contactInfo?.name || "-";
  const guestEmail = bookingData.contactInfo?.email || "-";

  const hasConfirmation = !!bookingData.bookingNumber && !!bookingData.contactInfo;

  return (
    <div className="confirmation-page">
      <ProgressIndicator currentStep={4} />

      <div className="confirmation-container">
        <div className="confirmation-header">
          <h1>YOUR BOOKING HAS BEEN CONFIRMED</h1>
        </div>

        <div className="confirmation-details">
          {hasConfirmation ? (
            <>
              <p>We have sent your booking confirmation to the email address that you have provided.</p>
              <p>
                <strong>Check-in/Check-out:</strong> {formatDate(bookingData.checkIn)} →{" "}
                {formatDate(bookingData.checkOut)}
              </p>
              <p>
                <strong>Booking Confirmation Number:</strong> {bookingNumber}
              </p>
              <p>
                <strong>Total Price for {bookingData.nights} Night:</strong> S${bookingData.total!}
              </p>
            </>
          ) : (
            <p className="error-message">No booking confirmation found. Please try again or contact support.</p>
          )}
        </div>

        <div className="confirmation-content">
          <div className="room-section">
            <div className="room-header">
              <div className="room-image">
                <img src={bookingData.selectedRoom?.image} alt="Room image" />
              </div>
              <div className="room-info">
                <h3>ROOM: {bookingData.selectedRoom?.title || "ROOM 1 TITLE"}</h3>
                <p>{bookingData.guests} Guest</p>
              </div>
            </div>

            <div className="package-details">
              <h4>PACKAGE:</h4>
              <div className="package-breakdown">
                <div className="package-row">
                  <span>Room</span>
                  <span>S${bookingData.selectedRoom?.price.toLocaleString()}.00</span>
                </div>
                <div className="package-row">
                  <span>Tax & Service Charges (9%)</span>
                  <span>S${tax.toFixed(2)}</span>
                </div>
                <div className="package-row total">
                  <span>Total Price</span>
                  <span>S${bookingData.total!}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="guest-section">
            <h4>GUEST DETAILS</h4>
            <div className="guest-info">
              <div className="guest-row">
                <strong>Name:</strong> {guestName}
              </div>
              <div className="guest-row">
                <strong>Email Address:</strong> {guestEmail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
