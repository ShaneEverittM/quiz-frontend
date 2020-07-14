import React, { useState } from "react";
import { search } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";
import "./search.css";

const Search = () => {
  let [searchTerm, setSearchTerm] = useState("");
  let [results, setResults] = useState([]);
  let [haveSearched, toggleSearched] = useState(false);

  const handleSubmit = async () => {
    let { data } = await search(searchTerm);

    setResults(data);
    toggleSearched(true);
  };
  const renderMessage = () => {
    return haveSearched
      ? `no results for "${searchTerm}." Try deleting some words and searching again `
      : "";
  };

  const enterToSubmit = (e) => {
    //this may not work on every browser/keyboard combo
    if (e.key.toLowerCase() === "enter") handleSubmit();
    console.log("e: ", e);
  };
  return (
    <div>
      <div className="search-box">
        <label htmlFor="search">Search for a nice quiz</label>
        <input
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          id="search"
          onKeyPress={(e) => {
            enterToSubmit(e);
          }}
        />
        <button
          className="submit-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Go!
        </button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          <CategoryPreview quizList={results} categoryName="Results" />
        ) : (
          renderMessage()
        )}
      </div>
    </div>
  );
};

export default Search;
