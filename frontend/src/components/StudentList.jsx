import React from 'react';
import Card from './Card';

const StudentList = ({ students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <Card key={student._id}>
          <h3 className="text-gray-900 font-semibold">{student.name}</h3>
          <p className="text-gray-500">ID: {student.studentID}</p>
          <p className="text-gray-500">Grade: {student.grade}</p>
        </Card>
      ))}
    </div>
  );
};

export default StudentList;
