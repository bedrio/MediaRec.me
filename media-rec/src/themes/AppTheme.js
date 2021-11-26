import {createMuiTheme} from "@material-ui/core";

/*
* Background 00dp: #161923
* Surface 01dp: #1B1E28
* Surface 02dp: #20232D
* Primary: #2F45C5
* Secondary: #CBE0F2
* Accent: #FD7279
*
* TODO: figure out a way to create global colors that anyone can access anywhere
*/

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2F45C5"
		},
		secondary: {
			main: "#CBE0F2"
		}
	},
	typography: {
		fontFamily: 'Rubik',
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700
	}
});
