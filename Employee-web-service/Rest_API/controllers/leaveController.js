import LeaveDetailsSchema from "../models/LeaveDetailsSchema.js";

export const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    const leave = new LeaveDetailsSchema({ user: req.user.id, startDate, endDate, reason, status: 'Pending' });
    await leave.save();

    res.json({ message: 'Leave applied successfully', leave });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const leave = await LeaveDetailsSchema.findByIdAndUpdate(leaveId, { status }, { new: true });

    res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

