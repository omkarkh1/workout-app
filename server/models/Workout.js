const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  exerciseName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Exercise name is required' },
      len: {
        args: [2, 100],
        msg: 'Exercise name must be between 2 and 100 characters',
      },
    },
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Sets must be at least 1',
      },
      max: {
        args: [100],
        msg: 'Sets cannot exceed 100',
      },
    },
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'Reps must be at least 1',
      },
      max: {
        args: [1000],
        msg: 'Reps cannot exceed 1000',
      },
    },
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Weight cannot be negative',
      },
      max: {
        args: [10000],
        msg: 'Weight cannot exceed 10000',
      },
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: 'Notes cannot exceed 500 characters',
      },
    },
  },
}, {
  tableName: 'workouts',
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'date']
    },
    {
      fields: ['userId', 'exerciseName']
    }
  ]
});

// Define associations
Workout.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Workout, { foreignKey: 'userId', as: 'workouts' });

module.exports = Workout;
