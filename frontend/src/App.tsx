import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Masthead from "./components/masterhead";
import AppRoutes from "./routes/app-routes";
import { Room } from "./interfaces/room";
import type { BookingData } from "./interfaces/booking";
import "./App.css";

function App() {
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "2025-06-17",
    checkOut: "2025-06-18",
    nights: 1,
    guests: 1,
  });
  const [rooms, setRooms] = useState<Room[]>([]);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev: BookingData) => ({ ...prev, ...data }));
  };

  const updateRooms = (newRooms: Room[]) => {
    setRooms(newRooms);
  };

  return (
    <Router>
      <div className="hotel-booking-app">
        <Masthead currentPage={"booking"} />
        <AppRoutes
          bookingData={bookingData}
          updateBookingData={updateBookingData}
          rooms={rooms}
          updateRooms={updateRooms}
        />
      </div>
    </Router>
  );
}

export default App;
