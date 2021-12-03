// import "../themes/Auth.css";
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Authentication() {
	const [cookies, setCookie] = useCookies(["email", "name"]);
	const navigate = useNavigate();

	const [newUserFormDisplay, setNewUserFormDisplay] = useState(true);
	const [authType, setAuthType] = useState("Sign Up");

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(false);

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);

	async function signup() {
		const response = await fetch("http://localhost:3001/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email })
		});

		const data = await response.json();
		console.log(data);

		if (data.name == "error") {
			alert(data.detail);
		} else {
			setCookie('email', email, { path: "/" })
			setCookie('name', name, { path: "/" })
			navigate('/');
		}
	}

	async function login() {
		// TODO: write a query that checks if a email/password combination works
		const response = await fetch("http://localhost:3001/auth", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});

		const data = await response.json();
		console.log(data);

		if (data.name == "error") {
			alert(data.detail);
		} else {
			setCookie('email', email, { path: "/" })
			setCookie('name', name, { path: "/" })
			navigate('/');
		}
	}

	return (
		<Container style={{ height: "100vh" }}>
			<Grid container alignItems={"center"} justifyContent={"center"} spacing={5} style={{ paddingTop: "15%" }}>
				<Grid item md={5}>
					<Typography variant="h1" color="secondary" style={{ fontWeight: "700", fontSize: "xx-large" }} gutterBottom>
						Welcome to MediaRec.me
					</Typography>
					<Typography variant="p" color="secondary">
						Lorem ninja ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut ninja wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit ninja lobortis nisl ut aliquip ex ea commodo consequat.
					</Typography>
				</Grid>
				<Grid item md={7}>
					<Paper style={{ backgroundColor: "#2F45C5", padding: 50, borderRadius: 25 }}>
						<Typography variant="h2" color="secondary" style={{ fontWeight: "700", fontSize: "xx-large" }}>
							{newUserFormDisplay ? "Sign Up" : "Log In"}
						</Typography>
						<br />
						{
							newUserFormDisplay ?
								<>
									<TextField label="Full Name" error={nameError} type="text" variant="outlined" color="secondary" margin="normal" fullWidth
										onBlur={(event) => {
											if (event.target.value === "") {
												setNameError(true);
												setName("");
											} else {
												setNameError(false);
												setName(event.target.value);
											}
										}} />
									<TextField label="Email Address" error={emailError} type="email" variant="outlined" color="secondary" margin="normal" fullWidth
										onBlur={(event) => {
											if (event.target.value === "") {
												setEmailError(true);
												setEmail("");
											} else {
												setEmailError(false);
												setEmail(event.target.value);
											}
										}} />
									<TextField label="Password" error={passwordError} type="password" variant="outlined" color="secondary" margin="normal" fullWidth
										onBlur={(event) => {
											if (event.target.value === "") {
												setPasswordError(true);
												setPassword("");
											} else {
												setPasswordError(false);
												setPassword(event.target.value);
											}
										}} />

									<Avatar sx={{ bgcolor: deepOrange[500] }}>
										A
									</Avatar>
								</>
								:
								<>
									<TextField label="Email Address" error={emailError} type="email" variant="outlined" color="secondary" margin="normal" fullWidth
										onBlur={(event) => {
											if (event.target.value === "") {
												setEmailError(true);
												setEmail("");
											} else {
												setEmailError(false);
												setEmail(event.target.value);
											}
										}} />
									<TextField label="Password" error={passwordError} type="password" variant="outlined" color="secondary" margin="normal" fullWidth
										onBlur={(event) => {
											if (event.target.value === "") {
												setPasswordError(true);
												setPassword("");
											} else {
												setPasswordError(false);
												setPassword(event.target.value);
											}
										}} />
								</>
						}
						<Button variant="contained" color="secondary" size="large" style={{ color: "#2F45C5", width: "100%", marginTop: 15 }} disableElevation
							onClick={() => { newUserFormDisplay ? signup() : login() }}>
							{newUserFormDisplay ? "Sign Up" : "Log In"}
						</Button>
						<Button color="secondary" style={{ marginTop: 15 }} onClick={() => {
							setNewUserFormDisplay(!newUserFormDisplay);
							setNameError(false);
							setEmailError(false);
							setPasswordError(false);
						}}>
							{
								newUserFormDisplay ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
							}
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Authentication