import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState, useRef } from 'react'
import pool from '../db';

function Authentication() {
	const [newUserFormDisplay, setNewUserFormDisplay] = useState(true);
	const [authType, setAuthType] = useState("Sign Up");

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState(false);

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);

	function signup() {
		// pool.query("SELECT * FROM USERS;");
	}

	function login() {

	}

	return (
		<Container style={{ padding: "5%" }}>
			<Grid container alignItems="center" spacing={5}>
				<Grid item md={6}>
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
				<Grid item md={6}>
					<Typography variant="h1" color="secondary" style={{ fontWeight: "700", fontSize: "xx-large" }}>
						Welcome to MediaRec.me
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Authentication