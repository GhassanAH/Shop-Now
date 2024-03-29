import React,{useState, useEffect} from 'react'
import "../css/header.css"
import {BsFillCartFill} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import {GiHamburgerMenu} from "react-icons/gi"
import {NavLink as Link} from "react-router-dom"
import { connect } from 'react-redux' 
import {checkAuthorization, getProducts, getType, logout} from '../actions'
import Loading from 'react-loading-components';
import logo from "../img/logo.png"



const Header = ({shop, auth, checkTheAuthorization, getTheProducts, getTheType, logoutHim}) => {
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

      const handleLogout = (e) => {
        e.preventDefault()
        logoutHim()
        navigator("/")
    }



    return (
        <div className="h-con">
            <div className="h-navs2">
                    <Link to="/" className="h-nav"><div className="h-he3">Shop</div></Link>
                    {!user && <Link to="/signIn" className="h-nav"><div className="h-he3">Log in</div></Link>}
                    {!user && <Link to="/signUp" className="h-nav"><div className="h-he3">Log up</div></Link>}
                    {user && <Link to="/profile/info" className="h-nav"><div className="h-he3">Info</div></Link>}
                    {user && auth.admin && <Link to="/profile/add_products" className="h-nav"><div className="h-he3">Add Product</div></Link>}
                    {user && auth.admin && <Link to="/profile/edit_products" className="h-nav"><div className="h-he3">Edit Product</div></Link>}
                    {user && auth.admin && <Link to="/profile/orders" className="h-nav"><div className="h-he3">Orders</div></Link>}
                    {user && auth.admin && <Link to="/profile/processed" className="h-nav"><div className="h-he3">Processed</div></Link>}
                    {user && auth.admin && <Link to="/profile/analysis" className="h-nav"><div className="h-he3">Analysis</div></Link>}
                    {user && <Link to="/profile/history" className="h-nav"><div className="h-he3">My Orders</div></Link>}
                    {user && <button onClick={handleLogout} className="h-nav"><div className="h-he3">Logout</div></button>}
            </div>  
            
            <div className = "h-cov">
                <div className="h-title">
                    <img src={logo} alt="logo" className="h-logo"/>
                    <a href="/" className="h-he1"><h1 >BigShop</h1></a>
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
                    {!user && <Link to="/signIn" className="h-nav">Log in</Link>}
                    {!user && <Link to="/signUp" className="h-nav">Log up</Link>}
                    {user && <Link to="/profile/info" className="h-nav"><CgProfile  className="h-icon"/></Link>}
                    <Link to="/cart" className="h-cart"><BsFillCartFill className="h-icon"/><span className="h-it">{itemSize}</span></Link>
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
                <Link to="/cart" className="h-cart1"><BsFillCartFill className="h-icon1"/><span className="h-it1">{itemSize}</span></Link>
                <button className="h-ham" onClick={setNavMenuShow}><GiHamburgerMenu color="#fff"/></button>
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
        logoutHim: () => dispatch(logout()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)
