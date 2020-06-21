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
const App = () => {
    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={Home} />

            <Route path="/quiz" exact component={Quiz} />

            <Route path="/placeholder" exact component={Place} />

        </Router>
    )

}

export default App;