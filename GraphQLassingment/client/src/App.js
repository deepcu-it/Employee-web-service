import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { client } from '.';

const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    getAllBooks {
      id
      title
      author
      publishedYear
    }
  }
`;

const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    getBookById(id: $id) {
      id
      title
      author
      publishedYear
    }
  }
`;

const LibraryApp = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  const handleBookClick = async (id) => {
    setSelectedBookId(id);
    const { data } = await client.query({
      query: GET_BOOK_BY_ID,
      variables: { id },
    });
    setBookDetails(data.getBookById);
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <div>
      <h1>Library Management System</h1>
      <h2>Books List</h2>
      <ul>
        {data.getAllBooks.map((book) => (
          <li key={book.id} onClick={() => handleBookClick(book.id)}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
      {selectedBookId && bookDetails && (
        <div>
          <h2>Book Details</h2>
          <p><strong>Title:</strong> {bookDetails.title}</p>
          <p><strong>Author:</strong> {bookDetails.author}</p>
          <p><strong>Published Year:</strong> {bookDetails.publishedYear}</p>
        </div>
      )}
    </div>
  );
};

export default LibraryApp; 