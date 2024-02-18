// https://getbootstrap.com/docs/5.3/getting-started/introduction/
// import { useState } from "react";

import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light"); //whether dark mode is enable or not

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
      document.title = "TextUtils-Dark Mode";
      setInterval(() => {
        document.title = "TextUtils is Amazinf Mode";
      }, 2000);

      setInterval(() => {
        document.title = "Install TextUtils Now";
      }, 2000);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "TextUtils-light Mode";
    }
  };

  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils"/> */}
      {/* <Navbar /> */}


      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container" my-3>
          <Routes>
            <Route exact path="/about" 
            element={<About mode={mode} />}></Route>

            <Route
              exact
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="Enter the text to analyze "
                  mode={mode}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>


          {/* <TextForm showAlert={showAlert} heading="Enter the text to analyze " mode={mode}/>  */}
          {/*  new page */}
          {/* <About/> */}
    </>
  );
}

export default App;
