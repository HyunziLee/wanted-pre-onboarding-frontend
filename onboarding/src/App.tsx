import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import './App.css';
import Signin from './pages/signIn/signin';
import Signup from './pages/signup/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Signin/>}/>
        <Route path='/signup' element={ <Signup/>}/>
      </Routes>
      
    
    </div>

  );
}

export default App;
