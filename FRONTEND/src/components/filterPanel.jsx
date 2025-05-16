import React, { useState, useCallback } from 'react';
import useStudentData from '../context/StudentDataContext';
import Dropdown from './dropdown';

const FilterPanel = () => {
  const { 
    filters, 
    setFilters, 
    applyFilters, 
    uniqueSchools, 
    uniqueClasses, 
    uniqueSections,
    loading
  } = useStudentData();
  
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value ?? ''
    }));
  };

  // Memoized to prevent unnecessary re-creations
  const handleApplyFilters = useCallback(() => {
    setFilters(localFilters);
    setTimeout(() => applyFilters(), 0)
  }, [localFilters, setFilters, applyFilters]);

  const handleResetFilters = () => {
    const resetFilters = {
      schoolName: '',
      class: '',
      section: ''
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    applyFilters();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dropdown 
          label="School"
          value={localFilters.schoolName}
          onChange={(value) => handleFilterChange('schoolName', value)}
          options={['', ...uniqueSchools]}
          placeholder="All Schools"
        />
        
        <Dropdown 
          label="Class"
          value={localFilters.class}
          onChange={(value) => handleFilterChange('class', value)}
          options={['', ...uniqueClasses]}
          placeholder="All Classes"
        />
        
        <Dropdown 
          label="Section"
          value={localFilters.section}
          onChange={(value) => handleFilterChange('section', value)}
          options={['', ...uniqueSections]}
          placeholder="All Sections"
        />
      </div>
      
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={handleApplyFilters}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Filtering...
            </>
          ) : (
            'Apply Filters'
          )}
        </button>
        
        <button
          onClick={handleResetFilters}
          disabled={loading}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;