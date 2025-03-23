import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SDE1', 'Manager', 'HR'], required: true }
});

const User = mongoose.model('User', userSchema);
export default User;