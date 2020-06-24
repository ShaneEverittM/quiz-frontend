import React from "react"


let Answer = ({name,text, onChange}) => {

    return (
            <div>
                 <input  type="radio" id={text} onChange={(text) =>onChange(text)} name={name} />
                 <label htmlFor={text}>{text}</label>
             </div>
              )
}

export default Answer;