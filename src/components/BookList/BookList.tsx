import React from 'react';
import '../../styles/Table.scss'
import { Book } from '../../types/Book';

type Props = {
  books: Book[],
  onDeleteBook: (selectedBook: Book) => void,
  setIsEditBook: (status: boolean) => void,
  setSelectedBook: (selectedBook: number) => void,
}

export const BookList: React.FC<Props> = ({books, onDeleteBook, setIsEditBook, setSelectedBook}) => {
  return (
    <table className="table">
      <thead className='table__head'>
        <tr>
          <th>Book title</th>
          <th>Author name</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.isbn}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.isbn}</td>
            <td>
              <div className="table__buttons">
                <input
                  type="button"
                  className='table__buttons-edit table__button'
                  value="Edit"
                  onClick={() => {
                    setSelectedBook(book?.id || 0);
                    setIsEditBook(true);
                  }}
                />
                <input
                  type="button"
                  className='table__buttons-delete table__button'
                  value="Delete"
                  onClick={() => onDeleteBook(book)}
                />  
              </div>
            </td>
          </tr>
        ))}
    </tbody>
    </table>
  );
}
