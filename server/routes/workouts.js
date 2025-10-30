const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

// @route   GET /api/workouts
// @desc    Get all workouts for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { exercise, startDate, endDate } = req.query;
    
    // Build query
    const where = { userId: req.userId };
    
    // Filter by exercise name
    if (exercise) {
      where.exerciseName = {
        [Op.iLike]: `%${exercise}%`
      };
    }
    
    // Filter by date range
    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        where.date[Op.lte] = new Date(endDate);
      }
    }

    const workouts = await Workout.findAll({
      where,
      order: [['date', 'DESC'], ['createdAt', 'DESC']]
    });
    
    res.json(workouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ message: 'Server error while fetching workouts' });
  }
});

// @route   GET /api/workouts/:id
// @desc    Get single workout by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      }
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    console.error('Get workout error:', error);
    res.status(500).json({ message: 'Server error while fetching workout' });
  }
});

// @route   POST /api/workouts
// @desc    Create a new workout
// @access  Private
router.post(
  '/',
  [
    auth,
    body('exerciseName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Exercise name must be between 2 and 100 characters'),
    body('sets')
      .isInt({ min: 1, max: 100 })
      .withMessage('Sets must be between 1 and 100'),
    body('reps')
      .isInt({ min: 1, max: 1000 })
      .withMessage('Reps must be between 1 and 1000'),
    body('weight')
      .isFloat({ min: 0, max: 10000 })
      .withMessage('Weight must be between 0 and 10000'),
    body('date')
      .optional()
      .isISO8601()
      .withMessage('Date must be a valid date'),
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters'),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { exerciseName, sets, reps, weight, date, notes } = req.body;

      const workout = await Workout.create({
        userId: req.userId,
        exerciseName,
        sets,
        reps,
        weight,
        date: date || new Date(),
        notes: notes || '',
      });

      res.status(201).json(workout);
    } catch (error) {
      console.error('Create workout error:', error);
      res.status(500).json({ message: 'Server error while creating workout' });
    }
  }
);

// @route   PUT /api/workouts/:id
// @desc    Update a workout
// @access  Private
router.put(
  '/:id',
  [
    auth,
    body('exerciseName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Exercise name must be between 2 and 100 characters'),
    body('sets')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Sets must be between 1 and 100'),
    body('reps')
      .optional()
      .isInt({ min: 1, max: 1000 })
      .withMessage('Reps must be between 1 and 1000'),
    body('weight')
      .optional()
      .isFloat({ min: 0, max: 10000 })
      .withMessage('Weight must be between 0 and 10000'),
    body('date')
      .optional()
      .isISO8601()
      .withMessage('Date must be a valid date'),
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters'),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Find workout
      let workout = await Workout.findOne({
        where: {
          id: req.params.id,
          userId: req.userId,
        }
      });

      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }

      // Update workout
      await workout.update(req.body);

      res.json(workout);
    } catch (error) {
      console.error('Update workout error:', error);
      res.status(500).json({ message: 'Server error while updating workout' });
    }
  }
);

// @route   DELETE /api/workouts/:id
// @desc    Delete a workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      }
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    await workout.destroy();

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ message: 'Server error while deleting workout' });
  }
});

module.exports = router;
