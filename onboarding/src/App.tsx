import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import './App.css';
import Signin from './pages/signIn/signin';
import Signup from './pages/signup/signup';
import Todo from './pages/todo/todo';

function App() {
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState("");

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      setAccessToken(accessToken)
      navigate('/todo')
    } 
  },[])
 
  return (
    <div className="App">
    
      <Routes>
        <Route path='/' element={ <Signin/>}/>
        <Route path='/signup' element={ <Signup/>}/>
        <Route path='/todo' element={ <Todo/>}/>
      </Routes>
      
    
    </div>

  );
}

export default App;
