import type { BookingData } from "../App";
import ProgressIndicator from "../components/progress-indicatior";
import "../assets/select-room-page.css";
import { Room, getRooms, type PaginatedRooms } from "../api/room";
import { useState, useEffect } from "react";
import Pagination from "../components/pagination";

interface SelectRoomPageProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
  rooms: Room[];
}

export default function SelectRoomPage({ bookingData, updateBookingData, onNext, onBack }: SelectRoomPageProps) {
  const [roomsData, setRoomsData] = useState<PaginatedRooms | null>(null);
  const [sortBy, setSortBy] = useState<string>("lowest-price");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRooms = await getRooms({
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        sortBy: sortBy as any,
        page,
      });
      setRoomsData(fetchedRooms);
    } catch (err) {
      setError("Failed to fetch rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [sortBy, bookingData.checkIn, bookingData.checkOut, bookingData.guests]);

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

  const handleBookRoom = (room: Room) => {
    updateBookingData({ selectedRoom: room });
    onNext();
  };

  const handlePageChange = (page: number) => {
    fetchRooms(page);
  };

  return (
    <div className="select-room-page">
      <ProgressIndicator currentStep={2} />
      <div className="room-container">
        <div className="booking-summary">
          <div className="booking-dates">
            <span>{formatDate(bookingData.checkIn)} → </span>
            <span>{formatDate(bookingData.checkOut)}</span>
          </div>
          <div className="booking-details">
            <span>{bookingData.nights} NIGHT</span>
            <span>{bookingData.guests} GUEST</span>
          </div>
        </div>
        {roomsData && (
          <div className="rooms-header">
            <div className="rooms-count">
              <span>
                SHOWING {roomsData.total === 0 ? 0 : roomsData.per_page * (roomsData.current_page - 1) + 1}-
                {Math.min(roomsData.per_page * roomsData.current_page, roomsData.total)} OF {roomsData.total} ROOMS
              </span>
            </div>
            <div className="sort-section">
              <label htmlFor="sort">SORT BY:</label>
              <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="lowest-price">LOWEST PRICE</option>
                <option value="highest-price">HIGHEST PRICE</option>
                <option value="rating">RATING</option>
              </select>
            </div>
          </div>
        )}
        <div className="rooms-list">
          {loading ? (
            <div>Loading rooms...</div>
          ) : error ? (
            <div>{error}</div>
          ) : roomsData && roomsData.data.length === 0 ? (
            <div>No rooms available. Please go back and search again.</div>
          ) : roomsData ? (
            <>
              {roomsData.data.map((room) => (
                <div key={room.id} className="room-card">
                  <div className="room-image">
                    <img src={room.image || "/placeholder.svg"} alt={room.title} />
                  </div>
                  <div className="room-content">
                    <div className="room-info">
                      <h3>{room.title}</h3>
                      <p>{room.description}</p>
                    </div>
                    <div className="room-booking">
                      <div className="room-price">
                        <span className="price-amount">S${room.price.toLocaleString()}/night</span>
                        <span className="price-disclaimer">Subject to GST and charges</span>
                      </div>
                      <button className="book-button" onClick={() => handleBookRoom(room)}>
                        BOOK ROOM
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={roomsData.current_page}
                totalPages={roomsData.last_page}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div>No rooms available. Please go back and search again.</div>
          )}
        </div>
        <button className="back-button" onClick={onBack}>
          ← Back to Search
        </button>
      </div>
    </div>
  );
}
