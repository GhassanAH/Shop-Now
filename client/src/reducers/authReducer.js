import { login, signup, forgotpassword, resetpassword, checkauthorization, logoutMe} from "../actions/types"

const authReducer = (state = null, action) => {
    switch(action.type){
        case checkauthorization:
            return action.payload || false
        case login:
            return action.payload || false
        case signup:
            return action.payload || false
        case forgotpassword:
            return action.payload || false
        case resetpassword:
            return action.payload || false      
        case logoutMe:
            return action.payload || false   
        default:
            return state
    }
}

export default authReducer