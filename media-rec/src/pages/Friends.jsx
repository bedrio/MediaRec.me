// import { } from '@material-ui/core'
import { Avatar, Button, Grid, IconButton, List, ListItemAvatar, ListItemText, Typography, ListItem, Fab } from '@mui/material';
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useCookies } from "react-cookie";

function Friends() {
    const [cookies, setCookie] = useCookies(["email", "name"]);

    async function getUserFriends() {
        const response = await fetch(`http://localhost:3001/auth/${cookies.email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (data.length == 0) {
            alert("No such user found. Try again!");
        } else {
            console.log(cookies.email);
            console.log(data[0].friends);
            return data[0].friends;
        }
    }

    const [friends, setFriends] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const userFriends = getUserFriends();
        console.log(typeof userFriends);
        setFriends([...friends, userFriends]);
    }, []);

    async function addFriendsToDB() {
        let bdy = friends.toString()

        const response = await fetch(`http://localhost:3001/auth/edit/${cookies.email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bdy })
        });

        const data = await response.json();
        console.log(data);

        if (data.name == "error") {
            alert(data.detail);
        } else {
            alert("added successfully!")
        }
    }

    return (
        <>
            <h1>My Friends ({friends.length})</h1>
            <div style={{ width: "25%" }}>
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
                                    <Avatar sx={{ bgcolor: "#2F45C5" }}>
                                        <PersonIcon sx={{ color: "#CBE0F2" }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={friend.name}
                                    secondary={friend.email}
                                />
                            </ListItem>
                        ))
                    }
                </List>

                <div>
                    <TextField label="Friend's Email" type="email" variant="outlined" color="secondary" margin="normal" fullWidth
                        onBlur={(event) => {
                            if (event.target.value === "") {
                                setEmail("");
                            } else {
                                setEmail(event.target.value);
                            }
                        }} />
                    <Fab variant="extended" color="primary" onClick={() => {
                        const tempArr = friends;
                        tempArr.push(email);
                        setFriends([...friends, tempArr]);
                        addFriendsToDB()
                    }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add Friend
                    </Fab>
                </div>
            </div>
        </>
    )
}

export default Friends
