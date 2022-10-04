import React,{useState, useEffect} from 'react'
import {NavLink as Link} from "react-router-dom"
import "../../css/auth/signIn.css"
import {connect} from "react-redux"
import {signIn, checkAuthorization} from '../../actions'
import {useNavigate} from "react-router-dom"
import Loading from 'react-loading-components';




const SignIn = ({Login, auth, runCheck}) => {

    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [Error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const navigator = useNavigate();

    const handleSubmmision = (e) => {
        e.preventDefault()
        Login(Email, Password)
        setLoad(true)
    }
    useEffect(() => {
        if(auth){
            setLoad(false)
            if(auth.success && auth.message === "successfully loged in"){
                navigator("/", { replace: true })
            }else if(auth.message === "unsuccessfully loged in"){
                setError(auth.message)
            }else if(auth.message === "invalid password"){
                setError(auth.message)
            }else if(auth.message === "invalid email address"){
                setError(auth.message)
            }else if(auth.message === "Please provide a valid information"){
                setError(auth.message)
            }else{
                setError("")
            }
        }
    },[auth])


    return (
        <div className="i-con">
            <div className="i-cov">
                <form className="i-form">
                {Error && <div className="i-error">{Error}</div>}
                <h1 className="i-he2">Sign In</h1>
                    <label className="i-label">Email</label>
                    <input type="email" placeholder="   john@gmail.com" className="i-input"  value={Email}  onChange={val => setEmail(val.target.value)}/>
                    <label className="i-label">Password</label>
                    <input type="password" placeholder="   password" className="i-input" value={Password}  onChange={val => setPassword(val.target.value)}/>
                    <Link to="/signUp" className="i-nav"> Do you not already have an account? Sign up</Link>
                    <Link to="/forgotpassword" className="i-nav"> Forgot your password? Reset Password</Link>
                    <button className="i-btn" onClick={(e) => handleSubmmision(e)}>
                        {load && <Loading  type='oval' width={20} height={20} fill='#ffffff' />} 
                        <span className="i-he2">Sign In</span>
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
        Login: (email, password) => dispatch(signIn(email, password)),
        runCheck: () => dispatch(checkAuthorization())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
