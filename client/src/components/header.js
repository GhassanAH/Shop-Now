import React,{useState, useEffect} from 'react'
import "../css/header.css"
import {BsCart} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {GiHamburgerMenu} from "react-icons/gi"
import {NavLink as Link} from "react-router-dom"
import { connect } from 'react-redux' 
import {checkAuthorization, getProducts, getType} from '../actions'
import Loading from 'react-loading-components';



const Header = ({shop, auth, checkTheAuthorization, getTheProducts,getTheType}) => {
    const [show, setShow] = useState(false)
    const [itemSize, setItemSize] = useState(0)
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(true)
    const [type, setType] = useState("Shop All")

    useEffect(() => {
        getTheProducts(type)
    },[])

    useEffect(() => {
        getTheProducts(type)
        getTheType(type)
    },[type])

    const setNavMenuShow = () => {
        if(show){
            document.documentElement.style.setProperty('--display-nav', "none")
            setShow(false)
        }else{
            document.documentElement.style.setProperty('--display-nav', "flex")
            setShow(true)
         
        }
    }

    useEffect(() => {   
        const prevSize = shop.length;
        setItemSize(prevSize)
    }, [shop])


    useEffect(() => {
        if(auth){
          if(auth.success && auth.message === "You got access to the private data in this route"){
            setUser(auth.user)
            setLoad(false)
          }else if (auth.success && auth.message === "successfully loged in" 
                                 || auth.message === "successfully signed up"
                                 || auth.message === "You successfully logout"){
                setLoad(true)
                checkTheAuthorization()

          }else if(auth.success === false && auth.message === "Not authorized to access this router"){
              setLoad(false)
              setUser(null)

          }else{
            setLoad(false)
          }
        }
      },[auth])



    return (
        <div className="h-con">
            <div className = "h-cov">
                <div className="h-title">
                    <a href="/" className="h-he1"><h1 >ShopNow</h1></a>
                </div>
               {!load && <div className="h-navs">
                    <select className="h-sel" value={type} onChange={(e) => setType(e.target.value)}>
                        <option className="h-option">Shop All</option>
                        <option className="h-option">Hoodies</option>
                        <option className="h-option">Crewnecks</option>
                        <option className="h-option">Long Sleeves</option>
                        <option className="h-option">T-Shirts</option>
                        <option className="h-option">Accessories</option>
                    </select>
                    {!user && <Link to="/signIn" className="h-nav">Sign in</Link>}
                    {!user && <Link to="/signUp" className="h-nav">Sign up</Link>}
                    {user && <Link to="/profile/info" className="h-nav"><CgProfile  className="h-icon"/></Link>}
                    <Link to="/cart" className="h-cart"><BsCart className="h-icon"/><span className="h-it">{itemSize}</span></Link>
                </div>}
                {load && <div className="h-loader"><Loading className="h-l" type='spinning_circles' width={40} height={40} fill='#ffffff' /></div>}
                <select className="h-sel1" value={type} onChange={(e) => setType(e.target.value)}>
                        <option className="h-option">Shop All</option>
                        <option className="h-option">Hoodies</option>
                        <option className="h-option">Crewnecks</option>
                        <option className="h-option">Long Sleeves</option>
                        <option className="h-option">T-Shirts</option>
                        <option className="h-option">Accessories</option>
                </select>
                <Link to="/cart" className="h-cart1"><div className="h-c1"><BsCart className="h-icon1"/><span className="h-it1">{itemSize}</span></div></Link>
                <button className="h-ham" onClick={setNavMenuShow}><GiHamburgerMenu color="#fff"/></button>
            </div>

            <div className="h-navs2">

                <Link to="/" className="h-nav">Shop</Link>
                {!user && <Link to="/signIn" className="h-nav">SignIn</Link>}
                {!user && <Link to="/signUp" className="h-nav">SignUp</Link>}
                {user && <Link to="/profile" className="h-nav"><CgProfile  className="h-icon"/> Profile</Link>}
            </div>
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
      shop: state.shop,
      auth:state.auth
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        checkTheAuthorization: () => dispatch(checkAuthorization()),
        getTheProducts: (type) => dispatch(getProducts(type)),
        getTheType: (type) => dispatch(getType(type)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)
