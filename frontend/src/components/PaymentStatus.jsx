import React from 'react';
import Button from './Button';

const PaymentStatus = ({ students, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <div key={student._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-gray-900 font-semibold">{student.name}</h3>
            <p className="text-gray-500">ID: {student.studentID}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => onUpdate(student.studentID, 'Paid')} variant="primary">Paid</Button>
            <Button onClick={() => onUpdate(student.studentID, 'Not Paid')} variant="secondary">Not Paid</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentStatus;
