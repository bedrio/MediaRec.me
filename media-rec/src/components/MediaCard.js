import {React, useState} from "react";
import {Card, CardActions, Collapse, Grid, IconButton, makeStyles, Paper, Typography} from "@material-ui/core";
import {theme} from "../themes/AppTheme";
import {ExpandMore} from "@material-ui/icons";
import clsx from "clsx"

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	genrePill: {
		width: "max-content",
		padding: "5px 12px",
		borderRadius: "100px",
		backgroundColor: "#CBE0F2",
		color: "#2F45C5",
		fontWeight: 500,
		fontSize: "smaller"
	}
})

function MediaCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={classes.root}>
			<Card style={{background: "#1B1E28", padding: theme.spacing(2), borderRadius: "20px"}}>
				<Grid container spacing={3} justify="space-between">
					<Grid item>
						<img style={{borderRadius: "10px", maxWidth: "150px", display: "block"}}
						     src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21459-oZMZ7JwS5Sxq.jpg"
						     alt=""/>
					</Grid>
					<Grid item xl={8} style={{marginTop: "10px"}}>
						<Grid container alignItems="center">
							<Typography variant="h2"
							            style={{fontSize: "larger", fontWeight: 500}}
							            color="secondary"
							            gutterBottom>
								Boku No Hero Academia
							</Typography>
							<Typography color="secondary" style={{padding: "0px 5px"}} gutterBottom>&#183;</Typography>
							<Typography variant="h5"
							            style={{fontSize: "small", fontWeight: 500}}
							            color="secondary"
							            gutterBottom>
								anime tv show
							</Typography>
						</Grid>
						<Typography variant="p" style={{fontSize: "smaller"}} color="secondary">
							What would the world be like if 80 percent of the population
							manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would
							be battling it out everywhere! Becoming a hero would mean learning to use your power, but
							where would you go to study? U.A. High's Hero Program of course! But what would you do if
							you were one of the 20 percent who were born Quirkless?</Typography>
						<Grid container spacing={1} style={{marginTop: "10px"}}>
							<Grid item>
								<Paper elevation={0} className={classes.genrePill}>
									action
								</Paper>
							</Grid>
							<Grid item>
								<Paper elevation={0} className={classes.genrePill}>
									drama
								</Paper>
							</Grid>
						</Grid>
						<Collapse in={expanded} timeout={"auto"} unmountOnExit style={{marginTop: "50px"}}>
							<Typography style={{fontSize: "medium", fontWeight: 500}} color="secondary"
							            gutterBottom>
								recommender's review
							</Typography>
							<Typography variant="p" style={{fontSize: "smaller"}} color="secondary" gutterBottom>
								Middle school student Izuku Midoriya wants to be a hero more than anything, but he
								hasn't got an ounce of power in him. With no chance of ever getting into the prestigious
								U.A. High School for budding heroes, his life is looking more and more like a dead end.
								Then an encounter with All Might, the greatest hero of them all gives him a chance to
								change his destiny…
							</Typography>
						</Collapse>
					</Grid>
					<Grid item style={{textAlign: "center", marginTop: "10px"}}>
						<Typography style={{fontSize: "smaller", fontWeight: 500}}
						            color="secondary">
							recommender's<br/>rating
						</Typography>
						<Typography
							style={{fontSize: "xxx-large", fontWeight: 700, color: "#00BFA5"}}>6.9</Typography>
					</Grid>
					<Grid item style={{textAlign: "center", marginTop: "10px"}}>
						<Typography style={{fontSize: "smaller", fontWeight: 500}}
						            color="secondary">
							community<br/>rating
						</Typography>
						<Typography
							style={{fontSize: "xxx-large", fontWeight: 700, color: "#FF9800"}}>4.2</Typography>
					</Grid>
					<Grid item justify="flex-end">
						<CardActions>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}>
								<ExpandMore color="secondary" style={{fontSize: "xxx-large", margin: "auto"}}/>
							</IconButton>
						</CardActions>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}

export default MediaCard;
