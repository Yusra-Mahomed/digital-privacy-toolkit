import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PasswordPage from './pages/PasswordPage';
import TrackingPage from './pages/TrackingPage';
import FingerprintPage from './pages/FingerprintPage';
import SocialPage from './pages/SocialPage';
import ResourcesPage from './pages/ResourcesPage'; // Add this import


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passwords" element={<PasswordPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/fingerprinting" element={<FingerprintPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
