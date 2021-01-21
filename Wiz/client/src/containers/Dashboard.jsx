import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect} from "react-redux";
import Dropdown from "./Dropdown.jsx";
import Navbar from "./Navbar.jsx";
import { sessionLogout } from "../Redux/actions/userActions.js"


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:"column"
  },
  drawer: {
      width: drawerWidth,
      flexShrink: 0,
  },
  appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  

  const history = useHistory();
  const open = () => {
    setMobileOpen(!mobileOpen);
  };

  

  const list = (
    <div className={classes.root}>
      <List >
        <ListItem  button>
            <Dropdown
              />
        </ListItem>
      </List>
      <List>           
        <ListItem onClick={() => history.push(`/home/users`)}  button>
            <ListItemText primary={'usuarios'} />
        </ListItem>
        
        <ListItem onClick={() => history.push(`/home/reg`)} button >
          <ListItemText primary={'Registros'} />
        </ListItem>
      </List>
    </div>
  );


  return (
    <div >
    <Navbar open={open} position="fixed" className={classes.appBar}/>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {list}
          </Drawer>
        </Hidden>
        {/* Se utiliza para ocultar Drawer xsDown*/}
        <Hidden xsDown implementation="css">
          <Drawer
          className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >

          <div className={classes.toolbar}></div>
          <Divider />
            {list}
          </Drawer>
        </Hidden>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  sessionLogout: () => dispatch(sessionLogout())
})


export default connect(mapStateToProps,mapDispatchToProps)(ResponsiveDrawer)