import mongoose from 'mongoose';
import AttendanceSchema from '../models/AttendanceSchema.js';

export const checkIn = async (req, res) => {
    try {
      const { employeeId } = req.body;
  
      if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const existingRecord = await AttendanceSchema.findOne({ employee: employeeId, date: today });
  
      if (existingRecord) {
        return res.status(400).json({ message: 'Already checked in today' });
      }
  
      const attendance = new Attendance({
        employee: new mongoose.Types.ObjectId(employeeId),
        date: today,
        checkIn: new Date(),
        status: 'Present',
      });
  
      await attendance.save();
      res.status(200).json({ message: 'Checked in successfully', attendance });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  export const checkOut = async (req, res) => {
    try {
      const { employeeId } = req.body;
  
      if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const attendance = await AttendanceSchema.findOne({ employee: employeeId, date: today });
  
      if (!attendance) {
        return res.status(400).json({ message: 'No check-in record found for today' });
      }
  
      if (attendance.checkOut) {
        return res.status(400).json({ message: 'Already checked out today' });
      }
  
      attendance.checkOut = new Date();
      await attendance.save();
      res.status(200).json({ message: 'Checked out successfully', attendance });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  export const updateAttendance = async (req, res) => {
    try {
      const { attendanceId, checkIn, checkOut, status } = req.body;
  
      if (!attendanceId) {
        return res.status(400).json({ message: 'Attendance ID is required' });
      }
  
      const updatedAttendance = await AttendanceSchema.findByIdAndUpdate(
        attendanceId,
        { checkIn, checkOut, status },
        { new: true }
      );
  
      if (!updatedAttendance) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }
  
      res.status(200).json({ message: 'Attendance updated successfully', updatedAttendance });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  export const getAttendanceByDate = async (req, res) => {
    try {
      const { date } = req.params;
      const formattedDate = new Date(date);
      formattedDate.setHours(0, 0, 0, 0);
  
      const attendanceRecords = await AttendanceSchema.find({ date: formattedDate }).populate('employee', 'name email');
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  export const getTodayAttendance = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const attendanceRecords = await AttendanceSchema.find({ date: today }).populate('employee', 'name email');
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  export const getEmployeeAttendance = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID' });
      }
  
      const attendanceRecords = await AttendanceSchema.find({ employee: employeeId }).sort({ date: -1 });
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  
  };
  
  