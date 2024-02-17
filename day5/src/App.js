import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

// https://getbootstrap.com/docs/5.3/getting-started/introduction/

function App() {
  return (
    <>
    
{/* <Navbar title="TextUtils" aboutText="About TextUtils"/> */}
{/* <Navbar /> */}
<Navbar title="TextUtils"/>
<div className="container" my-3>
<TextForm heading="Enter the text to analyze"/> 
</div>

    </>
  );
}

export default App;


 