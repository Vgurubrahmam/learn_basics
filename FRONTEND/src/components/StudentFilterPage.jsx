import React from 'react';
import FilterPanel from './filterPanel';
import StudentTable from './StudentTable';
import Navbar from './navbar';
import useStudentData from '../context/StudentDataContext';

const StudentFilterPage = () => {
  const { loading } = useStudentData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 transition-all duration-300 ease-in-out">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Student Records
          </h1>
          <p className="text-gray-600 mb-6">
            Use the filters below to find specific student records.
          </p>
          
          <FilterPanel />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8 transition-all duration-300 ease-in-out">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-3 text-gray-600">Loading records...</p>
                </div>
              </div>
            )}
            <StudentTable />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-4 text-center">
        <p className="text-sm">Student Records System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default StudentFilterPage;
