const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "marecar",
  host: "localhost",
  password: "motdepasse",
  database: "authentification",
});

app.post("/inscription", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
    
    db.query("INSERT INTO client (name, email, password, confirm_password) SELECT * FROM (SELECT ? AS name, ? AS email, ? AS password, ? AS confirm_password) AS tmp WHERE NOT EXISTS ( SELECT email FROM client WHERE email = ?)",
    [username, email, password, confirm_password, email], 
    (err, result) => {
    
      if(err) {
        return console.log(err);
     } 
     
      if(result.affectedRows == 0 && username != "" && password != "" && confirm_password != "") {
        res.send({ message: "L'email existe déjà !"});
    } 
     else if(result.affectedRows == 1) {
        res.send({ messag: "Votre inscription à bien été enregistrée."});
    } 
  });
}); 

app.post("/connexion", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    
    db.query("SELECT id,name,email FROM client WHERE email = ? AND password = ?",
    [email, password], 
    (err, result) => {
     
      if(!result.length > 0 && email != "" && password != "") {
        res.send({ message: "Email ou mot de passe incorrect !" });
    }  else {
        res.send(result);    
    }
  });    
});    
            
app.listen(3001, () => {
	console.log("Your server is running on port 3001");
});
