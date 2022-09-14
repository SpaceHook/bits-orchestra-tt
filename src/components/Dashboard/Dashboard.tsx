import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooks } from '../../api/api';
import { Book } from '../../types/Book';
import { AddBook } from '../AddBook/AddBook';
import { BookList } from '../BookList/BookList';
import { EditBook } from '../EditBook/EditBook';

import '../../styles/Table.scss';
import '../../styles/Dashboard.scss';
import { Loader } from '../Loader';

export const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddBook, setIsAddBook] = useState(false);
  const [isEditBook, setIsEditBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const onAddBook = (book: Book) => {
    const newBook: Book = {
      id: books.length,
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn
    }

    setBooks([...books, newBook]);
  }

  const onDeleteBook = (selectedBook: Book) => {
    const booksWithoutDeleted = books
      .filter(book => book.id !== selectedBook.id);

    setBooks(booksWithoutDeleted);
  };

  const onEditBook = (selectedBook: number, editedBook: Book) => {
    console.log(selectedBook);
    
    setBooks(books.map(book => {
      if (book.id === selectedBook) {
        console.log('found');
        
        return {
          ...book,
          ...editedBook,
        }
      }
      return book;
    }));
  };

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data);
      setIsLoading(false);
    });
  }, [])

  useEffect(() => {
    switch (pathname) {
      case '/add-book':
        setIsAddBook(true);
        break;
      default:
        setIsAddBook(false);
    }
  }, [pathname]);

  return (
    <div className="container">
      <div className="dashboard">
        
        {isAddBook 
          ? <AddBook
              books={books}
              onAddBook={onAddBook}
            /> 
          : <>
              <button
                className="dashboard__add-book"
                onClick={() => navigate('/add-book')}
              >
                ADD BOOK
              </button>
              <BookList
                books={books}
                onDeleteBook={onDeleteBook}
                setIsEditBook={setIsEditBook}
                setSelectedBook={setSelectedBook}
              />
            </>
        }
        {isEditBook &&
          <EditBook
            books={books}
            onEditBook={onEditBook}
            setIsEditBook={setIsEditBook}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        }
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
