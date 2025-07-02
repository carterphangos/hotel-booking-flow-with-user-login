import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RoomSearchPage from "../pages/room-search-page";
import SelectRoomPage from "../pages/select-room-page";
import ContactInformationPage from "../pages/contact-information-page";
import ConfirmationPage from "../pages/confirmation-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import DashboardPage from "../pages/dashboard-page";
import AuthRequired from "../components/auth-required";
import { BookingData } from "../interfaces/booking";
import { Room } from "../interfaces/room";

interface AppRoutesProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  rooms: Room[];
  updateRooms: (newRooms: Room[]) => void;
}

export default function AppRoutes({ bookingData, updateBookingData, rooms, updateRooms }: AppRoutesProps) {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AuthRequired />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route
        path="/booking/*"
        element={
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
                />
              }
            />
            <Route element={<AuthRequired />}>
              <Route
                path="confirmation"
                element={<ConfirmationPage bookingData={bookingData} onBack={() => navigate("/booking/contact")} />}
              />
            </Route>
            <Route path="*" element={<Navigate to="search" replace />} />
          </Routes>
        }
      />
      <Route path="*" element={<Navigate to="/booking/search" replace />} />
    </Routes>
  );
}
