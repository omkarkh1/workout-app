import React from 'react';
import './WorkoutCard.css';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="workout-card">
      <div className="workout-card-header">
        <h3 className="workout-name">{workout.exerciseName}</h3>
        <span className="workout-date">{formatDate(workout.date)}</span>
      </div>
      
      <div className="workout-details">
        <div className="workout-stat">
          <span className="stat-label">Sets:</span>
          <span className="stat-value">{workout.sets}</span>
        </div>
        <div className="workout-stat">
          <span className="stat-label">Reps:</span>
          <span className="stat-value">{workout.reps}</span>
        </div>
        <div className="workout-stat">
          <span className="stat-label">Weight:</span>
          <span className="stat-value">{workout.weight} lbs</span>
        </div>
      </div>

      {workout.notes && (
        <div className="workout-notes">
          <strong>Notes:</strong> {workout.notes}
        </div>
      )}

      <div className="workout-actions">
        <button onClick={() => onEdit(workout._id)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(workout._id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
