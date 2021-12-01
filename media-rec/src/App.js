import './themes/App.css';
import {theme} from "./themes/AppTheme";
import {ThemeProvider, Typography} from "@material-ui/core";
import MediaCard from "./components/MediaCard"
import RecMediaCard from "./components/RecMediaCard"
import Friends from "./pages/Friends";
import WatchList from "./pages/WatchList";
import Notifications from "./pages/Notifications";
import Nav from './components/Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
	return (
		<ThemeProvider theme={theme} >
			<Router>
				<Nav>
					<Routes>
						<Route path="/" element={<WatchList />}/>
						<Route path="/friends" element={<Friends />}/>
						<Route path="/notifications" element={<Notifications />}/>
					</Routes>
				</Nav>
			</Router>
		</ThemeProvider>
	);
}

export default App;
