// import { } from '@material-ui/core'
import { Avatar, Button, Grid, IconButton, List, ListItemAvatar, ListItemText, Typography, ListItem } from '@mui/material';
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

function Friends() {
    const [friends, setFriends] = useState([{ "email": "bruh", "name": "yo" }, { "email": "bruh", "name": "yo" }, { "email": "bruh", "name": "yo" }]);

    return (
        <>
            <h1>My Friends</h1>
            <div style={{ width: "25%" }}>
                <List>
                    {
                        friends.map(friend => (
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
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
            </div>
        </>
    )
}

export default Friends
