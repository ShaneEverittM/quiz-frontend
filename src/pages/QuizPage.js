import React from "react"
import { Redirect } from "react-router-dom"
import Question from "../components/Question"
import Answer from "../components/Answer"

/*
data given in form of {"quiz":
{"id":1,"name":"test","num_questions":5},
"questions":[
    {"id":1,"description":"description","qz_id":1},
    {"id":2,"description":"description","qz_id":1},
    {"id":3,"description":"description","qz_id":1},
    {"id":4,"description":"description","qz_id":1},
    {"id":5,"description":"description","qz_id":1}
],
"answers":[
    [
        {"id":1,"description":"description","val":2,"q_id":1}
    ],[
        {"id":2,"description":"description","val":2,"q_id":2}
    ],[
        {"id":3,"description":"description","val":2,"q_id":3}
    ],[
        {"id":4,"description":"description","val":2,"q_id":4}
    ],[
        {"id":5,"description":"description","val":2,"q_id":5}
    ]
]
}
*/

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
        redirectToResults: false,
        responses:[]
    }

    componentDidMount() {
        this.testAPI()
    }

    //TODO get question list from backend, display one at a time

    testAPI = () => {
        fetch(serverURL)
            .then(response => response.json())
            .then(json => { this.setState({ title: json.title, description: json.body }) })
            .catch(this.setState({ title: "err", description: "err" }))

        //fetch(serverURL2).then(response => response.json()).then(json => console.log(json)).catch(() => console.log("we tried our best"))
    }
    renderNextQuestion = () => {
        if (this.state.curQuestion < this.state.numQuestions)
            this.setState({ questions: [...this.state.questions, data[this.state.curQuestion]], curQuestion: this.state.curQuestion + 1 })
    }

    redirect = () => {
        if (this.state.redirectToResults) {
            return <Redirect to={{
                pathname: "/results",
                state: { results: "brrr" }
            }} />
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

    onClick = (e) =>{
        console.log("clicked",e)
    }

    render() {
        return (
            <div>
                <h3>Title: {this.state.title}</h3>
                <p>This is a quiz:{this.state.description}</p>
                {
                    this.state.questions.map((questionText, i) => {
                         return <div  key={i}>
                              <Question question={questionText.q} />
                                {questionText.pa.map((answerText,j) =>{ //this will be changed to a separate answer array matched by Ids
                                    return <Answer key={j} onChange={this.onClick} name={i} text={answerText}/>
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