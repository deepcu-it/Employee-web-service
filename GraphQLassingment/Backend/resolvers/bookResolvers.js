export const getAllBooks = () => {
    return [
      { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
      { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
      { id: "3", title: "1984", author: "George Orwell", publishedYear: 1949 },
      { id: "4", title: "The Catcher in the Rye", author: "J.D. Salinger", publishedYear: 1951 },
      { id: "5", title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813 },
      { id: "6", title: "The Lord of the Rings", author: "J.R.R. Tolkien", publishedYear: 1954 },
      { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 },
      { id: "8", title: "The Alchemist", author: "Paulo Coelho", publishedYear: 1988 },
      { id: "9", title: "The Da Vinci Code", author: "Dan Brown", publishedYear: 2003 },
      { id: "10", title: "The Hunger Games", author: "Suzanne Collins", publishedYear: 2008 },
    ];
}


export const getBookById = (id) => {
    return getAllBooks().find((book) => book.id === id);
}

