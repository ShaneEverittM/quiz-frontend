import React from "react"
import Quiz from "../components/Quiz"


let quiz_list = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6"]
const Home = () => {
    return (<div>
        <p className="quiz-category">Our best quizzes</p>
        <a href="/quiz" className="quiz-container">
            {quiz_list.map((item, i) => {
                return <Quiz title={item} key={i}
                    description="How well do you know you latin place holder text?? Test your knowledge now!" />
            })}
        </a>
    </div>)
}

export default Home;