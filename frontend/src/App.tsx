import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Masthead from "./components/masterhead";
import RoomSearchPage from "./pages/room-search-page";
import SelectRoomPage from "./pages/select-room-page";
import ContactInformationPage from "./pages/contact-infomation-page";
import ConfirmationPage from "./pages/confirmation-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import DashboardPage from "./pages/dashboard-page";
import { Room } from "./api/room";
import "./App.css";

export interface BookingData {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  selectedRoom?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  };
  contactInfo?: {
    title: string;
    name: string;
    email: string;
  };
  bookingNumber?: string;
  total?: number;
}

function BookingFlow({
  bookingData,
  updateBookingData,
  rooms,
  updateRooms,
}: {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  rooms: Room[];
  updateRooms: (newRooms: Room[]) => void;
}) {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="search"
        element={
          <RoomSearchPage
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            onNext={() => navigate("/booking/select")}
            rooms={rooms}
            updateRooms={updateRooms}
          />
        }
      />
      <Route
        path="select"
        element={
          <SelectRoomPage
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            onNext={() => navigate("/booking/contact")}
            onBack={() => navigate("/booking/search")}
            rooms={rooms}
          />
        }
      />
      <Route
        path="contact"
        element={
          <ContactInformationPage
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            onNext={() => navigate("/booking/confirmation")}
            onBack={() => navigate("/booking/select")}
          />
        }
      />
      <Route
        path="confirmation"
        element={<ConfirmationPage bookingData={bookingData} onBack={() => navigate("/booking/contact")} />}
      />
      <Route path="*" element={<Navigate to="search" replace />} />
    </Routes>
  );
}

function App() {
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "2025-06-17",
    checkOut: "2025-06-18",
    nights: 1,
    guests: 1,
  });
  const [rooms, setRooms] = useState<Room[]>([]);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const updateRooms = (newRooms: Room[]) => {
    setRooms(newRooms);
  };

  return (
    <Router>
      <div className="hotel-booking-app">
        <Masthead currentPage={"booking"} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/booking/*"
            element={
              <BookingFlow
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                rooms={rooms}
                updateRooms={updateRooms}
              />
            }
          />
          <Route path="*" element={<Navigate to="/booking/search" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
