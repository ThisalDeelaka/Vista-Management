import React, { useState, useEffect } from 'react';
import { getStudentsByGrade, updatePaymentStatus } from '../api/studentAPI';
import { useNavigate } from 'react-router-dom';
import { getCurrentMonth } from '../utils/dateUtils';
import { FaFilePdf, FaFilter, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewStudentsPage = () => {
  const [grade, setGrade] = useState(null);
  const [letter, setLetter] = useState(null);
  const [number, setNumber] = useState(null);
  const [students, setStudents] = useState([]);
  const [showUnpaidOnly, setShowUnpaidOnly] = useState(false); // State to toggle unpaid filter
  const navigate = useNavigate();
  const currentMonth = getCurrentMonth(); // Get the current month (e.g., 'October')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (grade) {
          const response = await getStudentsByGrade(grade);
          const filteredStudents = response.data.filter(student => 
            (!letter || student.studentID.startsWith(letter)) && 
            (!number || student.studentID.endsWith(number))
          );

          // Apply unpaid filter if selected
          const studentsToShow = showUnpaidOnly
            ? filteredStudents.filter(student => !student.paymentStatus[currentMonth])
            : filteredStudents;

          setStudents(studentsToShow);
        } else {
          setStudents([]); // Clear students if no grade is selected
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [grade, letter, number, showUnpaidOnly]);

  const handleMarkAsPaid = async (studentID) => {
    try {
      await updatePaymentStatus({ studentID, month: currentMonth, status: true });
      alert(`Payment status for ${currentMonth} updated to Paid!`);
      setStudents(students.map(student => 
        student.studentID === studentID 
        ? { ...student, paymentStatus: { ...student.paymentStatus, [currentMonth]: true } } 
        : student
      ));
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status. Please try again.');
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Student Payment Report', 14, 20);
    
    const unpaidStudents = students.filter(student => !student.paymentStatus[currentMonth]);
    const paidStudents = students.filter(student => student.paymentStatus[currentMonth]);

    // Generate unpaid students table
    if (unpaidStudents.length > 0) {
      doc.setFontSize(14);
      doc.text('Unpaid Students:', 14, 30);
      doc.autoTable({
        startY: 35,
        head: [['Student ID', 'Name', 'Grade']],
        body: unpaidStudents.map(student => [
          student.studentID, student.name, `Grade ${student.grade}`
        ]),
      });
    }

    // Generate paid students table
    if (paidStudents.length > 0) {
      const yPosition = unpaidStudents.length > 0 ? doc.autoTable.previous.finalY + 10 : 35;
      doc.setFontSize(14);
      doc.text('Paid Students:', 14, yPosition);
      doc.autoTable({
        startY: yPosition + 5,
        head: [['Student ID', 'Name', 'Grade']],
        body: paidStudents.map(student => [
          student.studentID, student.name, `Grade ${student.grade}`
        ]),
      });
    }

    // Save the PDF
    doc.save(`Student_Payment_Report_${currentMonth}.pdf`);
  };

  // Toggle function for selectors
  const toggleSelection = (current, setFunction, value) => {
    if (current === value) {
      setFunction(null); // Deselect if already selected
    } else {
      setFunction(value); // Select if not already selected
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Manage Students</h1>

        {/* Unpaid Filter Toggle */}
        <div className="flex justify-between mb-8 items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowUnpaidOnly(!showUnpaidOnly)}
              className={`flex items-center px-4 py-2 text-lg font-bold rounded-full shadow-md transition-transform transform ${
                showUnpaidOnly ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {showUnpaidOnly ? <FaToggleOn className="mr-2" /> : <FaToggleOff className="mr-2" />}
              {showUnpaidOnly ? 'Showing Unpaid Students Only' : 'Show All Students'}
            </button>
          </div>

          {/* Generate Report Button */}
          <div>
            <button
              onClick={generatePDFReport}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 flex items-center"
            >
              <FaFilePdf className="mr-2" /> Generate Report
            </button>
          </div>
        </div>
        
        {/* Visual Selectors */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start justify-items-center">
          {/* Grade Selector */}
          <div className="w-full flex flex-col items-center">
            <label className="block text-gray-600 font-medium mb-3 text-lg">Select Grade:</label>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 11 }, (_, i) => i + 1).map((gradeOption) => (
                <button
                  key={gradeOption}
                  type="button"
                  onClick={() => toggleSelection(grade, setGrade, gradeOption)}
                  className={`py-2 px-4 rounded-full text-lg font-medium border shadow-sm ${
                    grade === gradeOption ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-blue-100'
                  } transition duration-300 ease-in-out`}
                >
                  {`Grade ${gradeOption}`}
                </button>
              ))}
            </div>
          </div>

          {/* Letter Selector */}
          <div className="w-full flex flex-col items-center">
            <label className="block text-gray-600 font-medium mb-3 text-lg">Select Letter:</label>
            <div className="flex gap-2 justify-center">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((letterOption) => (
                <button
                  key={letterOption}
                  type="button"
                  onClick={() => toggleSelection(letter, setLetter, letterOption)}
                  className={`py-2 px-4 rounded-full text-lg font-medium border shadow-sm ${
                    letter === letterOption ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'
                  } transition duration-300 ease-in-out`}
                >
                  {letterOption}
                </button>
              ))}
            </div>
          </div>

          {/* Number Selector */}
          <div className="w-full flex flex-col items-center">
            <label className="block text-gray-600 font-medium mb-3 text-lg">Select Number:</label>
            <div className="grid grid-cols-5 gap-2 justify-center">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => toggleSelection(number, setNumber, String(num))}
                  className={`py-2 px-3 rounded-lg text-lg font-medium border shadow-sm ${
                    number === String(num) ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800 hover:bg-yellow-100'
                  } transition duration-300 ease-in-out`}
                >
                  {num}
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
                <th className="py-3 px-4 text-left text-md">Student ID</th>
                <th className="py-3 px-4 text-left text-md">Name</th>
                <th className="py-3 px-4 text-left text-md">Grade</th>
                <th className="py-3 px-4 text-left text-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr 
                  key={student.studentID} 
                  className="border-t hover:bg-gray-100 cursor-pointer transition-all duration-200"
                  onClick={() => navigate(`/student/${student.studentID}`)}
                >
                  <td className="py-3 px-4">{student.studentID}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{`Grade ${student.grade}`}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsPaid(student.studentID);
                      }}
                      disabled={student.paymentStatus && student.paymentStatus[currentMonth]}
                      className={`px-4 py-2 rounded-md shadow-md transition duration-200 ease-in-out ${
                        student.paymentStatus && student.paymentStatus[currentMonth]
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {student.paymentStatus && student.paymentStatus[currentMonth] ? 'Paid' : 'Mark as Paid'}
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

export default ViewStudentsPage;
