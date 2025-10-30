import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import './WorkoutForm.css';

const EditWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getWorkoutById, updateWorkout } = useWorkout();

  const [formData, setFormData] = useState({
    exerciseName: '',
    sets: '',
    reps: '',
    weight: '',
    date: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      const result = await getWorkoutById(id);
      if (result.success) {
        const workout = result.data;
        setFormData({
          exerciseName: workout.exerciseName,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          date: new Date(workout.date).toISOString().split('T')[0],
          notes: workout.notes || '',
        });
      } else {
        setError(result.error);
      }
      setFetchLoading(false);
    };

    fetchWorkout();
  }, [id, getWorkoutById]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await updateWorkout(id, {
      ...formData,
      sets: Number(formData.sets),
      reps: Number(formData.reps),
      weight: Number(formData.weight),
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading workout...</p>
      </div>
    );
  }

  return (
    <div className="workout-form-container">
      <div className="workout-form-card">
        <h1>Edit Workout</h1>
        <p className="form-subtitle">Update your exercise details</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="workout-form">
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise Name *</label>
            <input
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={formData.exerciseName}
              onChange={handleChange}
              required
              placeholder="e.g., Bench Press, Squat, Deadlift"
              minLength="2"
              maxLength="100"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sets">Sets *</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                required
                min="1"
                max="100"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reps">Reps *</label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                required
                min="1"
                max="1000"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (lbs) *</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="0"
                max="10000"
                step="0.5"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this workout..."
              maxLength="500"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating Workout...' : 'Update Workout'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkout;
