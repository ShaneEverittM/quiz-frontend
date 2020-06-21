import React, { useState, useEffect } from "react"

const serverURL = "https://jsonplaceholder.typicode.com/posts/1"
const serverURL2 = "localhost:8000/"
const data = [{
    q: "fill in the blank: Lorem ______",
    pa: [
        "yo mama", "vidi vini vici", "what's up", "ipsum"
    ],
    a: 3
},
{
    q: "fill in the blank: _____ ipsum",
    pa: [
        "If you got 'um", "carpe diem", "Lorem"
    ],
    a: 3
}]
class QuizPage extends React.Component {
    state = {
        title: "loading",
        description: "loading",
        questions: [],
        curQuestion: 0
    }

    componentDidMount() {
        this.testAPI()
    }

    //TODO get question list from backend, display one at a time

    testAPI = () => {

        fetch(serverURL).then(response => response.json())
            .then(json => { this.setState({ title: json.title, description: json.body }) })
        fetch(serverURL2).then(response => console.log(response)).catch(() => console.log("we tried our best"))
    }

    render() {
        return (
            <div>
                <h3>Title: {this.state.title}</h3>
                <p>This is a quiz:{this.state.description}</p>
                <button onClick={() => this.setState({ questions: [...this.state.questions, data[this.state.curQuestion]], curQuestion: this.state.curQuestion + 1 })}> Start</button>
                {
                    this.state.questions.map((item, i) => {
                        return <div key={i}>
                            <h4>{item.q}</h4>
                            {item.pa.map((item, j) => {
                                return <div key={j}><input type="radio" id={item} name={i} /> <label htmlFor={item}>{item}</label> </div>

                            })}
                        </div>
                    })
                }
            </div >
        )
    }
}

export default QuizPage;