import React, { FormEvent, useState } from 'react';
import '../../styles/EditBook.scss';
import { Book } from '../../types/Book';

type Props = {
  books: Book[],
  selectedBook: number,
  onEditBook: (selectedBook: number, updated: Book) => void,
  setIsEditBook: (status: boolean) => void,
  setSelectedBook: (editedBook: number) => void
}

export const EditBook: React.FC<Props> = ({books, selectedBook, onEditBook, setIsEditBook, setSelectedBook}) => {
  const categorys = [
    'Adventure stories',
    'Classics',
    'Crime',
    'Fairy tales',
    'Fantasy',
    'Historical fiction',
    'Horror',
    'Humour and satire',
    'Literary fiction',
    'Mystery',
    'Poetry',
    'Plays',
    'Romance',
    'Science fiction',
    'Short stories',
    'Thrillers',
    'War',
    'Womens fiction',
    'Young adult',
  ];
  const selectBook = books.find(book => selectedBook === book.id);
  const [title, setTitle] = useState<string>(selectBook?.title || '');
  const [author, setAuthor] = useState<string>(selectBook?.author || '');
  const [category, setCategory] = useState<string>(selectBook?.category || '');
  const [isbn, setIsbn] = useState<number>(selectBook?.isbn || 0);
  const [isNumber, setIsNumber] = useState(false);


  const validate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 10) {
      setIsNumber(false);
    }
    setIsbn(+event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isbn === 0 || isNaN(isbn)) {
      setIsNumber(true);
      return;
    }
    
    const newBook: Book = {
      title,
      author,
      category,
      isbn,
    }
    setSelectedBook(0);
    
    onEditBook(selectedBook, newBook);
    setIsEditBook(false);
  }

  const handleClose = () => {
    setIsEditBook(false);
  }

  return (
    <div className="wrapper">
      <form className='form' onSubmit={event => handleSubmit(event)}>
        <div className="form__content">
          <div className="form__header">
            <h2 className='form__header-title'>EDIT BOOK</h2>
            <div className="form__header-close" onClick={handleClose}></div>
          </div>
          <div className="form__title form__field">
            Title
            <input
              type="text"
              className='form__field-input'
              required
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="form__author form__field">
            Author
            <input
              type="text"
              className='form__field-input'
              required
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </div>
          <div className="form__category form__field">
            Category
            <select
              className='form__category-select form__field-input'
              value={category}
              onChange={event => setCategory(event.target.value)}
            >
              {categorys.map(category => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form__isbn form__field">
            ISBN
            <input
              type="text"
              className='form__field-input'
              value={isbn || 0}
              maxLength={10}
              minLength={10}
              required
              onChange={event => validate(event)}
            />
            {isNumber && <span style={{color: 'red'}}>enter an ISBN(10 digits)</span>}
          </div>
        </div>
        <input
          type="submit"
          className='form__submit'
          value="EDIT BOOK"
        />
      </form>
    </div>
  );
}
