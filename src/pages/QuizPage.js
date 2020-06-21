import React from "react"
import { Redirect } from "react-router-dom"

const serverURL = "https://jsonplaceholder.typicode.com/posts/1"
const serverURL2 = "http://localhost:8000/"

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
        curQuestion: 0,
        numQuestions: 2,
        redirectToResults: false
    }

    componentDidMount() {
        this.testAPI()
    }

    //TODO get question list from backend, display one at a time

    testAPI = () => {
        fetch(serverURL)
            .then(response => response.json())
            .then(json => { this.setState({ title: json.title, description: json.body }) })

        //fetch(serverURL2).then(response => response.json()).then(json => console.log(json)).catch(() => console.log("we tried our best"))
    }
    renderNextQuestion = () => {
        if (this.state.curQuestion < this.state.numQuestions)
            this.setState({ questions: [...this.state.questions, data[this.state.curQuestion]], curQuestion: this.state.curQuestion + 1 })

    }
    redirect = () => {
        console.log("running")
        if (this.state.redirectToResults) {
            return <Redirect to="/placeholder" />
        }
    }
    setRedirect = () => {
        this.setState({ redirectToResults: true })
    }
    renderButtonText = () => {
        let buttonText = "Next"
        let handle = this.renderNextQuestion;

        if (this.state.curQuestion === 0)
            buttonText = "Start"

        else if (this.state.curQuestion === this.state.numQuestions) {
            buttonText = "end";
            handle = this.setRedirect;
        }
        return (
            <button onClick={handle}> {buttonText}</button>
        )
    }
    render() {
        return (
            <div>
                <h3>Title: {this.state.title}</h3>
                <p>This is a quiz:{this.state.description}</p>
                {
                    this.state.questions.map((item, i) => {
                        return <div key={i}>
                            <h4>{item.q}</h4>
                            {item.pa.map((item, j) => {
                                return <div key={j}>
                                    <input type="radio" id={item} name={i} />
                                    <label htmlFor={item}>{item}</label>
                                </div>

                            })}
                        </div>
                    })
                }
                {this.renderButtonText()}
                {this.redirect()}
            </div >
        )
    }
}

export default QuizPage;