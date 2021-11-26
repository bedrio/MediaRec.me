import './themes/App.css';
import {theme} from "./themes/AppTheme";
import {ThemeProvider, Typography} from "@material-ui/core";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Typography variant="h1" color="primary" light="true">Hello from Ninad</Typography>
		</ThemeProvider>
	);
}

export default App;
