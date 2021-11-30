import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

/**
 * @param {*} props 
 */
const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [category, setCategory] = React.useState('Current');
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

  const handleChange = (event) => {
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
          {/* 
            * Name
            * summary multiline
            * tags (?)
            * avg rating decimal number 0 to 10
            * category select
            */}
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
                id="name"
                label="Name"
                type="text"
                variant="standard"
              />
              <TextField
                margin="none"
                required
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
                id="tags"
                label="Tags"
                type="text"
                variant="standard"
              />
              <TextField
                margin="none"
                required
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
              onChange={handleChange}
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
          <Button onClick={props.createMedia}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;