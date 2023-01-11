import React,{useState, useEffect} from 'react'
import "../../css/auth/profile.css"
import {NavLink as Link, Outlet} from "react-router-dom"
import { connect } from 'react-redux' 
import {logout} from '../../actions'
import { useNavigate } from 'react-router'
import {BsFillPersonFill, BsScissors, BsUpload, BsFillCartCheckFill, BsArrowBarLeft, BsPieChartFill} from "react-icons/bs"



const Profile = ({logoutHim, auth}) => {
    const navigator = useNavigate()
    const [tabsStatus, changeMyTab] = useState("Profile")
    const handleLogout = (e) => {
        e.preventDefault()
        logoutHim()
        navigator("/")
    }
    useEffect(() => {
    }, [auth])

    return (
        <div className="pe-con">
            <div className="pe-cov">
                <div className="pe-tabs">
                    <div className={`pe-tab ${tabsStatus === "Profile"?"pe-tabed":""}`}><Link to="/profile/info" className="pe-nav" onClick={(e) => changeMyTab("Profile")}><BsFillPersonFill/> Profile</Link></div>
                    {auth.admin && <div className={`pe-tab ${tabsStatus === "productAddition"?"pe-tabed":""}`}><Link to="/profile/add_products" className="pe-nav" onClick={(e) => changeMyTab("productAddition")}><BsUpload/> Add Products</Link></div>}
                    {auth.admin && <div className={`pe-tab ${tabsStatus === "productEditing"?"pe-tabed":""}`}><Link to="/profile/edit_products" className="pe-nav" onClick={(e) => changeMyTab("productEditing")}><BsScissors/> Edit Products</Link></div>}
                    {auth.admin && <div className={`pe-tab ${tabsStatus === "Order"?"pe-tabed":""}`}><Link to="/profile/orders" className="pe-nav" onClick={(e) => changeMyTab("Order")}><BsFillCartCheckFill/> Orders</Link></div>}
                    {auth.admin && <div className={`pe-tab ${tabsStatus === "Processed"?"pe-tabed":""}`}><Link to="/profile/processed" className="pe-nav" onClick={(e) => changeMyTab("Processed")}><BsFillCartCheckFill/> Processed</Link></div>}
                    {<div className={`pe-tab ${tabsStatus === "MyOrder"?"pe-tabed":""}`}><Link to="/profile/history" className="pe-nav" onClick={(e) => changeMyTab("MyOrder")}><BsFillCartCheckFill/> My Orders</Link></div>}
                    {auth.admin && <div className={`pe-tab ${tabsStatus === "Analysis"?"pe-tabed":""}`}><Link to="/profile/analysis" className="pe-nav" onClick={(e) => changeMyTab("Analysis")}><BsPieChartFill/> Analysis</Link></div>}
                    <div className="pe-tab"><button className="pe-nav" onClick={handleLogout}><BsArrowBarLeft/> Logout</button></div>
                </div>
                <div className="pe-pages">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth:state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutHim: () => dispatch(logout()),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)



