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


/**
 * 
 * @param props.name: name of media
 * @param props.summary: summary of the media
 * @param props.tags: list of media tags
 * @param props.genres: list of media genres
 * @param props.recReview: the recommender's review
 * @param props.recRating: the recommender's rating
 * @param props.comRating: The community rating
 */
function MediaCard(props) {
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
								{}
							</Typography>
							<Typography color="secondary" style={{padding: "0px 5px"}} gutterBottom>&#183;</Typography>
							<Typography variant="h5"
							            style={{fontSize: "small", fontWeight: 500}}
							            color="secondary"
							            gutterBottom>
								{props.tags}
							</Typography>
						</Grid>
						<Typography variant="p" style={{fontSize: "smaller"}} color="secondary">
							{props.summary}
						</Typography>
						<Grid container spacing={1} style={{marginTop: "10px"}}>
							{props.genres.map((genre) => 
								<Grid item>
									<Paper elevation={0} className={classes.genrePill}>
										{genre}
									</Paper>
								</Grid>
							)}
						</Grid>
						<Collapse in={expanded} timeout={"auto"} unmountOnExit style={{marginTop: "50px"}}>
							<Typography style={{fontSize: "medium", fontWeight: 500}} color="secondary"
							            gutterBottom>
								recommender's review
							</Typography>
							<Typography variant="p" style={{fontSize: "smaller"}} color="secondary" gutterBottom>
								{props.recReview}
							</Typography>
						</Collapse>
					</Grid>
					<Grid item style={{textAlign: "center", marginTop: "10px"}}>
						<Typography style={{fontSize: "smaller", fontWeight: 500}}
						            color="secondary">
							recommender's<br/>rating
						</Typography>
						<Typography
							style={{fontSize: "xxx-large", fontWeight: 700, color: "#00BFA5"}}>{props.recRating}</Typography>
					</Grid>
					<Grid item style={{textAlign: "center", marginTop: "10px"}}>
						<Typography style={{fontSize: "smaller", fontWeight: 500}}
						            color="secondary">
							community<br/>rating
						</Typography>
						<Typography
							style={{fontSize: "xxx-large", fontWeight: 700, color: "#FF9800"}}>{props.comRating}</Typography>
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
