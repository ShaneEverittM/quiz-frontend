import React from "react"
import Quiz from "./Quiz"
import Navbar from "./Navbar"

/* some request to server to get queezes. 
next line is inital placeholder placeholder */
let quiz_list = ["quiz1", "quiz2", "quiz1", "quiz2", "quiz1", "quiz2",]
const App = () => {
    return (<div>
        <Navbar />
        <p className="quiz-category">Our best quizzes</p>
        <div className="quiz-container">
            {quiz_list.map((item, i) => {
                return <Quiz title={item} key={i}
                    description="How well do you know you latin place holder text?? Test your knowledge now!" />
            })}
        </div>
    </div>)
}

export default App;