import { React, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * @param props.currentNumber: the number of media cards in current
 * @param props.nextNumber: the number of media cards in next
 * @param props.currentLimit: the maximum number of current media cards
 * @param props.nextLimit: the maximum number of next media cards
 * @param props.updateNumbers
 */
const SettingsDialog = (props) => {
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    "currentLimit": props.currentLimit,
    "nextLimit": props.nextLimit,
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    "currentLimit": false,
    "nextLimit": false,
  });

  //TODO for Beder check limit and current
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('currentLimit' in fieldValues){
        temp.currentLimit = fieldValues.currentLimit.toString() === "NaN"
    }
    if ('nextLimit' in fieldValues){
        temp.nextLimit = fieldValues.nextLimit.toString() === "NaN"
    }

    setErrors({...temp})
    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
  }

  const handleInputChange = (e) => {
    const id = e.target.id
    let value = parseInt(e.target.valueAsNumber)

    //value of limit must be one or more
    if(e.target.valueAsNumber < 1) {
      value = values[e.target.id]
    }

    //can't exceed the number of current cards
    if(id === "currentLimit" && e.target.valueAsNumber < props.currentNumber) {
      value = values[e.target.id]
    }
    if(id === "nextLimit" && e.target.valueAsNumber < props.nextNumber) {
      value = values[e.target.id]
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

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
            <SettingsIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Setttings</DialogTitle>
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
                margin="none"
                required
                value={values.currentLimit}
                error={errors.currentLimit}
                onChange={handleInputChange}
                id="currentLimit"
                label="Current Limit"
                type="number"
                variant="standard"
              />
              <TextField
                margin="none"
                required
                value={values.nextLimit}
                error={errors.nextLimit}
                onChange={handleInputChange}
                id="nextLimit"
                label="Next Limit"
                type="number"
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose();
            resetForm();
          }}>
            Cancel
          </Button>
          <Button onClick={(e) => {
            if(validate()) {
              props.updateNumbers(values)
              handleClose()
            }
          }}>
              Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsDialog;