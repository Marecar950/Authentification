import React, { useState } from "react";
import Axios from "axios";
import avatar from "./avatar.png";

function Inscription() {
  
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
});

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};

  const [formErrors, setFormErrors] = useState('');
  const [registerErreur, setRegisterErreur] = useState('');
  const [registerReussie, setRegisterReussie] = useState('');
  
  const handleSubmit = (e) => {
  e.preventDefault();
  setFormErrors(validate(formValues));
};
    
    const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}/;
    
    if (!values.username) {
      errors.username = "Le nom d'utilisateur est obligatoire !";
    } else if (values.username.length < 2 || values.username.length > 20) {
      errors.username = "Le nom d'utilisateur doit être compris entre 2 et 20 charactères !";
    } 
    if (!values.email) {
      errors.email = "L'adresse email est obligatoire !";
    } else if (!regex.test(values.email)) {
      errors.email = "Ceci n'est pas une adresse email valide !";
    }
    if (!values.password) {
      errors.password = "Le mot de passe est obligatoire";
    } else if (values.password.length < 8 || values.password.length > 20) {
      errors.password = "Le mot de passe est compris entre 8 et 20 charactères !";
    } 
    if (!values.confirm_password) {
      errors.confirm_password = "Le confirmation de mot de passe est obligatoire !";
    } else if (values.confirm_password !== values.password) {
      errors.confirm_password = "Le mot de passe ne correspond pas avec le nouveau mot de passe !";
    }
    return errors;
};

    const register = () => {
       Axios.post("http://localhost:3001/inscription", {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        confirm_password: formValues.confirm_password,
      }).then((response) => {
        
        if(response.data.message) {
        setRegisterErreur(response.data.message)
        delete setRegisterReussie(response.data.messag)
       } else if(response.data.messag) {
        setRegisterReussie(response.data.messag)
        delete setRegisterErreur(response.data.message)
       }
      });
};
  
return (
  
  <div className="col-md-12">
  <div className="card card-container">
  <img src={avatar} className="profile-img-card"/>
  <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Nom</label>
    <input type="text" name="username" placeholder="Entrez votre nom :" className="form-control" value={formValues.username} onChange={handleChange} />
</div>
<p>{formErrors.username&&<div className='error-msg'>{formErrors.username}</div>}</p>

  <div className="form-group">
    <label>Email</label>
    <input type="text" name="email" placeholder="Entrez votre email :" className="form-control" value={formValues.email} onChange={handleChange} />
</div>
<p>{formErrors.email&&<div className='error-msg'>{formErrors.email}</div>}</p>

<div className = "Inscription_erreur">
<p> {registerErreur} </p>
</div>

  <div className="form-group">
    <label>Mot de passe</label>
    <input type="password" name="password" placeholder="Entrez un mot de passe :" className="form-control" value={formValues.password} onChange={handleChange} />
</div>
<p>{formErrors.password&&<div className='error-msg'>{formErrors.password}</div>}</p>

<div className="form-group">
    <label>Confirmation de mot de passe</label>
    <input type="password" name="confirm_password" placeholder="Entrez un mot de passe à nouveau :" className="form-control" value={formValues.confirm_password} onChange={handleChange} />
</div>
<p>{formErrors.confirm_password&&<div className='error-msg'>{formErrors.confirm_password}</div>}</p>

  <button onClick={register} className="btn btn-primary btn-block">S'inscrire</button>
  
<div className = "Inscription_reussie">
<p> {registerReussie} </p>
</div>

 </form>
</div>
</div>
);
}

export default Inscription;
