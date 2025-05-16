import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const defaultFilters = {
  schoolName: '',
  class: '',
  section: ''
};

const StudentDataContext = createContext(undefined);

export const StudentDataProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/students');
        const result = await response.json();

        if (response.ok) {
          setStudents(result.data);
          setFilteredStudents(result.data);
        } else {
          console.error('Failed to fetch students:', result.message);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const uniqueSchools = useMemo(() => [...new Set(students.map(student => student['school_name']))], [students]);
  const uniqueClasses = useMemo(() => [...new Set(students.map(student => student.class))], [students]);
  const uniqueSections = useMemo(() => [...new Set(students.map(student => student.section))], [students]);

  // Apply filters with a check to avoid redundant updates
  const applyFilters = () => {
    setLoading(true);
    const filtered = students.filter(student => {
      const schoolMatch = !filters.schoolName || student['school_name'] === filters.schoolName;
      const classMatch = !filters.class || student.class === filters.class;
      const sectionMatch = !filters.section || student.section === filters.section;
      return schoolMatch && classMatch && sectionMatch;
    });

    // Only update if filtered results differ
    if (JSON.stringify(filtered) !== JSON.stringify(filteredStudents)) {
      setFilteredStudents(filtered);
    }
    setLoading(false);
  };

  const value = {
    students,
    filteredStudents,
    filters,
    setFilters,
    loading,
    applyFilters,
    uniqueSchools,
    uniqueClasses,
    uniqueSections
  };

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
};

const useStudentData = () => {
  const context = useContext(StudentDataContext);
  if (context === undefined) {
    throw new Error('useStudentData must be used within a StudentDataProvider');
  }
  return context;
};

export default useStudentData;