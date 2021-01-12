import {
    GET_SESSION_USER,
    GET_REGISTER
  } from "../actions/constants";
  
  const initialState = {
    session:[],
    register:[]
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SESSION_USER:
        return {
          ...state,
          session: action.payload,
        };  

      case GET_REGISTER:
        console.log(action.payload,"QUE LLEGO A REDUCER")
        return {
        ...state,
        register: action.payload,
      }
      default:
        return state;
    }
  }