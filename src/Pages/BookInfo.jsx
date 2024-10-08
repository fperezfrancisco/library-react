import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/ui/Rating";
import Price from "../Components/ui/Price";
import Book from "../Components/ui/Book";

function BookInfo({ books, addToCart }) {
  const { id } = useParams();
  const book = books.find((book) => +book.id === +id);

  const handleAddCart = () => {
    addToCart(book);
  };

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis impedit laudantium recusandae excepturi saepe
                    blanditiis culpa quas voluptate! Nemo est nam tempore
                    similique mollitia fugiat necessitatibus vitae, magnam
                    dolorem nisi!
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis impedit laudantium recusandae excepturi saepe
                    blanditiis culpa quas voluptate! Nemo est nam tempore
                    similique mollitia fugiat necessitatibus vitae, magnam
                    dolorem nisi!
                  </p>
                </div>
                <div className="bookBtnsContainer">
                  <button className="btn" onClick={handleAddCart}>
                    Add to Cart
                  </button>
                  <Link to="/cart">
                    <button className="btn">Go to cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            <div className="books">
              {books
                .filter((book) => book.rating === 5 && +book.id !== +id)
                .map((book) => <Book book={book} key={book.id} />)
                .slice(0, 4)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookInfo;
