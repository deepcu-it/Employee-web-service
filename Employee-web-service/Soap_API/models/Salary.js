import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  lastUpdated: { type: Date, default: Date.now }
});

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;