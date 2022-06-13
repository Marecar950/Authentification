import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Inscription from "./inscription.js";
import Connexion from "./connexion.js";
import "./App.css";

function Apps() {

  return (
  
   <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>React</Link>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/connexion'} className="nav-link">Connexion</Link>
            </li>
            <li className="nav-item">
              <Link to={'/inscription'} className="nav-link">Inscription</Link>
            </li>
         </div>
     </div>
   </nav>
 
   <div className="container mt-3">  
    <Routes>
     <Route path="/inscription" element={<Inscription />} />
     <Route path="/connexion" element={<Connexion />} />
   </Routes>
  </div>
 </div>
)
}

export default Apps;
