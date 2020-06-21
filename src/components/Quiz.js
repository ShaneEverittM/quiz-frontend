import React from "react"
import "../styles.css"

const Quiz = (props) => {


    return (<div className="quiz-box">
        <h3>{props.title}</h3>
        <p>{props.description}</p>

    </div>)
}

export default Quiz;