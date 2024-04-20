import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Common/Navbar/Navbar";
import PictureOfTheDay from "./components/pages/home/home";
import NasaPage from "./components/pages/exploreMore/exploreMore";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PictureOfTheDay />} />
          <Route path="/nasa" element={<NasaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
