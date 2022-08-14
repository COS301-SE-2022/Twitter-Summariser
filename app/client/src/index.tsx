import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
);
// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
