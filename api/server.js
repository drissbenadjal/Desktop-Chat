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

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not allowed" });
});

app.post("/api/signin", (req, res) => {
  let pseudo = req.body.pseudo;
  let email = req.body.email;
  let password = req.body.password;
  if (pseudo.trim() === "" || email.trim() === "" || password.trim() === "") {
    res.status(300).json({ message: "Veuillez remplir tous les champs" });
  } else {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            res.status(300).json({ message: "Email déjà utilisé" });
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
            let id = uuid.v4();
            let tag = Math.floor(1000 + Math.random() * 9000);
            let secret =
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15);
            let pp = ["https://digitagava.com/dashboard/img/pp/pprose3.png", "https://digitagava.com/dashboard/img/pp/pprose1.png", "https://digitagava.com/dashboard/img/pp/pprose2.png", "https://digitagava.com/dashboard/img/pp/default.png"];
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
  if (email === "" || password === "") {
    res.status(300).json({ message: "Veuillez remplir tous les champs" });
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
                res.status(200).json({ message: "Utilisateur connecté", token: token, pseudo: result[0].pseudo, tag: result[0].tag, uuid: result[0].uuid, pictureprofile: result[0].pictureprofile });
              } else {
                res.status(300).json({ message: "Email ou mot de passe incorrect" });
              }
            });
          } else {
            res.status(300).json({ message: "Email ou mot de passe incorrect" });
          }
        }
      }
    );
  }
});

app.post("/api/validtoken", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query(
      "SELECT * FROM users WHERE uuid = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          let secret = result[0].secret;
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              res.status(300).json({ message: "Token invalide" });
            } else {
              req.user = decoded;
              res.status(200).json({ message: "Token valide", token: token, pseudo: result[0].pseudo, tag: result[0].tag, uuid: result[0].uuid, pictureprofile: result[0].pictureprofile });
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      }
    );
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/private", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    let uuid = req.body.uuid;
    let uuid2 = req.body.uuid2;
    if (id === uuid || id === uuid2) {
    db.query(
      "SELECT * FROM users WHERE uuid = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          let secret = result[0].secret;
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              res.status(300).json({ message: "Token invalide" });
            } else {
              req.user = decoded;
              db.query(
                "SELECT * FROM private WHERE uuid = ? OR uuid = ?",
                [uuid + " " + uuid2, uuid2 + " " + uuid],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).json(result);
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      }
    );
    } else {
      res.status(300).json({ message: "Token invalide" });
    }
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/private/send", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    let uuid = req.body.uuid;
    let uuid2 = req.body.uuid2;
    let message = req.body.message;
    if (id === uuid || id === uuid2) {
    db.query(
      "SELECT * FROM users WHERE uuid = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          let secret = result[0].secret;
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              res.status(300).json({ message: "Token invalide" });
            } else {
              req.user = decoded;
              db.query(
                "INSERT INTO private (uuid, uuid2, message) VALUES (?, ?, ?)",
                [uuid + " " + uuid2, message],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).json({ message: "Message envoyé" });
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      }
    );
    } else {
      res.status(300).json({ message: "Token invalide" });
    }
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});



app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
