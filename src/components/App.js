import React from "react"
import Quiz from "../pages/QuizPage"
import Navbar from "./Navbar"
import Home from "../pages/Home"
import Place from "../pages/Placeholder"

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom"


/* some request to server to get queezes. 
next line is inital placeholder placeholder */
let quiz_list = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6"]
const App = () => {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/quiz" exact>
                <Quiz />
            </Route>
            <Route path="/placeholder" exact>
                <Place />
            </Route>
        </Router>
    )

}

export default App;