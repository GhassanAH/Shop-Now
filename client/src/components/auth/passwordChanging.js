import React,{useState, useEffect} from 'react'
import "../../css/auth/forgot.css"
import {connect} from "react-redux"
import {resetPassword} from '../../actions'
import Loading from 'react-loading-components';
import { useParams } from "react-router-dom";

const PasswordChanging = ({resetThePassword, auth, match}) => {
    const [Password, setPassword] = useState('')
    const [load, setLoad] = useState(false)
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')
    let { token } = useParams();


    const handleSubmmision = (e) => {
        e.preventDefault()
        resetThePassword(Password, token)
        setLoad(true)
    }

    useEffect(() => {
        if(auth){
            setLoad(false)
            if(auth.success && auth.message === "Password Updated Success"){
                setError("")
                setSuccess("The password has been reset")
            }else if(auth.message === "Invalid Token"){
                setError(auth.message)
                setSuccess("")
            }else if(auth.message === "unsuccessfully password resetting"){
                setError(auth.message)
                setSuccess("")
            }else{
                setError("")
                setSuccess("")
            }
        }
    },[auth])
    return (
        <div className="ft-con">
            <div className="ft-cov">
                <form className="ft-form">
                    {Error && <div className="ft-error">{Error}</div>}
                    {Success && <div className="ft-success">{Success}</div>}
                    <h1 className="ft-he2">Reset Password</h1>
                    <label className="ft-label">New Password</label>
                    <input type="password" placeholder="Password" className="ft-input"  value={Password}  onChange={val => setPassword(val.target.value)}/>
                    <button className="ft-btn" onClick={(e) => handleSubmmision(e)}>Reset Password {load && <Loading type='oval' width={20} height={20} fill='#ffffff' />}</button>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        resetThePassword: (password, token) => dispatch(resetPassword(password, token)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PasswordChanging)
