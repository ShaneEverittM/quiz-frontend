import React, { useState } from "react";
import { search } from "../api/api";
import CategoryPreview from "../components/CategoryPreview";

const Search = () => {
  let [searchTerm, setSearchTerm] = useState("");
  let [results, setResults] = useState([]);

  const handleSubmit = async () => {
    console.log(searchTerm);
    let { data } = await search(searchTerm);
    setResults(data);
    setSearchTerm("");
  };

  return (
    <div>
      <div>
        <label htmlFor="search">Search for a nice quiz</label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          id="search"
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Go!
        </button>
      </div>
      <div>
        <CategoryPreview quizList={results} categoryName="Results" />
      </div>
    </div>
  );
};

export default Search;
