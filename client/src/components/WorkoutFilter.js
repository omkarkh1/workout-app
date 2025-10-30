import React from 'react';
import './WorkoutFilter.css';

const WorkoutFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActiveFilters = filters.exercise || filters.startDate || filters.endDate;

  return (
    <div className="workout-filter">
      <h3>Filter Workouts</h3>
      
      <div className="filter-group">
        <label htmlFor="exercise">Exercise Name</label>
        <input
          type="text"
          id="exercise"
          name="exercise"
          value={filters.exercise || ''}
          onChange={handleChange}
          placeholder="Search by exercise..."
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate || ''}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={onClearFilters} className="btn btn-clear">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default WorkoutFilter;
