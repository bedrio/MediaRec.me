import React, {useState} from 'react';
import {Button, Grid, Paper, Stack, Typography} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLayerGroup, faBell, faUserFriends, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import Friends from "./Friends";
import {useCookies} from "react-cookie";
import WatchList from "./WatchList";

function Dashboard() {
	const [cookies, setCookie, removeCookie] = useCookies();
	const [pageSelected, setPageSelected] = useState("Watchlist");

	function renderPage() {
		switch (pageSelected) {
			case "Watchlist":
				return <WatchList/>
			case "Friends":
				return <Friends/>
			case "Notifications":
				return <>Notifications</>
		}
	}

	return (
		<Grid container>
			<Grid item xl={2} md={3}>
				<Paper elevation={3} sx={{
					bgcolor: "#1B1E28",
					borderTopRightRadius: 30,
					borderBottomRightRadius: 30,
					height: "100vh"
				}}>
					<Stack spacing={2} sx={{padding: 5}}>
						<Typography color={"#CBE0F2"} fontSize={"large"} fontWeight={"700"}>Welcome
							back, <br/> {cookies.name}</Typography>
						<Button variant={"contained"}
						        sx={{
							        color: "#CBE0F2",
							        padding: 2.5,
							        bgcolor: `${pageSelected === "Watchlist" ? "#2F45C5" : "#20232D"}`
						        }}
						        size={"large"}
						        startIcon={<FontAwesomeIcon icon={faLayerGroup}/>}
						        onClick={() => setPageSelected("Watchlist")}>
							Watchlist
						</Button>
						<Button variant={"contained"}
						        sx={{
							        color: "#CBE0F2",
							        padding: 2.5,
							        bgcolor: `${pageSelected === "Friends" ? "#2F45C5" : "#20232D"}`
						        }}
						        size={"large"}
						        startIcon={<FontAwesomeIcon icon={faUserFriends}/>}
						        onClick={() => setPageSelected("Friends")}>
							Friends
						</Button>
						{/*<Button variant={"contained"}*/}
						{/*        sx={{*/}
						{/*	        color: "#CBE0F2",*/}
						{/*	        padding: 2.5,*/}
						{/*	        bgcolor: `${pageSelected === "Notifications" ? "#2F45C5" : "#20232D"}`*/}
						{/*        }}*/}
						{/*        size={"large"}*/}
						{/*        startIcon={<FontAwesomeIcon icon={faBell}/>}*/}
						{/*        onClick={() => setPageSelected("Notifications")}>*/}
						{/*	Notifications*/}
						{/*</Button>*/}
					</Stack>
					<div style={{textAlign: "center"}}>
						<Button sx={{color: "#f44336"}} startIcon={<FontAwesomeIcon icon={faPowerOff}/>}
						        onClick={() => {
							        removeCookie("email");
							        removeCookie("name");
							        removeCookie("color");
						        }}>
							Log out
						</Button>
					</div>
				</Paper>
			</Grid>
			<Grid item xl={10} md={9}>
				<div style={{padding: 50}}>
					{
						renderPage()
					}
				</div>
			</Grid>
		</Grid>
	);
}

export default Dashboard;