import {
	Avatar,
	IconButton,
	List,
	ListItemAvatar,
	ListItemText,
	Typography,
	ListItem,
	Fab
} from '@mui/material';
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import {useState, useEffect} from 'react';
import {TextField} from '@material-ui/core';
import {useCookies} from "react-cookie";

function Friends() {
	const [cookies, setCookie] = useCookies();
	const [friends, setFriends] = useState([]);

	async function getUserFriends() {
		const response = await fetch(`http://localhost:3001/auth/${cookies.email}`, {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		});

		const data = await response.json();

		if (data.length === 0) {
			alert("No such user found. Try again!");
		} else {
			return data[0].friends;
		}
	}

	const [email, setEmail] = useState("");
	const [triggerUseEffect, setTriggerUseEffect] = useState(false);

	useEffect(async () => {
		setFriends(await getUserFriends());
	}, []);

	useEffect(() => {
		if (triggerUseEffect)
			addFriendsToDB()
	}, [triggerUseEffect]);

	async function addFriendsToDB() {
		const response = await fetch(`http://localhost:3001/auth/edit/${cookies.email}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({friends})
		});

		const data = await response.json();
		console.log(data);

		if (data.name === "error") {
			alert("Sorry, something went wrong with adding. Please try again!");
		} else {
			alert("Friend added successfully!")
		}

		setTriggerUseEffect(false)
	}

	return (
		<>
			<Typography variant={"h1"} fontSize={"xxx-large"} fontWeight={700} color={"#CBE0F2"}>
				My Friends ({friends.length - 1})
			</Typography>
			<div style={{width: "25%"}}>
				<List>
					{
						friends.map(friend => (
							<ListItem
								secondaryAction={
									<IconButton edge="end" aria-label="delete">
										{/* <DeleteIcon sx={{ color: "#FD7279" }} /> */}
									</IconButton>
								}
							>
								<ListItemAvatar>
									<Avatar sx={{bgcolor: "#2F45C5"}}>
										<PersonIcon sx={{color: "#CBE0F2"}}/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									sx={{color: "#CBE0F2"}}
									primary={friend}
									// secondary={friend.email}
								/>
							</ListItem>
						))
					}
				</List>

				<div>
					<TextField label="Friend's Email" type="email" variant="outlined" color="secondary" margin="normal"
					           fullWidth
					           onBlur={(event) => {
						           if (event.target.value === "") {
							           setEmail("");
						           } else {
							           setEmail(event.target.value);
						           }
					           }}/>
					<Fab variant="extended" sx={{bgcolor: "#2F45C5", color: "#CBE0F2"}} onClick={() => {
						setFriends([...friends, email])
						setTriggerUseEffect(true);
					}}>
						<AddIcon sx={{mr: 1}}/>
						Add Friend
					</Fab>
				</div>
			</div>
		</>
	)
}

export default Friends
