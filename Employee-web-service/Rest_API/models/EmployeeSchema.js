import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['SDE1', 'Manager', 'HR'], default: 'SDE1' },
  salary: { type: mongoose.Schema.Types.ObjectId, ref: 'Salary' },
  performance: { type: mongoose.Schema.Types.ObjectId, ref: 'Performance' },
}, { timestamps: true });

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

employeeSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model('Employee', employeeSchema);
