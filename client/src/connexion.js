import React, { useState } from "react";
import Axios from "axios";
import avatar from "./avatar.png";

function Connexion() {
  
  const [formeValues, setFormeValues] = useState({
    email: "",
    password: "",
});

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormeValues({ ...formeValues, [name]: value });
};

  const [formeErrors, setFormeErrors] = useState('');
  const [loginErreur, setLoginErreur] = useState([]);
  
  const [loginId, setLoginId] = useState([]);
  const [loginName, setLoginName] = useState([]);
  const [loginEmail, setLoginEmail] = useState([]);

  
  const handleSubmit = (e) => {
  e.preventDefault();
  setFormeErrors(validat(formeValues));
};
    
    const validat = (values) => {
    const errors = {};
    
      if (!values.email) {
        errors.email = "Veuillez entrez votre adresse email !";
    } else if (!values.password) {
        errors.password = "Veuillez entrez votre mot de passe !";
    } 
    return errors;
};
  
   const Login  = () => {
       Axios.post("http://localhost:3001/connexion", {
        email: formeValues.email,
        password: formeValues.password,
    }).then((response) => {
      
      if(response.data.message) {
        setLoginErreur(response.data.message)
     
      } else  {
        delete setLoginErreur(response.data.message)
        setLoginId(response.data[0].id);
        setLoginName(response.data[0].name);
        setLoginEmail(response.data[0].email);
  }
  });
};
  
return (
  
  <div className="col-md-12">
  <div className="card card-container">
  <img src={avatar} className="profile-img-card"/>
  <form onSubmit={handleSubmit}>

  <div className="form-group">
    <label>Email</label>
    <input type="text" name="email" placeholder="Entrez votre email :" className="form-control" value={formeValues.email} onChange={handleChange} />
</div>
<p>{formeErrors.email&&<div className='error-msg'>{formeErrors.email}</div>}</p>

  <div className="form-group">
    <label>Mot de passe</label>
    <input type="password" name="password" placeholder="Entrez votre mot de passe :" className="form-control" value={formeValues.password} onChange={handleChange} />
</div>
<p>{formeErrors.password&&<div className='error-msg'>{formeErrors.password}</div>}</p>

  <button onClick={Login} className="btn btn-primary btn-block">Se connecter</button>

   <div className= "connexion_erreur">
    <h4> {loginErreur} </h4>
   </div>
     <h3> {loginId}</h3>
     <h3> {loginName}</h3>
     <h3> {loginEmail}</h3>
 </form>
 </div>
</div>
);
}

export default Connexion;
