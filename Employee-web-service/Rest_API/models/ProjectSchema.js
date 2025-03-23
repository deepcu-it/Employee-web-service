import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
