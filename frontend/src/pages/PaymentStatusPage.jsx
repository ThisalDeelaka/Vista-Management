import React, { useState, useEffect } from 'react';
import { getStudentsByGrade, updatePaymentStatus } from '../api/studentAPI';

const PaymentStatusPage = () => {
  const [grade, setGrade] = useState(1);
  const [month, setMonth] = useState('January');
  const [students, setStudents] = useState([]);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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
      setStudents(students.map(student =>
        student.studentID === studentID
          ? { ...student, paymentStatus: { ...student.paymentStatus, [month]: status } }
          : student
      ));
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Payment Status</h1>
        
        {/* Improved Selectors Section */}
        <div className="flex flex-col items-center mb-8 space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-10">
          {/* Grade Selector */}
          <div className="w-full lg:w-1/3">
            <span className="block text-gray-600 font-medium mb-3 text-lg text-center lg:text-left">Select Grade:</span>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((gradeOption) => (
                <button
                  key={gradeOption}
                  type="button"
                  onClick={() => setGrade(gradeOption)}
                  className={`py-2 px-4 rounded-full text-lg font-medium border shadow-sm ${
                    grade === gradeOption ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-blue-100'
                  } transition duration-300 ease-in-out`}
                >
                  {`Grade ${gradeOption}`}
                </button>
              ))}
            </div>
          </div>

          {/* Month Selector */}
          <div className="w-full lg:w-2/3">
            <span className="block text-gray-600 font-medium mb-3 text-lg text-center lg:text-left">Select Month:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-center">
              {months.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonth(m)}
                  className={`py-2 px-3 rounded-md text-lg font-medium border shadow-sm ${
                    month === m ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'
                  } transition duration-300 ease-in-out`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left text-sm sm:text-md">Student ID</th>
                <th className="py-3 px-4 text-left text-sm sm:text-md">Name</th>
                <th className="py-3 px-4 text-left text-sm sm:text-md">Grade</th>
                <th className="py-3 px-4 text-left text-sm sm:text-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentID} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">{student.studentID}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{`Grade ${student.grade}`}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleUpdatePayment(student.studentID, true)}
                      disabled={student.paymentStatus && student.paymentStatus[month]}
                      className={`px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out ${
                        student.paymentStatus && student.paymentStatus[month]
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {student.paymentStatus && student.paymentStatus[month] ? 'Paid' : 'Mark as Paid'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
