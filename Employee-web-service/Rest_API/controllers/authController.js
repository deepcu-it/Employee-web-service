import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmployeeSchema from '../models/EmployeeSchema.js';

const generateToken = (employee) => {
  return jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ✅ Register Employee
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await EmployeeSchema.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new EmployeeSchema({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', token: generateToken(newUser) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeSchema.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Update Password
export const updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await EmployeeSchema.findOne({ email });
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



