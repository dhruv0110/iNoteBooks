import "./App.css";
import Navbar from "./components/Navbar";

import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Homes from "./components/Homes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Info from "./components/Info";



function App() {
  const[alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      message : message,
      type : type,
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Homes showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/info" element={<Info showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
