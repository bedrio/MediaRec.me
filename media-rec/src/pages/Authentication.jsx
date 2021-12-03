import "../themes/Auth.css";
import {
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";

function Authentication() {
	const [cookies, setCookie] = useCookies();

	// initially show signup
	const [showSignup, setShowSignup] = useState(true);

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(false);

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);

	const [selectedColor, setSelectedColor] = useState("Red");

	async function signup() {
		const response = await fetch("http://localhost:3001/auth", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({"name": name, "email": email, "color": selectedColor})
		});

		const data = await response.json();
		console.log(data);

		if (data.name === "error") {
			alert(data.detail);
		} else {
			setCookie('email', email, {path: "/"})
			setCookie('name', name, {path: "/"})
			setCookie('color', selectedColor, {path: "/"})
		}
	}

	async function login() {
		const response = await fetch(`http://localhost:3001/auth/${email}`, {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		});

		const data = await response.json();

		if (data.length === 0) {
			alert("No such user found. Try again!");
		} else {
			setCookie('email', data[0].email, {path: "/"})
			setCookie('name', data[0].name, {path: "/"})
			setCookie('color', data[0].profile_pic, {path: "/"})
		}
	}

	return (
		<Container style={{height: "100vh"}}>
			<Grid container alignItems={"center"} justifyContent={"center"} spacing={5} style={{paddingTop: "15%"}}>
				<Grid item md={5}>
					<Typography variant="h1" color="secondary" style={{fontWeight: "700", fontSize: "xx-large"}}
					            gutterBottom>
						Welcome to MediaRec.me
					</Typography>
					<Typography variant="p" color="secondary">
						Recommend anime, movies, music and more!
					</Typography>
				</Grid>
				<Grid item md={7}>
					<Paper style={{backgroundColor: "#2F45C5", padding: 50, borderRadius: 25}}>
						<Typography variant="h2" color="secondary" style={{fontWeight: "700", fontSize: "xx-large"}}>
							{showSignup ? "Sign Up" : "Log In"}
						</Typography>
						<br/>
						{
							showSignup ?
								<>
									<TextField label="Full Name" error={nameError} type="text" variant="outlined"
									           color="secondary" margin="normal" fullWidth
									           onBlur={(event) => {
										           if (event.target.value === "") {
											           setNameError(true);
											           setName("");
										           } else {
											           setNameError(false);
											           setName(event.target.value);
										           }
									           }}/>
									<TextField label="Email Address" error={emailError} type="email" variant="outlined"
									           color="secondary" margin="normal" fullWidth
									           onBlur={(event) => {
										           if (event.target.value === "") {
											           setEmailError(true);
											           setEmail("");
										           } else {
											           setEmailError(false);
											           setEmail(event.target.value);
										           }
									           }}/>
									<div style={{marginTop: 20}}>
										<FormControl component="fieldset">
											<FormLabel component="legend">Pick a profile pic color</FormLabel>
											<RadioGroup row name="row-radio-buttons-group"
											            onChange={(event, value) => {
												            setSelectedColor(value);
											            }}>
												<FormControlLabel value="Red" control={<Radio/>} label="Red"
												                  checked={selectedColor === "Red"}/>
												<FormControlLabel value="Blue" control={<Radio/>} label="Blue"/>
												<FormControlLabel value="Green" control={<Radio/>} label="Green"/>
												<FormControlLabel value="Yellow" control={<Radio/>} label="Yellow"/>
												<FormControlLabel value="Orange" control={<Radio/>} label="Orange"/>
											</RadioGroup>
										</FormControl>
									</div>
								</>
								:
								<>
									<TextField label="Email Address" error={emailError} type="email" variant="outlined"
									           color="secondary" margin="normal" fullWidth
									           onBlur={(event) => {
										           if (event.target.value === "") {
											           setEmailError(true);
											           setEmail("");
										           } else {
											           setEmailError(false);
											           setEmail(event.target.value);
										           }
									           }}/>
								</>
						}
						<Button variant="contained" color="secondary" size="large"
						        style={{color: "#2F45C5", width: "100%", marginTop: 15}} disableElevation
						        onClick={() => {
							        showSignup ? signup() : login()
						        }}>
							{showSignup ? "Sign Up" : "Log In"}
						</Button>
						<Button color="secondary" style={{marginTop: 15}} onClick={() => {
							setShowSignup(!showSignup);
							setNameError(false);
							setEmailError(false);
						}}>
							{
								showSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
							}
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Authentication