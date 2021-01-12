import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles
} from '@material-ui/core';
import { FaElementor } from "react-icons/fa"
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles ((theme) => ({

   menuButton: {
   	marginRight: theme.spacing(2),
   	[theme.breakpoints.up('sm')]: {
   		display:"none",
   	},
   },
   appBar: {
   	[theme.breakpoints.up('sm')] : {
   	   	width: `calc(100% - ${200}px)`,
   	   	marginLeft: 200,
   	   }
   }
}))

const NavBar = ( props, {  }) => {
	const classes = useStyles()
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const open = () => {
    setMobileOpen(!mobileOpen);
  };
	return (

			<AppBar className={classes.appBar}>
				<Toolbar>
				<IconButton
				color="inherit"
				aria-label="menu"
				className={classes.menuButton}
				onClick={()=>props.open()}
				>
					<FaElementor />
				</IconButton>
					<Typography variant="h6">
						Bienvenido a Wizpro
					</Typography>
				</Toolbar>
			</AppBar>

		)
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps,null)(NavBar)