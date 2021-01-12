import React from "react";
import { connect} from "react-redux";
import { useState,  useEffect } from "react";
import { Line} from "react-chartjs-2";
import { getSession} from "../Redux/actions/userActions.js"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';  

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft:"25%",
    marginTop:"1%",
    alignItems:"center",
    justifyContent:"center",
    width: 600,
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

function SimpleModal({ row, getSession, session }){
  const f = session?.map((elem) => {
    return elem.fecha
  }) 
  const i = session?.map((elem) => {
    return elem.inicios
  }) 
  console.log(row,"EN SIMPLE MODAL")

  const classes = useStyles(); 
  const today = new Date();
  const year = today.getFullYear();
  const mes = today.getMonth()+1;
  const dia = today.getDate();
  const hoy =year+"-"+mes+"-"+dia;

  const [input, setInput] = useState({
    id:"",
    createdAtA:"2021-01-09",
    createdAtB: hoy
  })
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [state, setState] = useState({});
  

     useEffect (() => {
      charDatos()
    }, [session])

    
     const handleChange = (e) => {
      e.preventDefault(e)
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    const dateSearch =(e)=> {
      e.preventDefault(e)
      getSession(row.id, input)
    }

     const charDatos = () => {
        setState({
        name: 'React',
        data: {
          labels: f,
          datasets: [{
            label: "Uso de la plataforma",
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
    
    const body = (
      
      <div className={classes.paper} style={{textAlign:"center"}}>
        <Box width="100%" p={1} my={5}>
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
          <Typography className={classes.botones} component="h5"  variant="h7">Inicio de sesion por periodos del usuario</Typography>
        
        <Line
              data={state.data}
            />
      </div>
      
    );

    const mod = ( row ) => {
      getSession(row.id, input)
      handleOpen(true)
    }

    return(
        <div>
          <EqualizerIcon type="button" onClick={() => mod(row)}>
            Open Modal
          </EqualizerIcon>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
            
        </div>
      )
}

const mapStateToProps = state => ({
    session: state.session.session,
  })
  
  const mapDispatchToProps = dispatch =>({
    getSession: (row, input) => dispatch(getSession(row, input)),
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(SimpleModal);

