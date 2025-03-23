import Attendance from '../models/Attendance.js';

export const checkIn = async (req, res) => {
  try {
    const checkInRecord = new Attendance({ userId: req.user.id, checkIn: new Date() });
    await checkInRecord.save();
    res.json({ message: 'Check-in successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { userId: req.user.id, checkOut: null },
      { checkOut: new Date() },
      { new: true }
    );

    if (!attendance) return res.status(404).json({ error: 'No active session found' });
    res.json({ message: 'Check-out successful', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};