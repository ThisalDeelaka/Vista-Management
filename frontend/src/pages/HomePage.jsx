import React, { useState } from 'react';
import Button from '../components/Button';
import { FaCloud, FaUserPlus, FaUsers, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { promoteAllStudents } from '../api/studentAPI'; // Import the function for promoting students

const HomePage = () => {
  const oneDriveUrl = 'https://mysliit-my.sharepoint.com/...';

  const openOneDrive = () => {
    window.open(oneDriveUrl, '_blank');
  };

  const [isPromoting, setIsPromoting] = useState(false);

  const handlePromoteAll = async () => {
    setIsPromoting(true);
    try {
      await promoteAllStudents(); // API call to promote students
      alert('All students have been promoted to the next grade. Grade 11 students have been removed.');
    } catch (error) {
      console.error('Error promoting students:', error);
      alert('Failed to promote students. Please try again.');
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-16 md:py-24 lg:py-32">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 lg:mb-8 tracking-tight leading-tight animate-fade-in">
            Seamless Management, Simplified
          </h1>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl mb-8 lg:mb-12 max-w-md md:max-w-3xl mx-auto animate-slide-up">
            Experience an elegant, streamlined platform designed for managing students, payments, and resources effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/add-student">
              <Button variant="primary" className="py-3 px-6 md:py-4 md:px-8 text-md md:text-lg lg:text-xl rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <FaUserPlus className="mr-2 inline-block" /> Add Student
              </Button>
            </a>
            <a href="/view-students">
              <Button variant="secondary" className="py-3 px-6 md:py-4 md:px-8 text-md md:text-lg lg:text-xl rounded-full bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <FaUsers className="mr-2 inline-block" /> View Students
              </Button>
            </a>
            <Button variant="outline" onClick={openOneDrive} className="py-3 px-6 md:py-4 md:px-8 text-md md:text-lg lg:text-xl rounded-full border-2 border-white hover:bg-white hover:text-gray-900 text-white transition-transform transform hover:scale-105">
              <FaCloud className="mr-2 inline-block" /> Access OneDrive
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-10 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 px-6">
          <div className="p-6 md:p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up">
            <FaUsers className="text-gray-700 text-3xl md:text-4xl lg:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">Manage Students</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Efficiently manage student information with ease.</p>
            <a href="/view-students" className="text-teal-600 font-medium hover:underline">Go to Students</a>
          </div>
          <div className="p-6 md:p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up delay-200">
            <FaMoneyBillWave className="text-gray-700 text-3xl md:text-4xl lg:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">Payment Tracking</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Keep track of all payments efficiently.</p>
            <a href="/payments" className="text-teal-600 font-medium hover:underline">View Payments</a>
          </div>
          <div className="p-6 md:p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition-all transform hover:scale-105 text-center animate-fade-in-up delay-400">
            <FaFileAlt className="text-gray-700 text-3xl md:text-4xl lg:text-5xl mx-auto mb-4 md:mb-6" />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">Generate Reports</h3>
            <p className="text-gray-600 mb-4 md:mb-6">Generate detailed reports on student data.</p>
            <a href="/reports" className="text-teal-600 font-medium hover:underline">Create Reports</a>
          </div>
        </div>
        <div className="container mx-auto text-right pr-6 mt-8">
          <button
            onClick={handlePromoteAll}
            disabled={isPromoting}
            className={`bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 ${
              isPromoting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPromoting ? 'Promoting...' : 'Promote All Students'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
