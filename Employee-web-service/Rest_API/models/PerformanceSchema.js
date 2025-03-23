import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  attendanceScore: Number, // Example: 8/10
  workDoneScore: Number,   // Example: 9/10
  managerReview: String,
  finalRating: Number,     // Calculated field (average or weighted)
}, { timestamps: true });

export default mongoose.model('Performance', performanceSchema);
