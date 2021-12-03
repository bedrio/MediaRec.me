import { React, useState } from 'react'
import {Card, Grid, makeStyles, Typography} from "@material-ui/core";
import {theme} from "../themes/AppTheme";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
})


/**
 * @param props.showID: ID of media
 * @param props.name: name of media
 * @param props.summary: summary of the media
 * @param props.tags: list of media tags
 * @param props.comRating: The community rating
 * @param props.category: What tab the media is in
 * @param props.updateMedia: function to call when updating
 * @param props.deleteMedia: function to call when deleting
 */
function MediaCard(props) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	const initialValues = {
		"name": props.name,
		"summary": props.summary,
		"tags": props.tags,
		"comRating": props.comRating,
		"recRating": props.recRating,
		"recReview": props.recReview,
	};
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({
	"name": false,
	"summary": false,
	"tags": false,
	"comRating": false,
	});
	
	const validate = (fieldValues = values) => {
	let temp = { ...errors }
	if ('name' in fieldValues)
		temp.name = !(fieldValues.name.length > 0)
	if ('summary' in fieldValues)
		temp.summary = !(fieldValues.summary.length > 0)
	if ('tags' in fieldValues)
		temp.tags = !(fieldValues.tags.length > 0)
	if ('comRating' in fieldValues){
		temp.comRating = !(fieldValues.comRating.toString().length > 0)
	}
	
	setErrors({...temp})
	if (fieldValues == values)
		return Object.values(temp).every(x => x == "")
	}
	
	const handleInputChange = (e) => {
		const id = e.target.id
		let value = e.target.value

		//prevents writing string to avg rating
		if(id === "comRating") {
			value = e.target.valueAsNumber
		}

		//rating can't exceed 3 digits, so you can't have a long decimal
		if(id === "comRating" && e.target.value.length > 3) {
			value = values["comRating"]
		}

		//value of rating must be between 0 and 10
		if(id === "comRating" && (e.target.valueAsNumber > 10 || e.target.valueAsNumber < 0)) {
			value = values["comRating"] 
		}

		setValues({
			...values,
			[id]: value
		})
	}
	
	const resetForm = () => {
		setValues(initialValues);
		setErrors({})
	}
	

	const [category, setCategory] = useState(props.category);
	const categories = [
	{
		value: 'Current',
		label: 'Current',
	},
	{
		value: 'Next',
		label: 'Next',
	},
	{
		value: 'Planning',
		label: 'Planning',
	}
	];

	const handleCategory = (event) => {
	setCategory(event.target.value);
	};

	return (
		<>
		<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Media</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                autoFocus
                required
                margin="none"
                value={values.name}
                error={errors.name}
                onChange={handleInputChange}
                id="name"
                label="Name"
                type="text"
                variant="standard"
              />
              <TextField
                margin="none"
                required
                value={values.summary}
                error={errors.summary}
                onChange={handleInputChange}
                id="summary"
                label="Summary"
                type="text"
                multiline={true}
                variant="standard"
              />
            </div>
            <div>
              <TextField
                margin="none"
                required
                value={values.tags}
                error={errors.tags}
                onChange={handleInputChange}
                placeholder="anime action etc."
                id="tags"
                label="Tags"
                type="text"
                variant="standard"
              />
              <TextField
                margin="none"
                required
                value={values.comRating}
                error={errors.comRating}
                onChange={handleInputChange}
                helperText="decimal between 0 and 10"
                id="comRating"
                label="Average Rating"
                type="number"
                variant="standard"
              />
            </div>
            <TextField
              id="category"
              select
              required
              label="Category"
              value={category}
              onChange={handleCategory}
              variant="standard"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
			<Button color="error" onClick={() => {
				props.deleteMedia(props.showID);
				handleClose();
			}}>
				Delete
			</Button>
			<Button onClick={ () => {
				handleClose();
				resetForm();
			}}>Cancel</Button>
			<Button onClick={(e) => {
				if(validate()) {
					console.log(values)
					props.updateMedia(values, category, props.showID)
					handleClose()
				}
			}}>
				Update
			</Button>
        </DialogActions>
      </Dialog>
		<div className={classes.root}>
			<Card onClick={handleClickOpen} style={{background: "#1B1E28", padding: theme.spacing(2), borderRadius: "20px"}}>
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
								{props.tags}
							</Typography>
						</Grid>
						<Typography variant="p" style={{fontSize: "smaller"}} color="secondary">
							{props.summary}
						</Typography>
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
					</Grid>
				</Grid>
			</Card>
		</div>
		</>
	);
}

export default MediaCard;
