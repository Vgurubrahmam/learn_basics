import React from 'react';
import StudentFilterPage from './components/StudentFilterPage';
import { StudentDataProvider } from './context/StudentDataContext';
import Navbar from './components/navbar';
import Dropdown from './components/dropdown';
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <StudentDataProvider>
        <StudentFilterPage />
      </StudentDataProvider>

    </div>
      
   

  );
}

export default App;