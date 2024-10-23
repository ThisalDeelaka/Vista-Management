import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = ({ students }) => {
  const navigate = useNavigate();

  const handleMarkAsPaid = (studentID) => {
    // Mark current month as paid (call your API)
    console.log(`Marking ${studentID} as paid for the current month`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-200 text-left text-gray-600 text-sm sm:text-md">Student ID</th>
            <th className="py-3 px-4 bg-gray-200 text-left text-gray-600 text-sm sm:text-md">Name</th>
            <th className="py-3 px-4 bg-gray-200 text-left text-gray-600 text-sm sm:text-md">Grade</th>
            <th className="py-3 px-4 bg-gray-200 text-left text-gray-600 text-sm sm:text-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr 
              key={student.studentID} 
              className="border-t hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
              onClick={() => navigate(`/students/${student.studentID}`)}
            >
              <td className="py-3 px-4 text-sm sm:text-md">{student.studentID}</td>
              <td className="py-3 px-4 text-sm sm:text-md">{student.name}</td>
              <td className="py-3 px-4 text-sm sm:text-md">{`Grade ${student.grade}`}</td>
              <td className="py-3 px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigation when marking paid
                    handleMarkAsPaid(student.studentID);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  Mark as Paid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
