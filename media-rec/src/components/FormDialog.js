import {React, useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

/**
 * @param props.addNewMedia: the function to call when the form is completed
 * @param props.currentNumber: the number of media cards in current
 * @param props.nextNumber: the number of media cards in next
 * @param props.currentLimit: the maximum number of current media cards
 * @param props.nextLimit: the maximum number of next media cards
 */
const FormDialog = (props) => {
	const [open, setOpen] = useState(false);

	const [helperText, setHelperText] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		resetForm();
	};

	const initialValues = {
		"name": "",
		"summary": "",
		"tags": "",
		"comRating": 5.0,
		"recRating": 0,
		"recReview": "",
	};
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({
		"name": false,
		"summary": false,
		"tags": false,
		"comRating": false,
		"category": false
	});

	const validate = (fieldValues = values) => {
		let temp = {...errors}
		if ('name' in fieldValues)
			temp.name = !(fieldValues.name.length > 0)
		if ('summary' in fieldValues)
			temp.summary = !(fieldValues.summary.length > 0)
		if ('tags' in fieldValues)
			temp.tags = !(fieldValues.tags.length > 0)
		if ('comRating' in fieldValues) {
			temp.comRating = !(fieldValues.comRating.toString().length > 0)
		}

		if (category === "Current" && props.currentNumber == props.currentLimit) {
			setHelperText("Category is Full!")
			temp.category = true
		} else if (category === "Next" && props.nextNumber == props.nextLimit) {
			setHelperText("Category is Full!")
			temp.category = true
		} else {
			setHelperText("")
			temp.category = false
		}

		setErrors({...temp})
		if (fieldValues == values)
			return Object.values(temp).every(x => x == "")
	}

	const handleInputChange = (e) => {
		const id = e.target.id
		let value = e.target.value

		//prevents writing string to avg rating
		if (id === "comRating") {
			value = e.target.valueAsNumber
		}

		//rating can't exceed 3 digits, so you can't have a long decimal
		if (id === "comRating" && e.target.value.length > 3) {
			value = values["comRating"]
		}

		//value of rating must be between 0 and 10
		if (id === "comRating" && (e.target.valueAsNumber > 10 || e.target.valueAsNumber < 0)) {
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


	const [category, setCategory] = useState('Current');
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
		<div>
			<Button variant="contained" onClick={handleClickOpen}>
				Add New Media
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add New Media</DialogTitle>
				<DialogContent>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': {m: 1, width: '25ch'},
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
							helperText={helperText}
							error={errors.category}
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
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={(e) => {
						if (validate()) {
							props.addNewMedia(values, category)
							handleClose()
							resetForm()
						}
					}}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default FormDialog;