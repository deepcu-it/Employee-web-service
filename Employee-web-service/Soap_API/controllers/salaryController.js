import User from '../models/User.js';
import Salary from '../models/Salary.js';

export const getSalaryDetails = async (req, res) => {
  try {
    const salary = await Salary.findOne({ userId: req.user.id });
    if (!salary) return res.status(404).json({ error: 'Salary details not found' });
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementSalary = async (req, res) => {
  try {
    const { amount } = req.body;
    const salary = await Salary.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { amount } },
      { new: true }
    );
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const decrementSalary = async (req, res) => {
  try {
    const { amount } = req.body;
    const salary = await Salary.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { amount: -amount } },
      { new: true }
    );
    res.json(salary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};