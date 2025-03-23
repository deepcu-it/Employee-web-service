import Leave from '../models/Leave.js';

export const applyLeave = async (req, res) => {
  try {
    const leave = new Leave({ ...req.body, userId: req.user.id });
    await leave.save();
    res.json({ message: 'Leave applied successfully', leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
    if (!leave) return res.status(404).json({ error: 'Leave not found' });
    res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};