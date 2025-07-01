import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../interfaces/user";
import type { Room } from "../interfaces/room";
import "../assets/dashboard-page.css";

interface BookingWithRoom {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  booking_number: string;
  total: string;
  status: string;
  nights: number;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  room?: Room;
}

export default function DashboardPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<BookingWithRoom[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const userStr = localStorage.getItem("hotel_user");
        if (!userStr) throw new Error("User not found in localStorage");
        const userObj = JSON.parse(userStr);
        const res = await api.get(`/users/${userObj.id}`);
        const userData = res.data.user[0];
        setUser(userData);
        setBookings((userData.bookings || []) as BookingWithRoom[]);
      } catch (err) {
        setError("Failed to fetch user or bookings.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUserAndBookings();
  }, [token]);

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

  const isUpcoming = (checkInDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkIn = new Date(checkInDate);
    checkIn.setHours(0, 0, 0, 0);
    return checkIn >= today;
  };

  const upcomingBookings = bookings.filter((booking) => isUpcoming(booking.check_in) && booking.status !== "cancelled");
  const pastBookings = bookings.filter((booking) => !isUpcoming(booking.check_in) || booking.status === "cancelled");
  const currentBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.post(`/bookings/${bookingId}/cancel`);
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)));
      } catch {
        alert("Failed to cancel booking.");
      }
    }
  };

  if (!token) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="auth-required">
            <h2>Please sign in to view your dashboard</h2>
            <button onClick={() => navigate("/login")} className="login-button">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome to your dashboard</h1>
            <p>Manage your hotel bookings and reservations</p>
          </div>
          <button className="new-booking-button" onClick={() => navigate("/booking/search")}>
            + New Booking
          </button>
        </div>
        <div className="dashboard-content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Bookings ({upcomingBookings.length})
            </button>
            <button className={`tab ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
              Past Bookings ({pastBookings.length})
            </button>
          </div>
          <div className="bookings-section">
            {loading ? (
              <div>Loading bookings...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : currentBookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>No {activeTab} bookings</h3>
                <p>
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming reservations. Book your next stay now!"
                    : "You don't have any past bookings yet."}
                </p>
                {activeTab === "upcoming" && (
                  <button className="book-now-button" onClick={() => navigate("/booking/search")}>
                    Book Now
                  </button>
                )}
              </div>
            ) : (
              <div className="bookings-list">
                {currentBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <div className="booking-info">
                        <h3>{booking.room?.title || "Room"}</h3>
                        <p className="booking-number">#{booking.booking_number}</p>
                      </div>
                      <div className="booking-status">
                        <span className={`status-badge ${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="booking-details">
                      <div className="detail-group">
                        <div className="detail-item">
                          <span className="label">Check-in:</span>
                          <span className="value">{formatDate(booking.check_in)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Check-out:</span>
                          <span className="value">{formatDate(booking.check_out)}</span>
                        </div>
                      </div>
                      <div className="detail-group">
                        <div className="detail-item">
                          <span className="label">Duration:</span>
                          <span className="value">
                            {booking.nights} night{booking.nights > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Guests:</span>
                          <span className="value">{booking.guests}</span>
                        </div>
                      </div>
                      <div className="detail-group">
                        <div className="detail-item">
                          <span className="label">Total Amount:</span>
                          <span className="value price">S${Number(booking.total).toFixed(2)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Booked on:</span>
                          <span className="value">{formatDate(booking.created_at)}</span>
                        </div>
                      </div>
                      {booking.room && (
                        <div className="detail-group">
                          <div className="detail-item">
                            <span className="label">Room Image:</span>
                            <span className="value">
                              <img
                                src={booking.room.image}
                                alt={booking.room.title}
                                style={{ width: 80, height: 50, objectFit: "cover" }}
                              />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {activeTab === "upcoming" && booking.status !== "cancelled" && (
                      <div className="booking-actions">
                        <button className="cancel-button" onClick={() => handleCancelBooking(booking.id)}>
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
