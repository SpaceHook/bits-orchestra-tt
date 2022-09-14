import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddBook.scss';
import { Book } from '../../types/Book';

type Props = {
  books: Book[],
  onAddBook: (book: Book) => void,
}

export const AddBook: React.FC<Props> = ({ onAddBook, books }) => {
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState<number>(0);
  const [isNumber, setIsNumber] = useState(false);
  const navigate = useNavigate();

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
      id: books.length + 1,
      title,
      author,
      category,
      isbn,
    }

    onAddBook(newBook);    
    navigate("/");
  }

  const handleClose = () => {
    navigate("/");
  }

  return (
    <div className="add">
      <form className='add-form' onSubmit={event => handleSubmit(event)}>
        <div className="add-form__content">
          <div className="add-form__header">
            <h2 className='add-form__header-title'>ADD BOOK</h2>
            <div className="add-form__header-close" onClick={handleClose}></div>
          </div>
          <div className="add-form__title add-form__field">
            Title
            <input
              type="text"
              className='add-form__field-input'
              required
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className="add-form__author add-form__field">
            Author
            <input
              type="text"
              className='add-form__field-input'
              required
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </div>
          <div className="add-form__category add-form__field">
            Category
            <select
              className='add-form__category-select add-form__field-input'
              value={category}
              onChange={event => setCategory(event.target.value)}
              required

            >
              <option value=''></option>
              {categorys.map(category => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="add-form__isbn add-form__field">
            ISBN
            <input
              type="text"
              className='add-form__field-input'
              value={isbn || 0}
              maxLength={10}
              minLength={10}
              onChange={event => validate(event)}
              required
            />
            {isNumber && <span style={{color: 'red'}}>enter an ISBN(10 digits)</span>}
          </div>
        </div>
        <input
          type="submit"
          className='add-form__submit'
          value="ADD BOOK"
        />
      </form>
    </div>
  );
}
