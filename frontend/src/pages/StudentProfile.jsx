import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { 
  getStudentById, 
  updatePaymentStatus, 
  updateStudentDetails, 
  deleteStudent, 
  setAllMonthsPaid, 
  unsetAllMonthsPaid 
} from '../api/studentAPI';

const StudentProfile = () => {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ studentLetter: '', studentNumber: '', name: '', grade: '' });
  const [isFreeCard, setIsFreeCard] = useState(false);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(studentID);
        const studentData = response.data;
        setStudent(studentData);

        const letter = studentData.studentID ? studentData.studentID.charAt(0) : ''; 
        const number = studentData.studentID ? studentData.studentID.slice(1) : ''; 
        setFormData({ ...studentData, studentLetter: letter, studentNumber: number });

        const allPaid = months.every(month => studentData.paymentStatus[month]);
        setIsFreeCard(allPaid);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchStudent();
  }, [studentID]);

  const handleUpdatePayment = async (month) => {
    try {
      await updatePaymentStatus({ studentID, month, status: true });
      setStudent({ ...student, paymentStatus: { ...student.paymentStatus, [month]: true } });
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleDeleteStudent = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(studentID);
        alert('Student deleted successfully');
        navigate('/view-students');
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleSetAllPaid = async () => {
    try {
      await setAllMonthsPaid(studentID);
      alert('All months set to Paid');
      setIsFreeCard(true);
      setStudent({ ...student, paymentStatus: months.reduce((acc, month) => ({ ...acc, [month]: true }), {}) });
    } catch (error) {
      console.error('Error setting all months paid:', error);
    }
  };

  const handleUnsetAllPaid = async () => {
    try {
      await unsetAllMonthsPaid(studentID);
      alert('Unset Free Card - Current & Future months unpaid');
      setIsFreeCard(false);

      const currentMonthIndex = new Date().getMonth();
      const updatedPaymentStatus = { ...student.paymentStatus };
      months.forEach((month, index) => {
        if (index >= currentMonthIndex) {
          updatedPaymentStatus[month] = 'Not Paid';
        }
      });

      setStudent({ ...student, paymentStatus: updatedPaymentStatus });
    } catch (error) {
      console.error('Error unsetting all months paid:', error);
    }
  };
  
  const handleEditToggle = () => setEditMode(!editMode);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        ...formData,
        studentID: `${formData.studentLetter}${formData.studentNumber}`
      };
      await updateStudentDetails(studentID, updatedData);
      alert('Student details updated successfully');
      setStudent(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating student details:', error);
    }
  };

  if (!student) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 sm:p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{student.name}'s Profile</h1>
        <div className="text-md sm:text-lg mb-4"><strong>Student ID:</strong> {`${formData.studentLetter}${formData.studentNumber}`}</div>
        <div className="text-md sm:text-lg mb-4"><strong>Grade:</strong> {student.grade}</div>

        <div className="flex flex-wrap gap-4 mb-4">
          <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Student</button>
          <button onClick={handleDeleteStudent} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete Student</button>
          {isFreeCard ? (
            <button onClick={handleUnsetAllPaid} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Unset Free Card</button>
          ) : (
            <button onClick={handleSetAllPaid} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Set All Months Paid</button>
          )}
        </div>

        {editMode && (
          <div className="mb-6">
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="border p-2 w-full mb-2" />
            <div className="flex gap-4">
              <select name="studentLetter" value={formData.studentLetter} onChange={handleFormChange} className="border p-2 mb-2">
                {['A', 'B', 'C', 'D', 'E', 'F'].map(letter => <option key={letter} value={letter}>{letter}</option>)}
              </select>
              <select name="studentNumber" value={formData.studentNumber} onChange={handleFormChange} className="border p-2 mb-2">
                {Array.from({ length: 25 }, (_, i) => i + 1).map(number => <option key={number} value={number}>{number}</option>)}
              </select>
            </div>
            <input type="number" name="grade" value={formData.grade} onChange={handleFormChange} className="border p-2 w-full mb-2" />
            <button onClick={handleSaveChanges} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Save Changes</button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Payment History:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Month</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {months.map(month => (
                <tr key={month} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{month}</td>
                  <td className="py-3 px-6">
                    <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold ${student.paymentStatus[month] ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>
                      {student.paymentStatus[month] ? 'Paid' : 'Not Paid'}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleUpdatePayment(month)}
                      disabled={student.paymentStatus[month]}
                      className={`px-4 py-2 rounded-md transition duration-200 ${student.paymentStatus[month] ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                    >
                      {student.paymentStatus[month] ? 'Paid' : 'Mark as Paid'}
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

export default StudentProfile;
