import Performance from '../models/Performance.js';

export const getMyPerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findOne({ userId: req.user.id });
    if (!review) return res.status(404).json({ error: 'No review found' });
    res.json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const givePerformanceReview = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { review, rating } = req.body;
    const newReview = new Performance({ userId: employeeId, review, rating });
    await newReview.save();
    res.json({ message: 'Review submitted successfully', newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};