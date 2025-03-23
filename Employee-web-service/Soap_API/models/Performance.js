import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
});

const Performance = mongoose.model('Performance', performanceSchema);
export default Performance;