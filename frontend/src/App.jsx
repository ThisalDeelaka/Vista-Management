import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import ViewStudentsPage from './pages/ViewStudentsPage';
import PaymentStatusPage from './pages/PaymentStatusPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-student" element={<AddStudentPage />} />
            <Route path="/view-students" element={<ViewStudentsPage />} />
            <Route path="/payment-status" element={<PaymentStatusPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
