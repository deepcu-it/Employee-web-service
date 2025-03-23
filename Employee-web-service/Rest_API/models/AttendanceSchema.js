import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: { type: Date, required: true },
  checkIn: Date,
  checkOut: Date,
  status: { type: String, enum: ['Present', 'Absent', 'Half Day'], default: 'Present' },
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
