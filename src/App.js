import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type,message) => {
    setAlert({
      type:type,
      msg:message,
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          <div className="container">
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
          </div>  
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
