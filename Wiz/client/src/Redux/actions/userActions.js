import {
    GET_ALL_USERS,
    GET_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    RECOVERY_USER,
    API_URL,
    LOGIN,
    LOGOUT,
    GET_SESSION_USER,
    GET_REGISTER
  } from "./constants";
  import Swal from "sweetalert2"

  
  // ----------------- LOGIN --------
export function sessionLogin(data){
    const url = `${API_URL}/auth/login`;
    return function(dispatch)
    {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          if(res.status ==="error"){
            return res
          } else {
            dispatch({type: LOGIN, payload: res})
            return res
            }
        })
        .catch(err =>{
            Swal.fire('Datos incorrectos');
            console.error("ESTE ES EL ERROR QUE RECIBISTE",err)})
    }
}

// ----------------- LOGOUT --------
export function sessionLogout() {
    return function(dispatch) {

        return fetch(`${API_URL}/auth/logout`, {
            credentials: 'include'
        })
        .then(() => {
            dispatch({ type: LOGOUT})
        })
        .catch((error) => {
            console.error('error', error);
        });
    }
}

// ------------- TRAE SOLO UN USUARIO
export function getUser(id) {
    return function (dispatch) {
      return fetch(`${API_URL}/Users/${id}`, {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
           credentials: 'include'
      })
        .then((r) => r.json())
        .then((data) => {
          dispatch({ type: GET_USER, payload: data });
        })
        .catch((error) => {
            console.log(error)
        });
    };
  }
  
  // ------------- TRAE TODOS LOS USUARIOS POR COMERCIO
  export function getAllUsers() {
      return function(dispatch) {
          return fetch(`${API_URL}/users`, {
              credentials: 'include'
          })
          .then((r) => r.json())
          .then((data) => {
              console.log(data,"EN REDUCER")
              dispatch({ type: GET_ALL_USERS, payload: data})
          })
          .catch((error) => {
              console.error(error);
          });
      }
  }
  
  // ------------- TRAE TODOS LOS USUARIOS PARA EL SUPERADMIN
  export function getAllusersSuperadmin() {
      return function(dispatch) {
          return fetch(`${API_URL}/users/`, {
              credentials: 'include'
          })
          .then((r) => r.json())
          .then((data) => {
              dispatch({ type: GET_ALL_USERS, payload: data})
          })
          .catch((error) => {
              console.error(error);
          });
      }
  }
  
  // ----------------- CREA UN USUARIO
  export function createUser(user){
      const url = `${API_URL}/auth/register`;
      return function(dispatch)
      {
          return fetch(url, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((r) => r.json())
            .then(res => {
              Swal.fire('Usuario creado con exito').then(respuesta => {
                window.location.replace("/")
              })
              dispatch({type: CREATE_USER, payload: res})
          }).catch(err => console.error(err))
      }
  }
  
  // ----------------- CREA UN USUARIO
  export function createAdministrador(user){
      const url = `${API_URL}/users/superadmin`;
      return function(dispatch)
      {
          return fetch(url, {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((r) => r.json())
            .then(data => {
              dispatch({type: CREATE_USER, payload: data})
          }).catch(err => console.error(err))
      }
  }
  
  // ------------------ EDITA UN USUARIO
  export function userEdit(user){
      return function(dispatch) {
          return fetch(`${API_URL}/users/${user.id}`, {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((r) => r.json())
            .then(data => {
               Swal.fire('Exito'); 
               dispatch({ type: EDIT_USER, payload:data })
  
           }).catch(err => {
            Swal.fire('Sucedio un error intenta nuevamente');
            console.error(err)})
      }
  }
  
  //--------------------RUTA QUE MODIFICA LA PASSWORD
  export function changePassword(user,palab){
      return function(dispatch) {
          return fetch(`${API_URL}/auth/${user.id}/passwordReset`, {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((r) => r.json())
            .then(res => {
              if(palab !== null && palab !== undefined){
                return 
              }else{
                Swal.fire({
                  title: 'Exito!',
                  text: "Tu contraseña se cambio con exito, inicia sesion nuevamente.",
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuemos'
                }).then(respuesta => {
                window.localStorage.clear("User")
                window.location = "/"       
                })
           }}).catch(err => console.error(err))
      }
  }
  
  // ------------------ BORRA UN USUARIO
  export function deleteUser(row) {
      return function(dispatch) {
          return fetch(`${API_URL}/users/delete/${row.id}`, {
          method: 'PUT',
          body: JSON.stringify({ row }),
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include'
      }).then(r => r.json())
        .then(data => {
            Swal.fire('Usuario bloqueado'); 
            dispatch({type: DELETE_USER, payload: data})
          })
          .catch((err) => {
            Swal.fire('Ocurrio un problema al bloquear'); 
            console.error(err)});
    };
  }
  
  // ------------------ RECUPERA UN USUARIO
  export function recoveryUser(row) {
      return function(dispatch) {
          return fetch(`${API_URL}/users/recovery/${row.id}`, {
          method: 'PUT',
          body: JSON.stringify({ row }),
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include'
      }).then(r => r.json())
        .then(res => {
            Swal.fire('Usuario recuperado'); 
            dispatch({type: RECOVERY_USER, payload: res})
          })
          .catch((err) => {
            Swal.fire('Ocurrio un problema al recuperar'); 
            console.error(err)});
    };
  }

    // ------------- TRAE TODAS LAS SESSION DEL USUARIO
    export function getSession(row, input) {
        return function(dispatch) {
            return fetch(`${API_URL}/users/${row}/conteosession`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then((r) => r.json())
            .then((data) => {
                dispatch({ type: GET_SESSION_USER, payload: data})
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    // ------------- TRAE LOS REGISTROS POR PERIODO
    export function getRegister(input) {
        return function(dispatch) {
            return fetch(`${API_URL}/users/registerday`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then((r) => r.json())
            .then((data) => {
                console.log(data,"ANTES DE IR A REDUCER")
                dispatch({ type: GET_REGISTER, payload: data})
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }