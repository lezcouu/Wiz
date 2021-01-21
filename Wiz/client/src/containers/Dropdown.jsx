import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";

function Dropdown({}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSession = () => {
    window.localStorage.clear("User")
    window.location = "/"
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Hola 
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <MenuItem >
      
      </MenuItem>
      <MenuItem onClick={handleSession}>Cerrar Sesion</MenuItem>

      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps,null)(Dropdown)