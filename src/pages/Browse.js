import React, { useState, useEffect } from "react";
import CategoryPreview from "../components/CategoryPreview";
import { getBrowse } from "../api/api";

const Browse = () => {
  let [quizList, setQuizList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let { data } = await getBrowse();
      setQuizList(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <CategoryPreview quizList={quizList} categoryName="All" />
    </div>
  );
};
export default Browse;
