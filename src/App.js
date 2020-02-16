import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BooksList from "./components/BooksList";
import Search from "./components/Search";
import Searchbar from "./components/Searchbar";
import axios from "axios";
import { headers } from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query: "",
    newbooks: [],
    searchErr: false,
    books: []
  };
  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    axios
      .get("https://reactnd-books-api.udacity.com/books/", { headers })
      .then(res => {
        this.setState({
          books: res.data.books
        });
      });
  };

  onChange = e => {
    this.setState({
      query: e.target.value
    });
    if (this.state.query !== "") {
      let data = JSON.stringify({ query: this.state.query });

      axios
        .post(
          "https://reactnd-books-api.udacity.com/search/",
          data,

          {
            headers: {
              ...headers,
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.data.books.length > 0) {
            this.setState({
              newbooks: res.data.books,
              searchErr: false
            });
          } else {
            this.setState({
              newbooks: [],
              searchErr: true
            });
          }
        });
    } else {
      this.setState({
        newbooks: [],
        searchErr: false
      });
    }
  };

  handleChange = (event, title, book) => {
    event.preventDefault();
    if (this.state.newbooks.includes(book)) {
      var newbooks = [...this.state.newbooks];

      var title = title;
      var findindex = newbooks.findIndex(book => book.title === title);

      newbooks[findindex].shelf = event.target.value;
      var check = this.state.books.some(book => book.title === title);
      if (check === false) {
        this.setState({
          ...this.state,
          books: [...this.state.books, this.state.newbooks[findindex]]
        });
      } else {
        this.inBookList(event, title);
      }
    } else {
      this.inBookList(event, title);
    }
  };

  inBookList = (event, title) => {
    var findindex = this.state.books.findIndex(book => book.title === title);

    this.state.books[findindex].shelf = event.target.value;
    this.setState({
      books: this.state.books
    });
  };
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                woop
              </button>
              <Searchbar onChange={this.onChange}></Searchbar>
            </div>
            <Search
              books={this.state.newbooks}
              handleChange={this.handleChange}
              onChange={this.onChange}
              searchErr={this.state.searchErr}
            ></Search>
          </div>
        ) : (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BooksList
                books={this.state.books}
                handleChange={this.handleChange}
              ></BooksList>
              <div className="open-search">
                <button
                  onClick={() =>
                    this.setState({
                      showSearchPage: true,
                      searchErr: false,
                      newbooks: []
                    })
                  }
                >
                  Add a book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
