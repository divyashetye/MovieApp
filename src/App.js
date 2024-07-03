import React from 'react';
import './App.css';
import Home from './components/Home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/Details/details';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/details/:id' element={<Details/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
