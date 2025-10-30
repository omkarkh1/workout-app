import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../utils/api';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.exercise) params.append('exercise', filters.exercise);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await api.get(`/api/workouts?${params.toString()}`);
      setWorkouts(response.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch workouts';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const addWorkout = async (workoutData) => {
    try {
      setError(null);
      const response = await api.post('/api/workouts', workoutData);
      setWorkouts((prev) => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add workout';
      setError(message);
      return { success: false, error: message };
    }
  };

  const updateWorkout = async (id, workoutData) => {
    try {
      setError(null);
      const response = await api.put(`/api/workouts/${id}`, workoutData);
      setWorkouts((prev) =>
        prev.map((workout) => (workout._id === id ? response.data : workout))
      );
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update workout';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deleteWorkout = async (id) => {
    try {
      setError(null);
      await api.delete(`/api/workouts/${id}`);
      setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete workout';
      setError(message);
      return { success: false, error: message };
    }
  };

  const getWorkoutById = async (id) => {
    try {
      setError(null);
      const response = await api.get(`/api/workouts/${id}`);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch workout';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    workouts,
    loading,
    error,
    fetchWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkoutById,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};
