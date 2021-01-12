import React from "react";
import { connect} from "react-redux";
import { useState,  useEffect } from "react";
import { Line} from "react-chartjs-2";
import { getRegister } from "../Redux/actions/userActions.js"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import "./Style.css"

const useStyles = makeStyles((theme) => ({
  paper: {
    margin:"1%",
    alignItems:"center",
    justifyContent:"center",
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Reg({getRegister, register}){
  const classes = useStyles(); 
  const today = new Date();
  const year = today.getFullYear();
  const mes = today.getMonth()+1;
  const dia = today.getDate();
  const hoy =year+"-"+mes+"-"+dia;

  const [input, setInput] = useState({
    createdAtA: hoy,
    createdAtB: hoy
  })  
  const [state, setState] = useState({});

  useEffect (() => {
    console.log(input,"ANTES DE IR A ACTION")
    getRegister(input)
  }, [])  

     useEffect (() => {
      charDatos()
    }, [register])

    
     const handleChange = (e) => {
      e.preventDefault(e)
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    const dateSearch =(e)=> {
      e.preventDefault(e)
      getRegister(input)
    }

    const f = register?.map((elem) => {
      return elem.date
    }) 
    const i = register?.map((elem) => {
      return elem.Registro
    }) 

     const charDatos = () => {
        setState({
        name: 'React',
        data: {
          labels: f,
          datasets: [{
            label: "Registros diarios",
            data: i
        ,
          backgroundColor: [
            "rgba(73, 43, 196, 0.6)",
            "rgba(140, 198, 62, 0.6)",
            "rgba(71, 165, 214, 0.6)",
            "rgba(90, 23, 180, 0.6)",
          ],
        }],
        }
        })
      }
      const history = useHistory();

    return(
      <Grid>
        
        <div className={classes.paper}style={{textAlign:"center"}}>
        <Box width="100%" p={1} my={5}>
        <Button 
        onClick={() => history.push(`/home`)}
        size="small"
        color="primary">
            Volver a Home
        </Button>
          <Typography className={classes.botones} component="h5"  variant="h7">Por favor Selecciona tu periodo.</Typography>
          <Box style={{display:"flex", marginBottom:"30px", justifyContent:"space-around", marginTop:"10px"}}>
          <TextField
            name="createdAtA"
            id="date"
            label="Fecha de inicio"
            type="date"
            defaultValue={hoy}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange= {handleChange}
          />
          <TextField
            name="createdAtB"
            id="date"
            label="Fecha de fin"
            type="date"
            defaultValue={hoy}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange= {handleChange}
          />
          </Box>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={dateSearch}
            >
            Buscar
          </Button>
          </Box>
          <Typography className={classes.botones} component="h5"  variant="h7">Usuarios nuevos por periodo</Typography>
        
        <Line
              data={state.data}
            />
      </div>
      </Grid>
      )
}

const mapStateToProps = state => ({
    register: state.session.register,
  })

  const mapDispatchToProps = dispatch =>({
    getRegister: (input) => dispatch(getRegister(input)),
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(Reg);