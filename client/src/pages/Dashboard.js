import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutFilter from '../components/WorkoutFilter';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { workouts, loading, fetchWorkouts, deleteWorkout } = useWorkout();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    exercise: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchWorkouts(filters);
  }, [filters, fetchWorkouts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      exercise: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleEdit = (id) => {
    navigate(`/edit-workout/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      const result = await deleteWorkout(id);
      if (result.success) {
        // Workout already removed from state in context
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 💪</h1>
        <button onClick={() => navigate('/add-workout')} className="btn btn-primary">
          + Add New Workout
        </button>
      </div>

      <WorkoutFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="workouts-section">
        <h2>Your Workout History</h2>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading workouts...</p>
          </div>
        ) : workouts.length === 0 ? (
          <div className="empty-state">
            <p>No workouts found. Start tracking your fitness journey!</p>
            <button onClick={() => navigate('/add-workout')} className="btn btn-primary">
              Add Your First Workout
            </button>
          </div>
        ) : (
          <div className="workouts-grid">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
