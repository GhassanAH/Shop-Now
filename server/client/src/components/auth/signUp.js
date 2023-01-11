import React,{useState, useEffect} from 'react'
import "../../css/auth/signUp.css"
import {NavLink as Link} from "react-router-dom"
import Loading from 'react-loading-components';
import {useNavigate} from "react-router-dom"
import {signUp, checkAuthorization} from '../../actions'
import {connect} from "react-redux"
import logo from "../../img/logo.png"
import {BsEye, BsEyeSlash} from "react-icons/bs"

const SignUp = ({register, auth, runCheck}) => {

    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [Error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false)
    const navigator = useNavigate();

    const handleSubmmision = (e) => {
        e.preventDefault()
        register(Email, Password)
        setLoad(true)
    }
    useEffect(() => {
        if(auth){
            setLoad(false)
            if(auth.success && auth.message === "successfully signed up"){
                navigator("/", { replace: true })
            }else if(auth.message === "unsuccessfully signed up"){
                setError(auth.error)
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
        <div className="u-con">
            <div className="u-cov">
                <form className="u-form">
                    {Error && <div className="u-error">{Error}</div>}
                    <img src={logo} alt="logo" className="u-logo"/>
                    <h1 className="u-he2">Log up</h1>
                    <label className="u-label">Email</label>
                    <div className="u-control">
                        <input type="email" placeholder="   john@gmail.com" className="u-input"  value={Email}  onChange={val => setEmail(val.target.value)}/>
                    </div>
                    <label className="u-label">Password</label>
                    <div className="u-control">
                        <input type={show?"text":"password"} placeholder="   Password" className="u-pass" value={Password}  onChange={val => setPassword(val.target.value)}/>
                        <button className="u-show" onClick={(e) => handleShow(e)}>{show?<BsEye/>:<BsEyeSlash/>}</button>
                    </div>
                    <Link to="/signIn" className="u-nav"> Do you already have an account? Sign in</Link>
                    <button className="u-btn" onClick={(e) => handleSubmmision(e)}>
                         {load && <Loading type='oval' width={20} height={20} fill='#ffffff' />}
                         <span className="u-he2">Log up</span>
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
        register: (email, password) => dispatch(signUp(email, password)),
        runCheck: () => dispatch(checkAuthorization())

    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
