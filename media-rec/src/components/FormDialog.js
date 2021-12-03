import { React, useState } from 'react'
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
 */
const FormDialog = (props) => {
  const [open, setOpen] = useState(false);

  const [x, setX] = useState(1);
  
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => {
            if(validate() && x < 3) {
              props.addNewMedia(values, category)
              setX(x + 1);
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