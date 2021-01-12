import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import {sessionLogin} from "../Redux/actions/userActions.js";
import Swal from "sweetalert2";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaUserLock } from "react-icons/fa";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wizpro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginIngresar({sessionLogin}) {
  const classes = useStyles();

  const [input, setInput] = useState({
    "email": "",
    "password": ""
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }


  const [helperText, setHelperText] = useState('');

  let history = useHistory()

  const submitCrud = function (e) {
    e.preventDefault();
    sessionLogin(input)
    .then(res => {
  if(res.status === "error"){
        setHelperText(`Tuviste un Error al iniciar sesion: datos incorrectos`);
     }
  if(res.us.active === false){
    Swal.fire('No pudiste iniciar Sesion contactate con tu administrador o soporte')
    .then(respuesta => {
    window.localStorage.clear("User")
    setHelperText(`Tuviste un Error al iniciar sesion: usuario inactivo`);
    })
    }
  if(res.us.active === true){
    Swal.fire('Bienvenido').then(respuesta => {
      history.push("/home")
    })  
  } 
    
  }).catch(err => {
    console.log(err)
  })
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaUserLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} onSubmit={submitCrud}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              value={input.email}
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  
                onClick={() => history.push(`/register`)}
                variant="body2">
                  ¿Queres registrarte?
                </Link>
               <FormHelperText style={{fontSize:18 ,color:"red"}} error={false}> {helperText} </FormHelperText>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
        sessionLogin: input => dispatch(sessionLogin(input))
})

export default connect(null, mapDispatchToProps)(LoginIngresar)