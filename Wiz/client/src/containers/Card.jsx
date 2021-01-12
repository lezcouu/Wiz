import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
  getSession,
  recoveryUser,
} from "../Redux/actions/userActions.js";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DeleteUser from "./DeleteUser.jsx"
import EditUser from "./EditUser.jsx"
import SimpleModal from "./SimpleModal.jsx"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = ({ props, recoveryUser }) => {
  
    const users = props
    
  const classes = useStyles();
  
  const restoreUser = (row) => {
    recoveryUser(row)
  }
  

  return (
    <Grid container>
        {users?.map((row,i) => {
            return (
                <Grid 
                key={i}
                item
                md={3}
                sm={6}
                xs={12}
                >
                    <Card style={{marginLeft:"1%", textAlign:"center"}} >
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="https://source.unsplash.com/category/people/"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {row.first_name} {row.last_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {row.email}
                        </Typography>
                        {row.active === true?(
                        <Typography variant="body2" color="textSecondary" component="p">
                          cuenta activa
                        </Typography>):
                        <Typography variant="body2" color="textSecondary" component="p">
                          cuenta inactiva
                          </Typography>
                        }
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{justifyContent:"center"}}>
                        <Button size="small" color="primary">
                        <EditUser row={row} />
                        </Button>
                        {row.active===true ?(
                        <Button size="small" color="primary">
                        <DeleteUser row={row}/>
                        </Button>
                        ):<div></div>}
                        {row.active === false? (
                        <Button size="small" color="primary">
                        <SettingsBackupRestoreIcon onClick={() => restoreUser(row)}/>
                        </Button>
                        ):<div></div>}
                        <Button>
                          <SimpleModal row={row}/>
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
            )
        })}
    </Grid>
  );
}

const mapDispatchToProps = dispatch =>({
  recoveryUser : (row) => dispatch(recoveryUser(row)),
  getSession: (row) => dispatch(getSession(row))
})

export default connect(null,mapDispatchToProps)(MediaCard)