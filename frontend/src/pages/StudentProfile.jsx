import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getStudentById } from '../api/studentAPI';

const StudentProfile = () => {
  const { studentID } = useParams(); // Use useParams to get studentID from URL
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(studentID);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [studentID]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{student.name}'s Profile</h1>
      <div className="mb-4">
        <strong>Student ID:</strong> {student.studentID}
      </div>
      <div className="mb-4">
        <strong>Grade:</strong> {student.grade}
      </div>
      <div className="mb-4">
        <strong>Car No:</strong> {student.carNo || 'N/A'}
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <ul>
        {Object.keys(student.paymentStatus).map(month => (
          <li key={month} className="mb-2">
            <strong>{month}:</strong> {student.paymentStatus[month] ? 'Paid' : 'Not Paid'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentProfile;
