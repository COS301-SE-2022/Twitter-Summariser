/*
	This file is responsible for rendering the application.
*/

// import ReactDOM from "react-dom" to render the application to the DOM.
import ReactDOM from "react-dom/client";

// import the css file for the application to apply the styles to the application.
import "./index.css";

// import BrowserRouter, Routes and Route from the react-router-dom library to indicate the use of routing across different page components in the application.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import App  component that is the root component of the application.
import App from "./App";

// import everything from serviceWorker folder to register the service worker for the application.
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// import reportWebVitals for the application to measure the performance of the application.
import reportWebVitals from "./reportWebVitals";

// import AuthProvider to act as the authentication provider for the application.
import { AuthProvider } from "./context/AuthProvider";

// create root element for the application to render the application to the DOM.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// render the application to the DOM through root component App.
root.render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
);

// register the service worker for the application.
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
