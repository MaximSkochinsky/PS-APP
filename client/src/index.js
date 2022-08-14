import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './layouts/Home';
import NotFound from './layouts/NotFound';
import  { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import reportWebVitals from './reportWebVitals';
import Discover from './layouts/Discover';
import Trophy from './layouts/Trophy';
import Friends from './layouts/Friends';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='App'>
     <BrowserRouter>
                <Navbar></Navbar>
                    <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/stats" element={<Discover/>}/>
                            <Route path="/trophy" element={<Trophy/>}></Route>
                            <Route path="/friend" element={<Friends/>}></Route>
                            <Route path="*" element={<NotFound/>}/>
                    </Routes>
      </BrowserRouter> 
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
