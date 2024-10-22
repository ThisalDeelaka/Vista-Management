import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Function to add a new student
export const addStudent = async (studentData) => {
  return await axios.post(`${API_URL}/students/add`, studentData);
};

// Function to check if Student ID exists
export const checkStudentID = async (studentID) => {
  try {
    const response = await axios.get(`${API_URL}/students/check-id/${studentID}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking Student ID:", error);
    return false;
  }
};

// Function to get all existing student IDs
export const getAllStudentIDs = async () => {
  try {
    const response = await axios.get(`${API_URL}/students/all-student-ids`);
    return response.data.studentIDs;
  } catch (error) {
    console.error("Error fetching all Student IDs:", error);
    return [];
  }
};

// Function to get students by a specific grade
export const getStudentsByGrade = async (grade) => {
  return await axios.get(`${API_URL}/students/grade/${grade}`);
};

// Function to update the payment status for students
export const updatePaymentStatus = async (data) => {
  return await axios.put(`${API_URL}/students/payment-status`, data);
};

// Function to get a specific student by ID
export const getStudentById = async (studentId) => {
  return await axios.get(`${API_URL}/students/${studentId}`);
};

// Function to update notes for a specific student by ID
export const updateStudentNotes = async (studentId, data) => {
  return await axios.put(`${API_URL}/students/${studentId}/notes`, data);
};
