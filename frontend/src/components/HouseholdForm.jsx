import React, { useState } from 'react';
import Button from './Button';

const HouseholdForm = ({ onSubmit, availableStudents }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [householdName, setHouseholdName] = useState('');

  const handleStudentToggle = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ householdName, studentIDs: selectedStudents });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md border border-gray-200 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create or Link Household</h2>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Household Name</label>
        <input type="text" value={householdName} onChange={(e) => setHouseholdName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" placeholder="Enter Household Name"/>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-700 font-semibold mb-2">Select Students:</h3>
        <ul className="space-y-3">
          {availableStudents.map((student) => (
            <li key={student._id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentToggle(student._id)}
                className="mr-2"
              />
              {`${student.name} (Grade: ${student.grade})`}
            </li>
          ))}
        </ul>
      </div>
      <Button type="submit" variant="primary">Create Household</Button>
    </form>
  );
};

export default HouseholdForm;
