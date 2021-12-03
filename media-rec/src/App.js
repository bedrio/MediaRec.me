import "./themes/App.css";
import { theme } from "./themes/AppTheme";
import { ThemeProvider, Typography } from "@material-ui/core";
import Friends from "./pages/Friends";
import WatchList from "./pages/WatchList";
import Notifications from "./pages/Notifications";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useCookies } from "react-cookie";


function App() {
	const [cookies, setCookie] = useCookies(["user"]);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Nav>
					<Routes>
						<Route path="/" element={<WatchList />} />
						<Route path="/auth" element={<Authentication />} />
						<Route path="/friends" element={<Friends />} />
						<Route path="/notifications" element={<Notifications />} />
					</Routes>
				</Nav>
			</Router>
		</ThemeProvider>
	);
}

export default App;
