const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name must be provided'] },
    email: {
      type: String,
      required: [true, 'Email must be provided'],
      unique: true,
    },
    image: String,
    bio: { type: String, required: [true, 'Bio must be provided'] },
    password: { type: String, required: [true, 'Please enter a password'] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
