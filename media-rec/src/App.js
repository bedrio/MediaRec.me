import "./themes/App.css";
import {theme} from "./themes/AppTheme";
import {ThemeProvider} from "@material-ui/core";
import Authentication from "./pages/Authentication";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import Dashboard from "./pages/Dashboard";


function App() {
	const [cookies, setCookie] = useCookies();
	const [authStatus, setAuthStatus] = useState(false);

	useEffect(() => {
		setAuthStatus(cookies.email != null)
	}, []);

	useEffect(() => {
		setAuthStatus(cookies.email != null)
	}, [cookies]);

	return (
		<ThemeProvider theme={theme}>
			{authStatus ? <Dashboard/> : <Authentication/>}
		</ThemeProvider>
	);
}

export default App;
