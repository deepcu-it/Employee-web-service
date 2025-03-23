import PerformanceSchema from "../models/PerformanceSchema.js";
import EmployeeSchema from "../models/EmployeeSchema.js";

// Get Performance Review for the Logged-in User
export const getMyPerformanceReview = async (req, res) => {
  try {
    const reviews = await PerformanceSchema.find({ employeeId: req.user.id }).populate('reviewerId', 'username');
    
    if (!reviews.length) {
      return res.status(404).json({ message: 'No performance reviews found' });
    }

    res.json({ message: 'Performance reviews retrieved successfully', reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Give a Performance Review
export const givePerformanceReview = async (req, res) => {
  try {
    const { employeeId, rating, feedback } = req.body;

    if (!employeeId || !rating || !feedback) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const employee = await EmployeeSchema.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const review = new PerformanceSchema({
      reviewerId: req.user.id,
      employeeId,
      rating,
      feedback
    });

    await review.save();

    res.json({ message: 'Performance review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


