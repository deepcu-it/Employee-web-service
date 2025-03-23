import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  isbn: { type: String, required: true, unique: true },
  availableCopies: { type: Number, required: true, default: 1 },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;