import React,{useState, useEffect} from 'react'
import "../../css/auth/forgot.css"
import {connect} from "react-redux"
import {forgotPassword} from '../../actions'
import Loading from 'react-loading-components';
import {NavLink as Link} from "react-router-dom"
import logo from "../../img/logo.png"



const ResetPassword = ({sendEmail, auth}) => {

    const [Email, setEmail] = useState('')
    const [load, setLoad] = useState(false)
    const [Error, setError] = useState('')
    const [Success, setSuccess] = useState('')


    const handleSubmmision = (e) => {
        e.preventDefault()
        sendEmail(Email)
        setLoad(true)
    }

    useEffect(() => {
        if(auth){
            setLoad(false)
            if(auth.success && auth.message === "Email Sent"){
                setError("")
                setSuccess("The email has been sent. Please check your inbox to reset the password")
            }else if(auth.message === "The email could not be sent"){
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
                    <img src={logo} alt="logo" className="ft-logo"/>
                    <h1 className="ft-he2">Reset Password</h1>
                    <label className="ft-label">Email</label>
                    <input type="email" placeholder="   john@gmail.com" className="ft-input"  value={Email}  onChange={val => setEmail(val.target.value)}/>
                    <Link to="/signIn" className="ft-nav"> Sign In Now</Link>
                    <Link to="/signUp" className="ft-nav"> Create An Account Now</Link>
                    <button className="ft-btn" onClick={(e) => handleSubmmision(e)}>
                        {load && <Loading type='oval' width={20} height={20} fill='#ffffff' />}
                        <span className="ft-he2">Send Email</span>
                    </button>
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
        sendEmail: (email) => dispatch(forgotPassword(email)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword)
