import type React from "react";
import { useState } from "react";
import type { BookingData } from "../App";
import { getRooms, type Room } from "../api/room";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/room-search-page.css";

export interface RoomSearchPageProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  rooms: Room[];
  updateRooms: (rooms: Room[]) => void;
}

export default function RoomSearchPage({ bookingData, updateBookingData, onNext, updateRooms }: RoomSearchPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      updateBookingData({ nights });
      const foundRooms = await getRooms({
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
      });
      updateRooms(foundRooms.data);
      onNext();
    } catch (err) {
      setError("Failed to fetch rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-search-page">
      <div className="hero-section">
        <div className="hero-image">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/133497922.jpg?k=aa885de489843469fb1bbaa03923d85fd0c45ecceb5f16225ae565c68e68edee&o=&hp=1"
            alt="Hotel Hero"
          />
        </div>
        <div className="hero-content">
          <h1>BOOK A ROOM</h1>
          <p className="hero-date">TUE, 3 JUN 2025</p>
        </div>
      </div>

      <div className="search-section">
        <h2>SEARCH FOR ROOMS</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-form-row">
            <div className="form-group">
              <label htmlFor="checkin">Check-in</label>
              <DatePicker
                id="checkin"
                selected={bookingData.checkIn ? new Date(bookingData.checkIn) : null}
                onChange={(date: Date | null) =>
                  updateBookingData({ checkIn: date ? date.toISOString().split("T")[0] : "" })
                }
                dateFormat="yyyy-MM-dd"
                required
                minDate={new Date()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkout">Check-out</label>
              <DatePicker
                id="checkout"
                selected={bookingData.checkOut ? new Date(bookingData.checkOut) : null}
                onChange={(date: Date | null) =>
                  updateBookingData({ checkOut: date ? date.toISOString().split("T")[0] : "" })
                }
                dateFormat="yyyy-MM-dd"
                required
                minDate={bookingData.checkIn ? new Date(bookingData.checkIn) : new Date()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <select
                id="guests"
                value={bookingData.guests}
                onChange={(e) => updateBookingData({ guests: Number.parseInt(e.target.value) })}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          </div>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Searching..." : "SEARCH FOR ROOMS"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
