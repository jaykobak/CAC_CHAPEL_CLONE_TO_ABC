import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "@/pages/About"
import Home from "@/pages/Home"
import Sermons from "./pages/Sermons"
import Blog from "./pages/Blog"
import Dashboard from "./pages/admin/Dashboard"
import Members from "./pages/admin/Members"
import Attendance from "./pages/admin/Attendance"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/attendance" element = {<Attendance />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
