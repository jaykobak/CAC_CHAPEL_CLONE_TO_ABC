import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import About from "@/pages/About"
import Home from "@/pages/Home"
import Sermons from "./pages/Sermons"
import Blog from "./pages/Blog"
import Dashboard from "./pages/admin/Dashboard"
import Members from "./pages/admin/Members/Members"
import Attendance from "./pages/admin/Attendance/Attendance"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import VerifyOtp from "./pages/auth/VerifyOtp"
import ResetPassword from "./pages/auth/ResetPassword"
import Member from "./pages/admin/Members/Member"
import AttendanceMarking from "./pages/admin/Attendance/AttendanceMarking";
import AdminSermonPage from "./pages/admin/Sermons/SermonPage";
import AdminLibraryPage from "./pages/admin/Library/LibraryPage";
import AdminBorrowBookPage from "./pages/admin/Borrow-Book/BorrowBookPage"
import Unit from "./pages/admin/unit/unit";
import GivePage from "./components/Give/GivePage"


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/give" element={<GivePage />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/members/:id" element={<Member />} />

          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/attendance/:eventId" element={<AttendanceMarking />} />

          {/* Sermons  */}
          <Route path="/admin/sermons" element={<AdminSermonPage />} />
          <Route path="/admin/unit" element={<Unit />} />

          {/* Library */}
          <Route path="/admin/library" element={<AdminLibraryPage />} />
          <Route path="/admin/book" element={<AdminBorrowBookPage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-otp" element={<VerifyOtp />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
