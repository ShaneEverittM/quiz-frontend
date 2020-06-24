import React from "react"

const ResultPage = (props) => {
    console.log('props: ', props);

    return (
        <div>
            haha results go
            <marquee>{props.location.state.results}</marquee>
        </div>
    )
}

export default ResultPage;