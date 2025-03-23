import Book from "../../models/Book";


export const resolvers = {
  Query: {
    getBooks: async () => {
      return await Book.find();
    },
    getBook: async (_, { id }) => {
      return await Book.findById(id);
    },
  },
  Mutation: {
    addBook: async (_, { title, author, publishedDate, isbn, availableCopies }) => {
      const newBook = new Book({ title, author, publishedDate, isbn, availableCopies });
      return await newBook.save();
    },
    updateBook: async (_, { id, title, author, publishedDate, isbn, availableCopies }) => {
      return await Book.findByIdAndUpdate(id, { title, author, publishedDate, isbn, availableCopies }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndRemove(id);
    },
  },
};