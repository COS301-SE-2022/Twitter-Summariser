const serverless = require("serverless-http");
const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();

app.use(fileUpload());
app.use(cors());

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://d23exbau77kw0b.cloudfront.net";

app.post("/extract-text", (req, res) => {
	if (!req.files && !req.files.pdfFile) {
		res.status(400);
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Methods", "*");
		res.setHeader("Access-Control-Allow-Headers", "*");
		res.setHeader("Access-Control-Allow-Origin", URL);
		res.send(JSON.stringify({ error: "No file uploaded" }));
		res.end();
	}

	pdfParse(req.files.pdfFile).then((result) => {
		res.status(200);
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Methods", "*");
		res.setHeader("Access-Control-Allow-Headers", "*");
		res.setHeader("Access-Control-Allow-Origin", URL);
		res.send(result.text);
	});
});

if (process.env.NODE_ENV !== "development") {
	app.listen(5000)
}

module.exports.handler = serverless(app);