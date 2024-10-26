import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "@/pages/About"
import Home from "@/pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
