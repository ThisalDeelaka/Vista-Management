import React from 'react';
import Button from '../components/Button';
import { FaCloud, FaUserPlus, FaUsers, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';

const HomePage = () => {
  const oneDriveUrl = 'https://mysliit-my.sharepoint.com/my?id=%2Fpersonal%2Fit22357908%5Fmy%5Fsliit%5Flk%2FDocuments%2FY3S1%20Project%20Group';

  const openOneDrive = () => {
    window.open(oneDriveUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight leading-tight animate-fade-in">
            Seamless Management, Simplified
          </h1>
          <p className="text-md md:text-xl mb-8 md:mb-12 max-w-md md:max-w-3xl mx-auto animate-slide-up">
            Experience an elegant, streamlined platform designed for managing students, payments, and resources effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/add-student">
              <Button variant="primary" className="py-4 px-8 text-lg md:text-xl rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <FaUserPlus className="mr-2 inline-block" /> Add Student
              </Button>
            </a>
            <a href="/view-students">
              <Button variant="secondary" className="py-4 px-8 text-lg md:text-xl rounded-full bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <FaUsers className="mr-2 inline-block" /> View Students
              </Button>
            </a>
            <Button variant="outline" onClick={openOneDrive} className="py-4 px-8 text-lg md:text-xl rounded-full border-2 border-white hover:bg-white hover:text-gray-900 text-white transition-transform transform hover:scale-105">
              <FaCloud className="mr-2 inline-block" /> Access OneDrive
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up">
            <FaUsers className="text-gray-700 text-4xl md:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Manage Students</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Efficiently manage student information with ease.</p>
            <a href="/view-students" className="text-teal-600 font-medium hover:underline">Go to Students</a>
          </div>
          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up delay-200">
            <FaMoneyBillWave className="text-gray-700 text-4xl md:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Payment Tracking</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Keep track of all payments efficiently.</p>
            <a href="/payments" className="text-teal-600 font-medium hover:underline">View Payments</a>
          </div>
          <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up delay-400">
            <FaFileAlt className="text-gray-700 text-4xl md:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Generate Reports</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Generate detailed reports on student data.</p>
            <a href="/reports" className="text-teal-600 font-medium hover:underline">Create Reports</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
