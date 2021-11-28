import './themes/App.css';
import {theme} from "./themes/AppTheme";
import {ThemeProvider, Typography} from "@material-ui/core";
import MediaCard from "./components/MediaCard"
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Nav from './components/Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
	let name = "Hero Academy"
	let summary = "What would the world be like if 80 percent of the population " +
				  "manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would " +
				  "be battling it out everywhere! Becoming a hero would mean learning to use your power, but " +
				  "where would you go to study? U.A. High's Hero Program of course! But what would you do if " +
				  "you were one of the 20 percent who were born Quirkless?"
	let tags = ["anime ", "tv ", "show "]
	let genres = ["action", "drama"]
	let recReview = "Middle school student Izuku Midoriya wants to be a hero more than anything, but he " +
					"hasn't got an ounce of power in him. With no chance of ever getting into the prestigious " +
					"U.A. High School for budding heroes, his life is looking more and more like a dead end. " +
					"Then an encounter with All Might, the greatest hero of them all gives him a chance to " +
					"change his destiny…"
	let recRating = 6.9
	let comRating = 4.2

	return (
		<ThemeProvider theme={theme}>
			<Typography variant="h1" color="primary" light="true">Hello past Ninad, how are you?</Typography>
			{/* <MediaCard
				name={name}
				summary={summary}
				tags={tags}
				genres={genres}
				recReview={recReview}
				recRating={recRating}
				comRating={comRating}
			/> */}
			<Router>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/friends" element={<Friends />}/>
					<Route path="/notifications" element={<Notifications />}/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
