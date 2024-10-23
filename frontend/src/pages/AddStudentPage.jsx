import React from 'react';
import StudentForm from '../components/StudentForm';
import { addStudent } from '../api/studentAPI';

const AddStudentPage = () => {
  const handleAddStudent = async (formData) => {
    try {
      await addStudent(formData);
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <StudentForm onSubmit={handleAddStudent} />
    </div>
  );
};

export default AddStudentPage;
