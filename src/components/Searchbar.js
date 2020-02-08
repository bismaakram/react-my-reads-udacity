import React from "react";

const Searchbar = props => {
  return (
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        onChange={props.onChange}
      />
    </div>
  );
};

export default Searchbar;
