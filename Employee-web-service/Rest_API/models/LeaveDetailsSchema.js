import mongoose from 'mongoose';

const leaveDetailsSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  leaveType: { type: String, enum: ['CL', 'PL', 'ML'], required: true },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
}, { timestamps: true });

export default mongoose.model('LeaveDetails', leaveDetailsSchema);
