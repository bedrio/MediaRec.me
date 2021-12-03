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
 * @param props.currentNumber
 * @param props.nextNumber
 * @param props.planningNumber
 * @param props.currentLimit
 * @param props.nextLimit
 * @param props.planningLimit
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
    "planningLimit": props.planningLimit,
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    "currentLimit": false,
    "nextLimit": false,
    "planningLimit": false,
  });

  //TODO for Beder check limit and current
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('currentLimit' in fieldValues){
        temp.currentLimit = !(fieldValues.currentLimit.toString().length > 0)
    }
    if ('nextLimit' in fieldValues){
        temp.nextLimit = !(fieldValues.nextLimit.toString().length > 0)
    }
    if ('planningLimit' in fieldValues){
        temp.planningLimit = !(fieldValues.planningLimit.toString().length > 0)
    }
    
    setErrors({...temp})
    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
  }

  const handleInputChange = (e) => {
    const id = e.target.id
    let value = parseInt(e.target.valueAsNumber)

    //value of rating must be between 0 and 10
    if(e.target.valueAsNumber < 0) {
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
            <div>
              <TextField
                margin="none"
                required
                value={values.planningLimit}
                error={errors.planningLimit}
                onChange={handleInputChange}
                id="planningLimit"
                label="Planning Limit"
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