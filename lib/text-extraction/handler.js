const serverless = require("serverless-http");
const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const app = express();

app.use(fileUpload());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/extract-text", (req, res) => {
    console.log(req);
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
});

module.exports.handler = serverless(app);