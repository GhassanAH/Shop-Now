import React,{useState, useEffect} from 'react'
import {NavLink as Link} from "react-router-dom"
import "../../css/auth/signIn.css"
import {connect} from "react-redux"
import {signIn, checkAuthorization} from '../../actions'
import {useNavigate} from "react-router-dom"
import Loading from 'react-loading-components';
import logo from "../../img/logo.png"
import {BsEye, BsEyeSlash} from "react-icons/bs"




const SignIn = ({Login, auth, runCheck}) => {

    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [Error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false)
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

    const handleShow = (e) => {
        e.preventDefault()
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }




    return (
        <div className="i-con">
            <div className="i-cov">
                <form className="i-form">
                    {Error && <div className="i-error">{Error}</div>}
                    <img src={logo} alt="logo" className="i-logo"/>
                    <h1 className="i-he2">Log in</h1>
                    <label className="i-label">Email</label>
                    <div className="i-control">
                        <input type="email" placeholder="john@gmail.com" className="i-input"  value={Email}  onChange={val => setEmail(val.target.value)}/>
                    </div>
                    
                    <label className="i-label">Password</label>
                    <div className="i-control">
                        <input className="i-pass" type={show?"text":"password"} placeholder="password"  value={Password}  onChange={val => setPassword(val.target.value)}/>
                        <button className="i-show" onClick={(e) => handleShow(e)}>{show?<BsEye/>:<BsEyeSlash/>}</button>
                    </div>
                    
                    <Link to="/signUp" className="i-nav"> Do you not already have an account? Sign up</Link>
                    <Link to="/forgotpassword" className="i-nav"> Forgot your password? Reset Password</Link>
                    <button className="i-btn" onClick={(e) => handleSubmmision(e)}>
                        {load && <Loading  type='oval' width={20} height={20} fill='#ffffff' />} 
                        <span className="i-he2">Log in</span>
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
