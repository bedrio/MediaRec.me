import {React} from "react";
import {Card, Grid, makeStyles, Typography} from "@material-ui/core";
import {theme} from "../themes/AppTheme";
import Box from '@mui/material/Box';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
})


/**
 * @param props.name: name of media
 * @param props.summary: summary of the media
 * @param props.tags: list of media tags
 * @param props.recReview: the recommender's review
 * @param props.recRating: the recommender's rating
 * @param props.comRating: The community rating
 * @param props.category: What tab the media is in
 */
function RecMediaCard(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card style={{background: "#1B1E28", padding: theme.spacing(2), borderRadius: "20px"}}>
				<Grid container spacing={3} justify="space-between">
					<Grid item xl={8} style={{marginTop: "10px"}}>
						<Grid container alignItems="center">
							<Typography variant="h2"
							            style={{fontSize: "larger", fontWeight: 500}}
							            color="secondary"
							            gutterBottom>
								{props.name}
							</Typography>
							<Typography color="secondary" style={{padding: "0px 5px"}} gutterBottom>&#183;</Typography>
							<Typography variant="h5"
							            style={{fontSize: "small", fontWeight: 500}}
							            color="secondary"
							            gutterBottom>
								{props.tags.map((tag) => {
									return tag + " "
								})}
							</Typography>
						</Grid>
						<Typography variant="p" style={{fontSize: "smaller"}} color="secondary">
							{props.summary}
						</Typography>
						<Box style={{marginTop: "50px"}}>
							<Typography style={{fontSize: "medium", fontWeight: 500}} color="secondary"
							            gutterBottom>
								recommender's review
							</Typography>
							<Typography variant="p" style={{fontSize: "smaller"}} color="secondary" gutterBottom>
								{props.recReview}
							</Typography>
						</Box>
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
					<Grid item justify="flex-end"></Grid>
				</Grid>
			</Card>
		</div>
	);
}

export default RecMediaCard;
