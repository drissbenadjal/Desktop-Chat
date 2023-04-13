const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const http = require("http");

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Content-Type,Authorization,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers",
    exposedHeaders:
      "Content-Type,Authorization,X-Requested-With,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const transporter = nodemailer.createTransport({
  host: "smtp-nexuschat.alwaysdata.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
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

app.post("/api/signup", (req, res) => {
  let pseudo = req.body.pseudo;
  let email = req.body.email;
  let password = req.body.password;
  if (pseudo.trim() === "" || email.trim() === "" || password.trim() === "") {
    res.status(300).json({ message: "Veuillez remplir tous les champs" });
  } else {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
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
            let pp = [
              "https://digitagava.com/dashboard/img/pp/pprose3.png",
              "https://digitagava.com/dashboard/img/pp/pprose1.png",
              "https://digitagava.com/dashboard/img/pp/pprose2.png",
              "https://digitagava.com/dashboard/img/pp/default.png",
            ];
            let random = Math.floor(Math.random() * pp.length);
            let avatar = pp[random];
            db.query(
              "INSERT INTO users (uuid, pseudo, tag, email, password, secret, pictureprofile) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [id, pseudo, tag, email, hash, secret, avatar],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res
                    .status(201)
                    .json({ status: "create", message: "Utilisateur créé" });

                    const mail = `
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
                    <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New message</title><!--[if (mso 16)]>
                    <style type="text/css">
                    a {text-decoration: none;}
                    </style>
                    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG></o:AllowPNG>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]--><!--[if !mso]><!-- -->
                    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
                    <style type="text/css">
                    #outlook a {
                    padding:0;
                    }
                    .es-button {
                    mso-style-priority:100!important;
                    text-decoration:none!important;
                    }
                    a[x-apple-data-detectors] {
                    color:inherit!important;
                    text-decoration:none!important;
                    font-size:inherit!important;
                    font-family:inherit!important;
                    font-weight:inherit!important;
                    line-height:inherit!important;
                    }
                    .es-desk-hidden {
                    display:none;
                    float:left;
                    overflow:hidden;
                    width:0;
                    max-height:0;
                    line-height:0;
                    mso-hide:all;
                    }
                    .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
                    background:#56d66b!important;
                    }
                    .es-button-border:hover {
                    border-color:#42d159 #42d159 #42d159 #42d159!important;
                    background:#56d66b!important;
                    }
                    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
                    </style>
                    </head>
                    <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                    <div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f6f6f6"></v:fill>
                    </v:background>
                    <![endif]-->
                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
                    <tr>
                    <td valign="top" style="padding:0;Margin:0">
                    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                    <tr>
                    <td align="center" style="padding:0;Margin:0">
                    <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                    <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://gkvbwy.stripocdn.email/content/guids/CABINET_5018cf9a945bb38e262a6a78c2a63f51036b693a3ec22ec7cf76e994e47f5fb0/images/logo.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="85"></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                    <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:35px;color:#333333;font-size:23px">Merci pour votre inscription à nexus chat !</p></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                    <tr>
                    <td align="center" style="padding:0;Margin:0">
                    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                    <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Nexus Chat vous remercie, amusez-vous bien !</p></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table>
                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                    <tr>
                    <td align="center" style="padding:0;Margin:0">
                    <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                    <tr>
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0"
                    cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                    <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tr>
                    <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td style="padding:0;Margin:0;display:none" align="center"></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                    <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tr>
                    <td align="left" style="padding:0;Margin:0;width:270px">
                    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                    <td style="padding:0;Margin:0;display:none" align="center"></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table><!--[if mso]></td></tr></table><![endif]--></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table></td>
                    </tr>
                    </table>
                    </div>
                    </body>
                    </html>
                    `;

                    const mailOptions = {
                      from: process.env.MAIL_USER,
                      to: email,
                      subject: "Nexus Chat - Confirmation d'inscription",
                      html: mail,
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        return console.log(error);
                      }
                      console.log("Message sent: %s", info.messageId);
                      console.log(info);
                    });
                }
              }
            );
          });
        }
      }
    });
  }
});

app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email === "" || password === "") {
    res.status(300).json({ message: "Veuillez remplir tous les champs" });
  } else {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
              let token = jwt.sign({ id: result[0].uuid }, result[0].secret, {
                expiresIn: "365d",
              });
              res.status(200).json({
                message: "Utilisateur connecté",
                token: token,
                pseudo: result[0].pseudo,
                tag: result[0].tag,
                uuid: result[0].uuid,
                pictureprofile: result[0].pictureprofile,
              });
            } else {
              res
                .status(300)
                .json({ message: "Email ou mot de passe incorrect" });
            }
          });
        } else {
          res.status(300).json({ message: "Email ou mot de passe incorrect" });
        }
      }
    });
  }
});

app.post("/api/validtoken", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
            res.status(200).json({
              message: "Token valide",
              token: token,
              pseudo: result[0].pseudo,
              tag: result[0].tag,
              uuid: result[0].uuid,
              pictureprofile: result[0].pictureprofile,
            });
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/user/infos", (req, res) => {
  let token = req.body.token;
  let uuid2 = req.body.uuid2;
  if (token && uuid2) {
    let id = jwt.decode(token).id;
    if (id !== uuid2) {
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
                "SELECT * FROM users WHERE uuid = ?",
                [uuid2],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  if (result.length > 0) {
                    res.status(200).json({
                      message: "Utilisateur trouvé",
                      pseudo: result[0].pseudo,
                      tag: result[0].tag,
                      uuid: result[0].uuid,
                      pictureprofile: result[0].pictureprofile,
                      status: result[0].status,
                    });
                  } else {
                    res
                      .status(300)
                      .json({ message: "Utilisateur introuvable" });
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      });
    } else {
      res.status(300).json({ message: "Token invalide" });
    }
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/private", (req, res) => {
  let token = req.body.token;
  let uuid2 = req.body.uuid2;
  if (token && uuid2) {
    let id = jwt.decode(token).id;
    if (id !== uuid2) {
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
                "SELECT * FROM current_private WHERE uuid_first = ? AND uuid_second = ?",
                [id, uuid2],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    if (result.length > 0) {
                      db.query(
                        "SELECT * FROM private WHERE (uuid = ?) OR (uuid = ?) ORDER BY date ASC",
                        [id + " " + uuid2, uuid2 + " " + id],
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            if (result.length > 0) {
                              for (let i = 0; i < result.length; i++) {
                                let uuid = result[i].sender;
                                db.query(
                                  "SELECT * FROM users WHERE uuid = ?",
                                  [uuid],
                                  (err, result2) => {
                                    if (err) {
                                      console.log(err);
                                    }
                                    if (result2.length > 0) {
                                      result[i].pictureprofile =
                                        result2[0].pictureprofile;
                                      result[i].pseudo = result2[0].pseudo;
                                      result[i].tag = result2[0].tag;
                                      if (i === result.length - 1) {
                                        res.status(200).json(result);
                                      }
                                    }
                                  }
                                );
                              }
                            } else {
                              res
                                .status(300)
                                .json({ message: "Aucun message" });
                            }
                          }
                        }
                      );
                    } else {
                      db.query(
                        "INSERT INTO current_private (uuid_first, uuid_second) VALUES (?, ?)",
                        [id, uuid2],
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            db.query(
                              "SELECT * FROM private WHERE (uuid = ?) OR (uuid = ?) ORDER BY date ASC",
                              [id + " " + uuid2, uuid2 + " " + id],
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  if (result.length > 0) {
                                    for (let i = 0; i < result.length; i++) {
                                      let uuid = result[i].sender;
                                      db.query(
                                        "SELECT * FROM users WHERE uuid = ?",
                                        [uuid],
                                        (err, result2) => {
                                          if (err) {
                                            console.log(err);
                                          }
                                          if (result2.length > 0) {
                                            result[i].pictureprofile =
                                              result2[0].pictureprofile;
                                            result[i].pseudo =
                                              result2[0].pseudo;
                                            result[i].tag = result2[0].tag;
                                            if (i === result.length - 1) {
                                              res.status(200).json(result);
                                            }
                                          }
                                        }
                                      );
                                    }
                                  } else {
                                    res
                                      .status(300)
                                      .json({ message: "Aucun message" });
                                  }
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      });
    } else {
      res.status(300).json({ message: "Une erreur est survenue" });
    }
  } else {
    res.status(300).json({ message: "Une erreur est survenue" });
  }
});

app.put("/api/private/update", (req, res) => {
  let token = req.body.token;
  let uuid2 = req.body.uuid2;
  let idMessage = req.body.idMessage;
  let message = req.body.message;
  if (token && uuid2 && message && idMessage) {
    let id = jwt.decode(token).id;
    if (id !== uuid2) {
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              //verfier si le message est pareil
              db.query(
                "SELECT * FROM private WHERE id = ? AND sender = ? AND (uuid = ? OR uuid = ?)",
                [idMessage, id, id + " " + uuid2, uuid2 + " " + id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    if (result.length > 0) {
                      if (result[0].message === message) {
                        res
                          .status(300)
                          .json({ message: "Aucune modification" });
                      } else {
                        db.query(
                          "UPDATE private SET message = ?, edited = ? WHERE id = ? AND sender = ? AND (uuid = ? OR uuid = ?)",
                          [
                            message,
                            1,
                            idMessage,
                            id,
                            id + " " + uuid2,
                            uuid2 + " " + id,
                          ],
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              if (result.affectedRows > 0) {
                                res
                                  .status(200)
                                  .json({ message: "Message modifié" });
                              } else {
                                res
                                  .status(300)
                                  .json({ message: "Aucune modification" });
                              }
                            }
                          }
                        );
                      }
                    } else {
                      res.status(300).json({ message: "Aucune modification" });
                    }
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      });
    } else {
      res.status(300).json({ message: "Une erreur est survenue" });
    }
  } else {
    res.status(300).json({ message: "Une erreur est survenue" });
  }
});

app.delete("/api/private/delete", (req, res) => {
  let token = req.body.token;
  let uuid2 = req.body.uuid2;
  let idMessage = req.body.idMessage;
  let message = req.body.message;
  if (token && uuid2 && message && idMessage) {
    let id = jwt.decode(token).id;
    if (id !== uuid2) {
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
                "DELETE FROM private WHERE (id = ?) AND (uuid = ? or uuid = ?) AND (sender = ?) AND (message = ?)",
                [idMessage, id + " " + uuid2, uuid2 + " " + id, id, message],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).json({ message: "Message supprimé" });
                  }
                }
              );
            }
          });
        } else {
          res.status(300).json({ message: "Token invalide" });
        }
      });
    } else {
      res.status(300).json({ message: "Une erreur est survenue" });
    }
  } else {
    res.status(300).json({ message: "Une erreur est survenue" });
  }
});

app.post("/api/private/current", (req, res) => {
  let token = req.body.token;
  if (token.length > 0) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM current_private WHERE uuid_first = ?",
              [id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  if (result.length > 0) {
                    let users = [];
                    for (let i = 0; i < result.length; i++) {
                      db.query(
                        "SELECT * FROM users WHERE uuid = ?",
                        [result[i].uuid_second],
                        (err, result2) => {
                          if (err) {
                            console.log(err);
                          } else {
                            users.push({
                              uuid: result2[0].uuid,
                              pseudo: result2[0].pseudo,
                              tag: result2[0].tag,
                              pictureprofile: result2[0].pictureprofile,
                              status: result2[0].status,
                            });
                            if (i === result.length - 1) {
                              res.status(200).json(users);
                            }
                          }
                        }
                      );
                    }
                  } else {
                    res.status(300).json({ message: "Aucun chat" });
                  }
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.delete("/api/private/current/delete", (req, res) => {
  let token = req.body.token;
  if (token.length > 0) {
    let id = jwt.decode(token).id;
    let uuid = req.body.uuid;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "DELETE FROM current_private WHERE (uuid_first = ?) AND (uuid_second = ?)",
              [id, uuid],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json({ message: "Chat supprimé" });
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/private/send", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    let uuid2 = req.body.uuid2;
    let message = req.body.message;
    if (id || uuid2 || message) {
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
                "INSERT INTO private (uuid, sender, message) VALUES (?, ?, ?)",
                [id + " " + uuid2, id, message],
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
      });
    } else {
      res.status(300).json({ message: "Token invalide" });
    }
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/all", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM friends WHERE uuid_first = ? OR uuid_second = ?",
              [id, id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  //verfier si l'utilisateur est le premier ou le second dans dans tout les amis
                  let friends = [];
                  for (let i = 0; i < result.length; i++) {
                    if (result[i].uuid_first === id) {
                      friends.push(result[i].uuid_second);
                    } else {
                      friends.push(result[i].uuid_first);
                    }
                  }
                  db.query(
                    "SELECT * FROM users WHERE uuid IN (?)",
                    [friends],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        let friends = [];
                        for (let i = 0; i < result.length; i++) {
                          friends.push({
                            pseudo: result[i].pseudo,
                            tag: result[i].tag,
                            uuid: result[i].uuid,
                            pictureprofile: result[i].pictureprofile,
                            status: result[i].status,
                          });
                        }
                        res.status(200).json(friends);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/online", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM friends WHERE uuid_first = ? OR uuid_second = ?",
              [id, id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  //verfier si l'utilisateur est le premier ou le second dans dans tout les amis
                  let friends = [];
                  for (let i = 0; i < result.length; i++) {
                    if (result[i].uuid_first === id) {
                      friends.push(result[i].uuid_second);
                    } else {
                      friends.push(result[i].uuid_first);
                    }
                  }
                  db.query(
                    "SELECT * FROM users WHERE uuid IN (?) AND status = ?",
                    [friends, "online"],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        let friends = [];
                        for (let i = 0; i < result.length; i++) {
                          friends.push({
                            pseudo: result[i].pseudo,
                            tag: result[i].tag,
                            uuid: result[i].uuid,
                            pictureprofile: result[i].pictureprofile,
                            status: result[i].status,
                          });
                        }
                        res.status(200).json(friends);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/request/waiting", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM friends_requests WHERE receiver = ?",
              [id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  if (result.length > 0) {
                    let friends = [];
                    for (let i = 0; i < result.length; i++) {
                      friends.push(result[i].sender);
                    }
                    db.query(
                      "SELECT * FROM users WHERE uuid IN (?)",
                      [friends],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          let friends = [];
                          for (let i = 0; i < result.length; i++) {
                            friends.push({
                              pseudo: result[i].pseudo,
                              tag: result[i].tag,
                              uuid: result[i].uuid,
                              pictureprofile: result[i].pictureprofile,
                              status: result[i].status,
                            });
                          }
                          res.status(200).json(friends);
                        }
                      }
                    );
                  } else {
                    res.status(200).json({ number: 0 });
                  }
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/accept", (req, res) => {
  let token = req.body.token;
  let uuid = req.body.uuid;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM friends_requests WHERE sender = ? AND receiver = ?",
              [uuid, id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  if (result.length > 0) {
                    db.query(
                      "INSERT INTO friends (uuid_first, uuid_second) VALUES (?, ?)",
                      [id, uuid],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          db.query(
                            "DELETE FROM friends_requests WHERE sender = ? AND receiver = ?",
                            [uuid, id],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                res.status(200).json({ message: "ok" });
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    res.status(300).json({ message: "Token invalide" });
                  }
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/request/blocked", (req, res) => {
  let token = req.body.token;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM blocked WHERE blocker = ?",
              [id],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  if (result.length > 0) {
                    let blocked = [];
                    for (let i = 0; i < result.length; i++) {
                      blocked.push(result[i].blocked);
                    }
                    db.query(
                      "SELECT * FROM users WHERE uuid IN (?)",
                      [blocked],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          let blocked = [];
                          for (let i = 0; i < result.length; i++) {
                            blocked.push({
                              pseudo: result[i].pseudo,
                              tag: result[i].tag,
                              uuid: result[i].uuid,
                              pictureprofile: result[i].pictureprofile,
                              status: result[i].status,
                            });
                          }
                          res.status(200).json(blocked);
                        }
                      }
                    );
                  } else {
                    res.status(200).json({ number: 0 });
                  }
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

app.post("/api/friends/request/send", (req, res) => {
  let token = req.body.token;
  let name = req.body.pseudo;
  let tag = req.body.tag;
  if (token) {
    let id = jwt.decode(token).id;
    db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
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
              "SELECT * FROM users WHERE pseudo = ? AND tag = ?",
              [name, tag],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  if (result.length > 0) {
                    let receiver = result[0].uuid;
                    db.query(
                      "SELECT * FROM friends_requests WHERE sender = ? AND receiver = ?",
                      [id, receiver],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          if (result.length > 0) {
                            res.status(300).json({
                              message: "Vous avez déjà envoyé une demande",
                            });
                          } else {
                            db.query(
                              "SELECT * FROM friends_requests WHERE sender = ? AND receiver = ?",
                              [receiver, id],
                              (err, result) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  if (result.length > 0) {
                                    res.status(300).json({
                                      message:
                                        "Vous avez déjà envoyé une demande",
                                    });
                                  } else {
                                    db.query(
                                      "SELECT * FROM friends WHERE uuid_first = ? AND uuid_second = ?",
                                      [id, receiver],
                                      (err, result) => {
                                        if (err) {
                                          console.log(err);
                                        } else {
                                          if (result.length > 0) {
                                            res.status(300).json({
                                              message: "Vous êtes déjà amis",
                                            });
                                          } else {
                                            db.query(
                                              "SELECT * FROM blocked WHERE blocker = ? AND blocked = ?",
                                              [id, receiver],
                                              (err, result) => {
                                                if (err) {
                                                  console.log(err);
                                                } else {
                                                  if (result.length > 0) {
                                                    res.status(300).json({
                                                      message:
                                                        "Vous avez bloqué cette personne",
                                                    });
                                                  } else {
                                                    db.query(
                                                      "SELECT * FROM blocked WHERE blocker = ? AND blocked = ?",
                                                      [receiver, id],
                                                      (err, result) => {
                                                        if (err) {
                                                          console.log(err);
                                                        } else {
                                                          if (
                                                            result.length > 0
                                                          ) {
                                                            res
                                                              .status(300)
                                                              .json({
                                                                message:
                                                                  "Cette personne vous a bloqué",
                                                              });
                                                          } else {
                                                            db.query(
                                                              "INSERT INTO friends_requests (sender, receiver) VALUES (?, ?)",
                                                              [id, receiver],
                                                              (err, result) => {
                                                                if (err) {
                                                                  console.log(
                                                                    err
                                                                  );
                                                                } else {
                                                                  res
                                                                    .status(200)
                                                                    .json({
                                                                      message:
                                                                        "Demande envoyée",
                                                                    });
                                                                }
                                                              }
                                                            );
                                                          }
                                                        }
                                                      }
                                                    );
                                                  }
                                                }
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  }
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  } else {
                    res
                      .status(300)
                      .json({ message: "Utilisateur introuvable" });
                  }
                }
              }
            );
          }
        });
      } else {
        res.status(300).json({ message: "Token invalide" });
      }
    });
  } else {
    res.status(300).json({ message: "Token invalide" });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("token", (token) => {
    if (token) {
      let id = jwt.decode(token).id;
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          let secret = result[0].secret;
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              console.log("Token invalide");
            } else {
              db.query(
                "UPDATE users SET status = ? WHERE uuid = ?",
                ["online", id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
              socket.id = id;
            }
          });
          socket.on("disconnect", () => {
            socket.broadcast.emit("callEnded");
            db.query(
              "UPDATE users SET status = ? WHERE uuid = ?",
              ["offline", id],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          });
        } else {
          console.log("Token invalide");
        }
      });
    }
  });

  socket.on("tokenlogout", (token) => {
    if (token) {
      let id = jwt.decode(token).id;
      db.query("SELECT * FROM users WHERE uuid = ?", [id], (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          let secret = result[0].secret;
          jwt.verify(token, secret, (err, decoded) => {
            if (err) {
              console.log("Token invalide");
            } else {
              db.query(
                "UPDATE users SET status = ? WHERE uuid = ?",
                ["offline", id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          });
        } else {
          console.log("Token invalide");
        }
      });
    }
  });

  socket.on("callUser", (data) => {
    socket.broadcast.emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
      to: data.userToCall,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted"), data.signal;
  });
});

server.listen(3001, () => {
  console.log("Server started on port 3001");
});
