// ------- USER CONSTANTS ----------
export const LOGIN = "LOGIN"
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_USERS_ADMIN = "GET_ALL_USERS_ADMIN";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_ALL_USERS_SHOPS = "GET_ALL_USERS_SHOPS";
export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const RECOVERY_USER = "RECOVERY_USER";
export const LOGOUT = "LOGOUT";
export const GET_SESSION_USER = "GET_SESSION_USER";
export const GET_REGISTER = "GET_REGISTER";

export const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:4000' 