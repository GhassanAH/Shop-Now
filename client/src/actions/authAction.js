import { login, signup, forgotpassword, resetpassword, checkauthorization, logoutMe} from './types'
import axios from "axios"
import ls from "local-storage"


export const checkAuthorization = () => async dispatch => {
    const token = ls.get("authToken")
    try {
        const res = await axios.get("/api/private", {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        var payload = {
            success:res.data.success,
            message:res.data.message,
            user:res.data.user
        }
        dispatch({type:checkauthorization, payload:payload})
     
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
        dispatch({type:checkauthorization, payload:payload})
    }
}

export const signIn = (email, password) => async dispatch => {
    try {
        const res = await axios.post("/api/login", {email, password})
        ls.set("authToken", res.data.token)
        var payload = {
            success:res.data.success,
            message:res.data.message
        }
        dispatch({type:login, payload:payload})

    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
        dispatch({type:login, payload:payload})
    }
}
export const signUp = (email, password) => async dispatch => {
    try {
        const res = await axios.post("/api/sign_up", {email, password})
        ls.set("authToken", res.data.token)
        var payload = {
            success:res.data.success,
            message:res.data.message
        }
        dispatch({type:signup, payload:payload})

    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message,
            error:error.response.data.error
        }
        dispatch({type:signup, payload:payload})
    }
}
export const forgotPassword = (email) => async dispatch => {
        try {
            const res = await axios.post("/api/forgot_password", {email})
            var payload = {
                success:res.data.success,
                message:res.data.message
            }
            dispatch({type:forgotpassword, payload:payload})

        } catch (error) {
            var payload = {
                success:error.response.data.success,
                message:error.response.data.message
            }
            dispatch({type:forgotpassword, payload:payload})
        }
}

export const resetPassword = (password, token) => async dispatch => {
        try {
            const res = await axios.put(`/api/reset_password/${token}`, {password})
            var payload = {
                success:res.data.success,
                message:res.data.message
            }
            dispatch({type:resetpassword, payload:payload})

        } catch (error) {
            var payload = {
                success:error.response.data.success,
                message:error.response.data.message
            }
            dispatch({type:resetpassword, payload:payload})
        }
}
export const logout = () => async dispatch => {
    const res = await axios.get("/api/logout")
    ls.remove("authToken")
    var payload = {
        success:res.data.success,
        message:res.data.message
    }
    dispatch({type:logoutMe, payload:payload})
}
