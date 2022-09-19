const serverless = require("serverless-http");
const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();

app.use(fileUpload());
app.use(cors());

app.post("/extract-text", (req, res) => {
	if (!req.files && !req.files.pdfFile) {
		res.status(400);
		res.end();
	}

	pdfParse(req.files.pdfFile).then((result) => {
		res.send(result.text);
	});
});

module.exports.handler = serverless(app);