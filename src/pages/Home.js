import React from "react"
import { Link } from "react-router-dom"
import Quiz from "../components/Quiz"


let quiz_list = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6"]
const Home = () => {
    return (
        <div>
            <p className="quiz-category">Our best quizzes</p>

            {quiz_list.map((item, i) => {
                return <Link to={`/quiz?id=${i}`} id="1" key={i} className="quiz-container" >
                    <Quiz title={item}
                        description="How well do you know you latin place holder text?? Test your knowledge now!" />
                </Link>
            })}

        </div >
    )
}

export default Home;