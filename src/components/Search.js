import React, { Component, Fragment } from "react";

import Book from "./Book";
import axios from "axios";
import { headers } from "../BooksAPI";

class Search extends Component {
  render() {
    if (this.props.searchErr !== true) {
      return (
        <Fragment>
          <div className="search-books-results">
            <div>
              <ol className="books-grid">
                {this.props.books.map(book => {
                  return (
                    <Book
                      book={book}
                      handleChange={this.props.handleChange}
                    ></Book>
                  );
                })}
              </ol>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="search-books-results">
            <h3>Sorry there are no results matching your search.</h3>
          </div>
        </Fragment>
      );
    }
  }
}

export default Search;
