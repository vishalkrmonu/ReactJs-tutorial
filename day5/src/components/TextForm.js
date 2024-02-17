import React, { useState } from "react";

export default function TextForm(props) {
 
const handleUpClick= ()=>{
  console.log("Uppercase was clicked" +text);
  let newText=text.toUpperCase();
  setText(newText)
}

const handleLoClick= ()=>{
  console.log("Uppercase was clicked" +text);
  let newText=text.toLowerCase();
  setText(newText)
}

const handleClearClick= ()=>{
  let newText='';
  setText(newText)
}

const handleOnChange= (event)=>{
  // console.log("On change");
  setText(event.target.value)
}

const handleCopy= ()=>{
  var text=document.getElementById("myBox");
  text.Select();
  navigator.clipboard.writeText(text.value);
}


const handleExtraSpaces=()=>{
  let newText=text.split(/[ ]+/);
  setText(newText.join(" "))
}

  //DEclare a new state variable which we will call count
  const [text, setText] = useState("Enter text here");
//text="new text"; //wrong way to change the state
//setText=("new text"); //correct way to change the state


  return (
    <>
    <div className="container">
      <h3>{props.heading} </h3>
      <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
      </div>
      <button className="btn btn-primary mx-1" onClick={handleUpClick}> Convert to Uppercase</button>
      <button className="btn btn-primary mx-1" onClick={handleLoClick}> Convert to Lowercase</button>
      <button className="btn btn-primary mx-1" onClick={handleClearClick}> Clear</button>
      <button className="btn btn-primary mx-1" onClick={handleCopy}> Copy Text</button>
      <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}> Remove Extra Space</button>


    </div>

    <div className="container" my-3>
      <h4>Your text summary</h4>
      <p>{text.split(' ').length} words and {text.length} characters</p>
      <p>{0.008*text.split(' ').length} Minutes read</p>
      <h4>Preview</h4>
      <p>{text}</p>
    </div>
    </>
  );
}
 