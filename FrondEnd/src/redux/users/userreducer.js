
const initialState={
    username:"",
    category:"",
    islogin:false,
    error:"",
    full_name:""
}
const userReducer=(state=initialState,action)=>{

    switch(action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                islogin:true,
                username:action.payload.username,
                category:action.payload.category,
                full_name:action.payload.full_name,
                error:""
            }
        case "LOGIN_REQUEST":
            return {
                ...state,
                username:action.payload.username,
                error:""
               
            }
    case "LOGIN_FAILURE":
     return {
        ...state,
        islogin: false,
        error: action.payload
    }
    case "LOGOUT":
      return {
        username: "",
        category: "",
        islogin: false
      };
      case "SESSION_SUCCESS":   
    return {
        ...state,
        islogin: true,
        username: action.payload.username,
        category: action.payload.category,
        full_name: action.payload.full_name,
        error: ""
    };
        default :
            return state

            
    }
   

}
export default userReducer
