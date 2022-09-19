/*
This file consists of the App component, which is the root component of the application.
*/

// import the react-router-dom library to use the Route component across the application for routing across various page components.
import { Routes, Route } from "react-router-dom";

// import the RequiredAuth component from the context folder to indicate that the user must be authenticated to access certain page components.
import RequiredAuth from "./auth/RequiredAuth";

// import the Layout component from the layout folder to use the Layout component across the application
import Layout from "./pages/Layout";

// import all the pages and components that are used across the application
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Reports from "./components/Reports";
import Drafts from "./components/Drafts";
import Shared from "./components/Shared";
import History from "./components/History";
import Profile from "./components/Profile";
// import DraftReport from "./components/DraftReport";
import Report from "./components/Report";
import ViewHistory from "./components/ViewHistory";
import Splash from "./components/Splash";
import PersistLogin from "./components/PersistLogin";
import TextSummariser from "./components/TextSummariser";
import Something from "./components/Something";

/*
	App component that is the root component of the application.
	- This component is the parent component of the entire application.
	- This component defines the main pages and the various components that are used rendered within these pages based on the pathname of the current page URL.
*/

function App() {
	return (
		// use the Routes component to render the different page routes of the application based on the pathname of the URL.
		<Routes>
			{/* Default route that renders Layout component that all pages are rendered on  */}
			<Route path="/" element={<Layout />}>
				{/* The three page (3) routes that can be accessed without a user being authenticated  */}
				<Route path="splash" element={<Splash />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				{/* The persistent login component that ensures user can only access the above pages until they have been validated as a valid user */}
				<Route element={<PersistLogin />}>
					{/* The RequiredAuth component which renders the pages that require users to be properly authenticated before accessing certain components */}
					<Route element={<RequiredAuth />}>
						{/* List of component Routes that can be accessed by valid authenticated users */}
						{/* Container component for all subsystem components available to users using the application */}
						<Route path="/" element={<Landing />}>
							<Route path="/" element={<Home />} />
							<Route path="explore" element={<Explore />} />
							<Route path="something" element={<Something />} />
							<Route path="reports" element={<Reports />} />
							<Route path="drafts" element={<Drafts />} />
							<Route path="shared" element={<Shared />} />
							<Route path="profile" element={<Profile />} />
							<Route path="summariser" element={<TextSummariser />} />
							{/* <Route path="draftReport/*" element={<DraftReport />} /> */}
							<Route path="report/*" element={<Report />} />
							<Route path="history" element={<History />} />
							<Route path="viewHistory" element={<ViewHistory />} />
						</Route>
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
