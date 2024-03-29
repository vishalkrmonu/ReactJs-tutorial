import React from "react";

function Alert(props) {
const capitalize =(word) =>{
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}


  return (
    <div style={{height:'70px'}}>

    {props.alert && <div
      className={`alert alert-${props.alert.type}  alert-dismissible fade show`} role="alert">
     
     <strong>{capitalize(props.alert.type)} </strong> :{props.alert.msg}
      {/* <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button> */}
      {/* jo side me cross ka symbol tha uske liye tha uper ka code */}
      </div>}
    </div>
  );
}

export default Alert;
