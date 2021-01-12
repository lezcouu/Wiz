import React, { useState, useEffect } from 'react'
import "./Style.css"
import { connect } from "react-redux";
import { getAllUsers } from "../Redux/actions/userActions.js"
import Card from "./Card.jsx"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    root: {
      display: "flex",
      width: '100%',
    },
    title: {
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
}))
const Users = ({getAllUsers, users}) => {
    const classes = useStyles();    
    const [header] = useState({
        mainHeader:"Usuarios",
        subHeading: "Usuarios activos e inactivos",
        text: "Se podran encontrar todos los usuarios que hayan utilizando nuestra plataforma"
    })
    
    const [item, setItem] = useState()
    const [items, setItems] = useState()
    useEffect(() => {
        getAllUsers()
        setItem(users)
     }, [])
     const onSearch = (text) => {
         if ( text.length > 2 ) {
             console.log("BUSCANDO")
            const itemsFound = item.filter(item => item.first_name.toLowerCase().includes(text.toLowerCase()) || item.email.toLowerCase().includes(text.toLowerCase()));
            setItems(itemsFound);
          } else {
              getAllUsers()
          }        
      };
    
    const history = useHistory();

    return (
        <div className="services">
            <div className="container">
                <div className="services_header">
                    <div className="common">
                       <Button 
                        onClick={() => history.push(`/home`)}
                        size="small"
                        color="primary"
                        variant="contained"
                        >
                            Volver a Home
                        </Button>
                        <h3 className="heading">
                            {header.mainHeader}
                        </h3>
                        <h1 className="mainHeader">
                            {header.subHeading}
                        </h1>
                        <p className="mainContent">
                            {header.text}
                        </p>
                        <Typography className={classes.title} variant="h6">
                        Puedes buscar usuarios por nombre o mail
                        </Typography>
                            <TextField 
                            style={{background:"#fff", borderRadius:"10px"}}
                            id="outlined-search" 
                            label="buscador" 
                            type="search" 
                            variant="outlined"
                            onChange={ (e) => onSearch(e.target.value)}
                             />
                        <div className="commonBorder"></div>
                    </div>
                    <div className="row bgMain">
                    <Card props={items} />
                        <div className="col-4">
                            <Card props={users} />
                        </div>
                    </div>
                </div>
                </div>            
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users.users
  })
  
  const mapDispatchToProps = dispatch =>({
    getAllUsers : () => dispatch(getAllUsers())
  })
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Users);

