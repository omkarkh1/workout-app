const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exerciseName: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      minlength: [2, 'Exercise name must be at least 2 characters'],
      maxlength: [100, 'Exercise name cannot exceed 100 characters'],
    },
    sets: {
      type: Number,
      required: [true, 'Sets is required'],
      min: [1, 'Sets must be at least 1'],
      max: [100, 'Sets cannot exceed 100'],
    },
    reps: {
      type: Number,
      required: [true, 'Reps is required'],
      min: [1, 'Reps must be at least 1'],
      max: [1000, 'Reps cannot exceed 1000'],
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [0, 'Weight cannot be negative'],
      max: [10000, 'Weight cannot exceed 10000'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
WorkoutSchema.index({ userId: 1, date: -1 });
WorkoutSchema.index({ userId: 1, exerciseName: 1 });

module.exports = mongoose.model('Workout', WorkoutSchema);
