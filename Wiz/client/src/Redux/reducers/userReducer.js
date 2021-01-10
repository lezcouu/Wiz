import {
    GET_ALL_USERS, 
    GET_ALL_USERS_SHOPS,
    GET_ALL_USERS_ADMIN,
    GET_USER, 
    EDIT_USER,
    DELETE_USER,
    RECOVERY_USER,
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
      case GET_ALL_USERS:
        return {
          ...state,
          users: action.payload,
        };
  
      case GET_ALL_USERS_ADMIN:
        return {
          ...state,
          usersAdmin: action.payload,
        };
  
      case GET_USER:
        return {
          user: action.payload,
        };
      case GET_ALL_USERS_SHOPS:
        return {
          userShops: action.payload.shops,
        };
      case EDIT_USER:
        return{
          ...state,
          users: [...state.users.map(elem => {
              if (elem.id === action.payload[0].id) {
                  return {
                      ...elem,
                      id: action.payload[0].id,
                      first_name: action.payload[0].first_name,
                      last_name: action.payload[0].last_name,
                      active:action.payload[0].active,
                      email: action.payload[0].email,
                      role: action.payload[0].role,
                      resetPasswordToken: action.payload[0].resetPasswordToken,
                      resetPasswordExpires: action.payload[0].resetPasswordExpires,
                      shops: action.payload[0].shops
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
              if (elem.id === action.payload.id) {
                  return {
                      ...elem,
                      id: action.payload.id,
                      first_name: action.payload.first_name,
                      last_name: action.payload.last_name,
                      active:action.payload.active,
                      email: action.payload.email,
                      role: action.payload.role,
                      shops: action.payload.shops
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
              if (elem.id === action.payload.id) {
                  return {
                      ...elem,
                      id: action.payload.id,
                      first_name: action.payload.first_name,
                      last_name: action.payload.last_name,
                      active:action.payload.active,
                      email: action.payload.email,
                      role: action.payload.role,
                      shops: action.payload.shops
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