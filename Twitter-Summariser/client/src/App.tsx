import { Routes, Route } from "react-router-dom";
import RequiredAuth from "./auth/RequiredAuth";
import Layout from "./pages/Layout";
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
import GenReport from "./components/GenReport";
import GetPublishedReport from "./components/GetPublishedReport";
import ViewHistory from "./components/ViewHistory";
import Splash from "./components/Splash";
import PersistLogin from "./components/PersistLogin";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="splash" element={<Splash />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route element={<PersistLogin />}>
					<Route element={<RequiredAuth />}>
						<Route path="/" element={<Landing />}>
							<Route path="/" element={<Home />} />
							<Route path="explore" element={<Explore />} />
							<Route path="reports" element={<Reports />} />
							<Route path="drafts" element={<Drafts />} />
							<Route path="shared" element={<Shared />} />
							<Route path="profile" element={<Profile />} />
							<Route path="genReport" element={<GenReport />} />
							<Route path="getPublishedReport" element={<GetPublishedReport />} />
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
