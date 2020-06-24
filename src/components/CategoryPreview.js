import React from "react"
import { Link } from "react-router-dom"
import Quiz from "../components/Quiz"

let CategoryPreview = ({quizList, categoryName}) => {
    return  (
    <div>
    <p className="quiz-category">{categoryName}</p>
    {quizList.map((quizName, i) => {
        return <Link to={`/quiz?id=${i}`} id="1" key={i} className="quiz-container" >
            <Quiz title={quizName}
                description="How well do you know you latin place holder text?? Test your knowledge now!" />
        </Link>
    })}

</div >
)
}

export default CategoryPreview;