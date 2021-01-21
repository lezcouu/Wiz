import React, { useState } from 'react'
import Dialog from "@material-ui/core/Dialog";
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { userEdit } from "../Redux/actions/userActions.js"
import { connect } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import IconButton from '@material-ui/core/IconButton';


const EditUser = ({ row, userEdit }) => {

const [open, setOpen] = useState(false);
const [input, setInput] = useState({
    id: "",
    first_name:"",
    last_name: "",
    email: "",
    adress: "",
  })
const handleClose = () => {
  setOpen(false);
};


const onChangeUser = (e) => {
  setInput({
    ...input,
      [e.target.name]: e.target.value,
  });
}
const setearModificarid = (row) => {
    setInput({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        adress: row.adress,
    });
  setOpen(true)
};


const modified = (e) => {
    e.preventDefault(e)
    userEdit(input)
    handleClose()
  }

    return (
        <Box>
            <IconButton >
              <FaPencilAlt onClick={() => setearModificarid(row)} button />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Modificar Usuario
              </DialogTitle>
                <DialogContent>
                  <TextField
                    name="first_name"
                    margin="dense"
                    label="nombre"
                    type="text"
                    fullWidth
                    value={input.first_name}
                    onChange={onChangeUser}
                    autoFocus
                  />
                    <TextField
                      name="last_name"
                      margin="dense"
                      label="Apellido"
                      type="text"
                      fullWidth
                      value={input.last_name}
                      onChange={onChangeUser}
                      autoFocus
                    />
                    <TextField
                      name="adress"
                      margin="dense"
                      label="dirección"
                      type="text"
                      fullWidth
                      value={input.adress}
                      onChange={onChangeUser}
                      autoFocus
                    />
                  </DialogContent>
                  <div style={{ margin: 8 }}>
                  <DialogActions >
                    <Button onClick={handleClose} color="primary">
                      Cerrar
                    </Button>
                  <Button
                    type="submit"
                    onClick={modified}
                    color="primary"
                    >
                  Modificar
                </Button>
              </DialogActions>
            </div>
          </Dialog>            
        </Box>
    )
}

const mapDispatchToProps = dispatch =>({
    userEdit : (row) => dispatch(userEdit(row)),
  })
  
  export default connect(null,mapDispatchToProps)(EditUser)