const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Corrected typo from 'bycrypt' to 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must be a valid email address'],
  },
  phone: {
    type: String,
    unique: true,
    sparse: true, // Allows null/undefined while enforcing uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  collection: 'users', // Matches tableName 'users'
});

// Method to check password validity
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Pre-save hook to hash password before create or update
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;