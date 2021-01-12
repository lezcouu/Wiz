import {
    GET_ALL_USERS,
    GET_USER, 
    EDIT_USER,
    DELETE_USER,
    RECOVERY_USER,
    LOGOUT,
    LOGIN,
  } from "../actions/constants";
  
  const initialState = {
    user: {},
    users: [],
    usersAdmin:[],
    userShops: [],
    shops:[]
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN:

        localStorage.setItem("idUser", action.payload.us.id);

        delete action.payload.password;
        delete action.payload.securityAnswer;
        return {
            ...state,
            sessionUser: action.payload.us
        }
      case LOGOUT:
        
        return {
            ...state,
            sessionUser: {}
        }
      case GET_ALL_USERS:
        return {
          ...state,
          users: action.payload,
        };  
      case GET_USER:
        return {
          user: action.payload,
        };
      case EDIT_USER:
        return{
          ...state,
          users: [...state.users.map(elem => {
              if (elem.id === action.payload.id) {
                  return {
                      ...elem,
                      id: action.payload.id,
                      first_name: action.payload.first_name,
                      last_name: action.payload.last_name,
                      active: true,
                      email: action.payload.email,                      
                  }
              } else {
                  return elem;
              }
          })],
        };
        case DELETE_USER:
        return{
          ...state,
          users: [...state.users.map(elem => {
              if (elem.id == action.payload.id) {
                  return {
                      ...elem,
                      id: action.payload.id,
                      first_name: action.payload.first_name,
                      last_name: action.payload.last_name,
                      active:action.payload.active,
                      email: action.payload.email
                  }
              } else {
                  return elem;
              }
          })],
        };
        case RECOVERY_USER:
        return{
          ...state,
          users: [...state.users.map(elem => {
              if (elem.id == action.payload.id) {
                  return {
                      ...elem,
                      id: action.payload.id,
                      first_name: action.payload.first_name,
                      last_name: action.payload.last_name,
                      active:action.payload.active,
                      email: action.payload.email,
                  }
              } else {
                  return elem;
              }
          })],
        };
      default:
        return state;
    }
  }