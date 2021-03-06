import React, {  } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom"
import { createUser } from "../Redux/actions/userActions.js"
import { Formik } from "formik"
import { Button } from "@material-ui/core"
import TextField from '@material-ui/core/TextField';
import * as Yup from "yup";
import "./Style.css"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'

const schema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  adress: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  passwordR: Yup.string().required()
})

function Register({ createUser }) {
  let history = useHistory()

  return (    
      <Formik 
      initialValues={{ email:"", password: "" }}
      validationSchema={schema}
      onSubmit={(values,{ setSubmitting }) => {
        setTimeout(()=> {
          createUser(values)
        }, 100);
      }}
      
      validationSchema = {Yup.object().shape({
        first_name:
            Yup.string()
            .required("Debes ingresar tu nombre"),
        last_name:
            Yup.string()
            .required("Debes ingresar tu apellido"),
        adress: 
            Yup.string()
            .required("Debes ingresar una dirección o ciudad"),
        email: 
            Yup.string()
           .email("Necesitas ser un email valido")
           .required("Necesitas ingresar un email"),
        password: 
            Yup.string()
            .required("La contraseña no puede quedar vacia")
            .min(8,"La contraseña es corta, debe contener 8 caracteres")
            .matches(/(?=.*[0-9])/,"la contraseña debe contener un número")
            .oneOf([Yup.ref('passwordR')], 'Las contraseñas no son iguales'),        
      passwordR: Yup.string().required("La contraseña no puede quedar vacia")
    })}
      >
        {
          props=>{
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;

            return (
              <form
                className="formu"
                style={{
                  width:"100%",
                  textAlign:"center"
                }} 
                autoComplete="off" 
                onSubmit={handleSubmit}
                >
              <Box className="box">
              <Typography component="h4"  variant="h7">Estas por unirte a Wizpro la mejor plataforma</Typography>
              <Button 
                onClick={() => history.push(`/`)}
                size="small"
                color="primary"
                >
                    Volver a Login
                </Button>
                <label 
                  className="label"
                  htmlFor="Nombre">Nombre</label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="text" 
                  value={values.first_name}
                  name="first_name" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ingresa tu nombre"
                  />
                {
                  errors.first_name && touched.first_name && (
                    <div className="inFeedback">{errors.first_name}</div>
                    )
                }
                <label 
                  className="label"
                  htmlFor="Apellido">Apellido</label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="text" 
                  value={values.last_name}
                  name="last_name" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ingresa tu apellido"              
                  />
                {
                  errors.last_name && touched.last_name && (
                    <div className="inFeedback">{errors.last_name}</div>
                    )
                }
                <label 
                  className="label"
                  htmlFor="Dirección o Ciudad">Dirección o Ciudad</label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="text" 
                  value={values.adress}
                  name="adress" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ingresa dirección o ciudad"                  
                  />
                {
                  errors.adress && touched.adress && (
                    <div className="inFeedback">{errors.adress}</div>
                    )
                }
                <label 
                  className="label"
                  htmlFor="correo">Correo</label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="text" 
                  value={values.email}
                  name="email" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ingresa tu correo"
                  />
                {
                  errors.email && touched.email && (
                    <div className="inFeedback">{errors.email}</div>
                    )
                }
                <label
                  className="label"                
                  htmlFor="Contraseña"
                >
                  Contraseña
                  </label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="password" 
                  value={values.password}
                  name="password" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ingresa tu contraseña"
                  />
                {
                  errors.password && touched.password && (
                    <div className="inFeedback">{errors.password}</div>
                    )
                }
                <label
                  className="label"                
                  htmlFor="Repetir contraseña"
                  >
                  Repetir contraseña
                  </label>
                <TextField
                  id="outlined-search"
                  variant="outlined" 
                  className="input" 
                  type="password" 
                  value={values.passwordR}
                  name="passwordR" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Reingresa tu password"
                  />
                {
                  errors.passwordR && touched.passwordR && (
                    <div className="inFeedback">{errors.passwordR}</div>
                    )
                }
                <div></div>
                <Button 
                  style={{ marginTop:"10px"}}
                  type="submit"
                  color="primary"
                  variant="contained"
                  >
                  Registrarse
                </Button>
                </Box>
              </form>
            )
          }
        }

      </Formik>
    );
}

const mapDispatchToProps = dispatch => ({
  createUser: (values) => (dispatch(createUser(values)))
})


export default connect(null, mapDispatchToProps)(Register)