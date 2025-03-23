import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  basePay: Number,
  bonuses: Number,
  deductions: Number,
  totalPay: Number,
  month: String, // Example: "March 2025"
}, { timestamps: true });

export default mongoose.model('Salary', salarySchema);
