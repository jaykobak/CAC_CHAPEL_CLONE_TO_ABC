import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "@/pages/About"
import Home from "@/pages/Home"
import Sermons from "./pages/Sermons"
import Blog from "./pages/Blog"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
