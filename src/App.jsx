import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EditSalon from "./pages/owner/EditSalon";
import CreateSalon from "./pages/owner/CreateSalon";
import MySalons from "./pages/owner/MySalons";
import MyAppointments from "./pages/customer/MyAppointments";
import ManageServices from "./pages/owner/ManageServices";
import Salons from "./pages/Salons";
import SalonDetails from "./pages/public/SalonDetails";
import BookAppointment from "./pages/customer/BookAppointment";
import AppointmentDetails from "./pages/customer/AppointmentDetails";
import OwnerAppointments from "./pages/owner/OwnerAppointments";
import OwnerAnalytics from "./pages/owner/OwnerAnalytics";
import AppointmentCalendar from "./pages/owner/AppointmentCalendar";
import OwnerCalendar from "./pages/OwnerCalendar";
import CustomerAppointmentDetails from "./pages/customer/CustomerAppointmentDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
        {/* <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        /> */}



        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/create-salon"
          element={
            <ProtectedRoute>
              <CreateSalon />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/my-salons"
          element={
            <ProtectedRoute>
              <MySalons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/edit-salon/:id"
          element={
            <ProtectedRoute>
              <EditSalon />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/salon/:salonId/services"
          element={
            <ProtectedRoute>
              <ManageServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salons"
          element={<Salons />}
        />
        <Route
          path="/salons/:id"
          element={<SalonDetails />}
        />

        <Route
          path="/book-appointment/:salonId"
          element={<BookAppointment />}
        />

        <Route
          path="/my-appointments"
          element={<MyAppointments />}
        />

        <Route
          path="/appointments/:appointmentId"
          element={<AppointmentDetails />}
        />

        <Route
          path="/owner/appointments"
          element={<OwnerAppointments />}
        />

        {/* <Route
    path="/owner/appointments"
    element={<OwnerAppointments />}
/> */}

        <Route
          path="/owner/appointments/:salonId"
          element={<OwnerAppointments />}
        />
        <Route
          path="/owner/analytics"
          element={<OwnerAnalytics />}
        />
        <Route
          path="/owner/calendar"
          element={<OwnerCalendar />}
        />
        {/* <Route
          path="/pages/OwnerCalendar"
          element={<OwnerCalendar />}
        /> */}

        <Route
          path="/customer/appointment/:appointmentId"
          element={
            <CustomerAppointmentDetails />
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Routes>



    </BrowserRouter>
  );
}

export default App;