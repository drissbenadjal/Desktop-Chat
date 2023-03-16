const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database!");
  }
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.post("/api/signin", (req, res) => {
  let pseudo = req.body.pseudo;
  let email = req.body.email;
  let password = req.body.password;
  if (pseudo.trim() === "" || email.trim() === "" || password.trim() === "") {
    res.status(400).json({ message: "Veuillez remplir tous les champs" });
  } else {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            res.status(400).json({ message: "Email déjà utilisé" });
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
            let id = uuid.v4();
            let tag = Math.floor(Math.random() * 10000);
            let secret =
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15);
            let pp = ["test", "test1", "test2"];
            let random = Math.floor(Math.random() * pp.length);
            let avatar = pp[random];
            db.query(
              "INSERT INTO users (uuid, pseudo, tag, email, password, secret, pictureprofile) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [id, pseudo, tag, email, hash, secret, avatar],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(201).json({ message: "Utilisateur créé" });
                }
              }
            );
            });
          }
        }
      }
    );
  }
});

app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email.trim() === "" || password.trim() === "") {
    res.status(400).json({ message: "Veuillez remplir tous les champs" });
  } else {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
              if (response) {
                let token = jwt.sign({ id: result[0].uuid }, result[0].secret, { expiresIn: "1h" });
                res.status(200).json({ message: "Utilisateur connecté", token: token });
              } else {
                res.status(400).json({ message: "Mot de passe incorrect" });
              }
            });
          } else {
            res.status(400).json({ message: "Email incorrect" });
          }
        }
      }
    );
  }
});



app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
