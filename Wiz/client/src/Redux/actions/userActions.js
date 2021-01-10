import {
    GET_ALL_USERS,
    GET_ALL_USERS_ADMIN,
    GET_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER,
    RECOVERY_USER,
    API_URL,
    LOGIN
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
// ------------- TRAE TODOS LOS USUARIOS POR COMERCIO
  export function getAllUsers(id) {
      return function(dispatch) {
          return fetch(`${API_URL}/users/shop/${id}`, {
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
  
  // ------------- TRAE TODOS LOS USUARIOS POR COMERCIO
  export function getAllUsersAdmin() {
      return function(dispatch) {
          return fetch(`${API_URL}/shops/superadmin/todos/users`, {
              credentials: 'include'
          })
          .then((r) => r.json())
          .then((data) => {
              dispatch({ type: GET_ALL_USERS_ADMIN, payload: data})
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
      const url = `${API_URL}/users/`;
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
  
  // ------------------ EDITA UN USUARIO
  export function editUser(user){
      return function(dispatch) {
          return fetch(`${API_URL}/users/modified/${user.id}`, {
              method: 'PUT',
              body: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include'
          }).then((r) => r.json())
            .then(data => {
               dispatch({ type: EDIT_USER, payload:data })
  
           }).catch(err => console.error(err))
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
            dispatch({type: DELETE_USER, payload: data})
          })
          .catch((err) => console.error(err));
    };
  }
  
  // ------------------ RECUPERA UN USUARIO
  export function recoveryUser(row) {
      return function(dispatch) {
          return fetch(`${API_URL}/users/recovery/${row}`, {
          method: 'PUT',
          body: JSON.stringify({ row }),
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include'
      }).then(r => r.json())
        .then(res => {
            dispatch({type: RECOVERY_USER, payload: res})
          })
          .catch((err) => console.error(err));
    };
  }