import React, { useState, useEffect } from 'react';
import PaymentStatus from '../components/PaymentStatus';
import { getStudentsByGrade, updatePaymentStatus } from '../api/studentAPI';

const PaymentStatusPage = () => {
  const [grade, setGrade] = useState(1);
  const [month, setMonth] = useState('January');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsByGrade(grade);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [grade]);

  const handleUpdatePayment = async (studentID, status) => {
    try {
      await updatePaymentStatus({ studentID, month, status });
      alert(`Payment status for ${month} updated!`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Status</h1>
        <div className="flex space-x-6 mb-8 justify-center">
          <label className="flex items-center">
            <span className="text-gray-600 font-medium mr-2">Grade:</span>
            <input 
              type="number" 
              min="1" 
              max="11" 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
            />
          </label>
          <label className="flex items-center">
            <span className="text-gray-600 font-medium mr-2">Month:</span>
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
            >
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
        <PaymentStatus students={students} onUpdate={handleUpdatePayment} />
      </div>
    </div>
  );
};

export default PaymentStatusPage;
