

export const LOGIN_SUCCESS="LOGIN_SUCCESS"
export const LOGIN_REQUEST="LOGIN_REQUEST"
export const LOGIN_FAILURE="LOGIN_FAILURE"
export const LOGOUT="LOGOUT"
export const SESSION_REQUEST = "SESSION_REQUEST";



export const loginSuccess=(username,category,full_name)=>{
    return{
        type:LOGIN_SUCCESS,
        payload:{
            username,category,full_name
        }
    }
}
export const loginRequest=(username,password)=>{
    return{
        type:LOGIN_REQUEST,
        payload:{
            username,password
        }
    }
}

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}
export const logout = () => {
  return {
    type: LOGOUT
  };
};
export const sessionRequest = () => ({
    type: SESSION_REQUEST
});
export const sessionSuccess = (username, category,full_name) => ({
    type: "SESSION_SUCCESS",
    payload: {
        username,
        category,
        full_name
    }
});