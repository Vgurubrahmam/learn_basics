import React from 'react';
import  useStudentData from '../context/StudentDataContext';

const StudentTable = () => {
  const { filteredStudents } = useStudentData();

  if (!filteredStudents || filteredStudents.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        No student records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredStudents.map(student => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center text-sm text-gray-900">
                <div className="h-8 w-8 rounded-full  flex items-center justify-center text-blue-800 font-medium mr-3">
                  {student.student_name}
                </div>
                {student.studentName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student?.school_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {student.section}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roll_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
