import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import { getStudentsByGrade } from '../api/studentAPI';

const ViewStudentsPage = () => {
  const [grade, setGrade] = useState(1);
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

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">View Students</h1>
        <div className="mb-8 flex justify-center">
          <label className="text-gray-600 font-medium mr-4">Select Grade:</label>
          <input 
            type="number" 
            min="1" 
            max="11" 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)} 
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
          />
        </div>
        <StudentList students={students} />
      </div>
    </div>
  );
};

export default ViewStudentsPage;
