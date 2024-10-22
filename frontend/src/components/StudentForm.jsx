import React, { useState, useEffect } from 'react';
import { checkStudentID, getAllStudentIDs } from '../api/studentAPI';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    grade: 1,
    studentLetter: 'A',
    studentNumber: '',
  });
  const [isDuplicateID, setIsDuplicateID] = useState(false);
  const [takenIDs, setTakenIDs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberSelect = (number) => {
    setFormData({ ...formData, studentNumber: number });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentID = `${formData.studentLetter}${formData.studentNumber}`;
    if (!isDuplicateID) {
      onSubmit({ ...formData, studentID });
      toast.success('Student added successfully!'); // Use toast for success
    } else {
      toast.error('This Student ID is already taken.'); // Use toast for error
    }
  };

  useEffect(() => {
    const fetchTakenIDs = async () => {
      const allIDs = await getAllStudentIDs();
      setTakenIDs(allIDs);
    };

    fetchTakenIDs();
  }, []);

  useEffect(() => {
    const checkDuplicate = async () => {
      if (formData.studentLetter && formData.studentNumber) {
        const studentID = `${formData.studentLetter}${formData.studentNumber}`;
        const exists = await checkStudentID(studentID);
        setIsDuplicateID(exists);
      }
    };
    checkDuplicate();
  }, [formData.studentLetter, formData.studentNumber]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-5xl h-full bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col p-8 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Add New Student
          </h2>
          <Button type="submit" disabled={isDuplicateID}>
            Add Student
          </Button>
        </div>

        <p className="text-gray-600 text-center text-xl font-bold mt-4">
          Selected ID: <span className="font-semibold">{`G${formData.grade}/${formData.studentLetter}${formData.studentNumber}`}</span>
        </p>

        <div className="flex flex-wrap flex-grow justify-between space-y-6 lg:space-y-0">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 p-3 space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter student name"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              />
            </div>

            {/* Grade Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Grade Level</label>
              <div className="flex flex-wrap gap-3 mb-2">
                {Array.from({ length: 11 }, (_, i) => i + 1).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setFormData({ ...formData, grade })}
                    className={`py-2 px-4 rounded-full text-lg font-medium border ${
                      formData.grade === grade ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition duration-200`}
                  >
                    {`Grade ${grade}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 p-3 space-y-5">
            {/* Student ID Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Student ID</label>
              <div className="flex flex-col items-center gap-2">
                {/* Dropdown for Letters */}
                <div className="w-1/2 mb-2">
                  <select
                    name="studentLetter"
                    value={formData.studentLetter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid for Numbers */}
                <div className="w-full">
                  <div className="grid grid-cols-5 gap-2 pb-2">
                    {Array.from({ length: 25 }, (_, i) => i + 1).map((number) => {
                      const studentID = `${formData.studentLetter}${number}`;
                      const isDisabled = takenIDs.includes(studentID);

                      return (
                        <button
                          key={number}
                          type="button"
                          onClick={() => handleNumberSelect(number)}
                          disabled={isDisabled}
                          className={`py-3 px-4 rounded-lg text-lg font-medium border ${
                            formData.studentNumber === String(number) ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'
                          } transition duration-200 ${
                            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {number}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {isDuplicateID && (
                <p className="text-red-500 text-center mt-2">
                  This Student ID is already taken.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </form>
    </div>
  );
};

export default StudentForm;
