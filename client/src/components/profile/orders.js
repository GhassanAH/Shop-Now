import React,{useEffect, useState, useRef} from 'react'
import "../../css/profile/orders.css"
import { connect } from 'react-redux' 
import {getOrders, setShipping} from '../../actions'
import LoadingSpinner from '../../components/loadingSpinner';
import ReactToPrint from 'react-to-print';



const Orders = ({getTheOrders, order, setTheShippping}) => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState(false)
    const [searchChoice, setSearchChoice] = useState("All")
    const [searchValue, setSearchValue] = useState("")
    const [allOrders, setAllOrders] = useState([])
    let componentRef = useRef([]);




    useEffect(() => {
        if(order){
            if(order.success){
                if(order.message === "shipping has been added"){
                    getTheOrders()
                }else{
                    setOrders(order.orders)
                    setAllOrders(order.orders);
                    setLoading(false)

                }
                setSuccess(true)
                setError(false)
                setMessage(order.message)
                setInterval(() => {
                    setSuccess(false)
                },[5000])
               
            }else if(order.success === false && order.message === "orders unsuccessfully fetched"){
                setMessage(order.message)
                setError(true)
                setSuccess(false)
                setLoading(false)
            }
        }
    },[order])

    useEffect(() => {
        getTheOrders()
        setLoading(true)
    },[])

    const handleSearchEvent = (e) => {
        e.preventDefault();
        getOrdersBy(searchChoice, searchValue)

    }

    const getOrdersBy = (key, value) => {
        var result
        switch(key){
            case "Email":
                result = allOrders.filter((order) => order.email === value)
                setOrders(result)
                break;
            case "PhoneNumber":
                result = allOrders.filter((order) => order.phone === value)
                setOrders(result)
                break;
            case "Country":
                result = allOrders.filter((order) => order.country === value)
                setOrders(result)
                break;
            case "Address":
                result = allOrders.filter((order) => order.address === value)
                setOrders(result)
                break;
            case "CreditCard":
                result = allOrders.filter((order) => order.creditCardNumber === value)
                setOrders(result)
                break;
            case "Details":
                result = allOrders.filter((order) => order.details === value)
                setOrders(result)
                break;
            case "City":
                result = allOrders.filter((order) => order.city === value)
                setOrders(result)
                break;
            case "PostalCode":
                result = allOrders.filter((order) => order.postalCode === value)
                setOrders(result)
                break;
            case "gTotal":
                result = allOrders.filter((order) => order.totalPaid >= value)
                setOrders(result)
                break;
            case "lTotal":
                result = allOrders.filter((order) => order.totalPaid <= value)
                setOrders(result)
                break;
            case "shipped":
                result = allOrders.filter((order) => order.shipped === true)
                setOrders(result)
                break;
            case "notShipped":
                result = allOrders.filter((order) => order.shipped === false)
                setOrders(result)
                break;
            default:
                setOrders(allOrders)
                break;

        }
    }

    const formatDateString = (dateString) => {
        let ms = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[ms.getMonth()] + " " + ms.getDate() + " " + ms.getFullYear() 
    }

    const setShipped = (e, id) => {
        e.preventDefault();
        setLoading(true)
        setTheShippping(id)
        setOrders([])
        window.scrollTo(0, 0);
    }

    

    return (
        <div className="or-con">
            <div className="or-cov">
                {loading && <LoadingSpinner/>}
                {success && <div className="or-success">{message}</div>}
                {error && <div className="or-error">{message}</div>}
                <div className="or-search">
                    <div className="or-sec">
                        <input className="or-search-inp" type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Search For A Specific Order..." />
                        <button className="or-search-btn" onClick={(e) => handleSearchEvent(e)}>Search</button>
                    </div>
                    <div className="or-sec2">
                        <label className="or-label">
                            <input  type="radio" value="All" checked={searchChoice ==="All"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            All          
                        </label> 
                        <label className="or-label">
                            <input  type="radio" value="Email" checked={searchChoice ==="Email"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            Email          
                        </label> 
                        <label className="or-label">
                            <input  type="radio" value="PhoneNumber" checked={searchChoice ==="PhoneNumber"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            Phone Number          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="Country" checked={searchChoice ==="Country"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            Country          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="Address" checked={searchChoice ==="Address"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            Address          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="CreditCard" checked={searchChoice ==="CreditCard"} onChange={(e) => setSearchChoice(e.target.value)}/>
                            Credit Card          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="Details" checked={searchChoice ==="Details"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            Details          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="City" checked={searchChoice ==="City"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            City          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="PostalCode" checked={searchChoice ==="PostalCode"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            Postal Code          
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="gTotal" checked={searchChoice ==="gTotal"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                             X {">="} Total        
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="lTotal" checked={searchChoice ==="lTotal"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            X {"<="} Total       
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="shipped" checked={searchChoice ==="shipped"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            Shipped       
                        </label>
                        <label className="or-label">
                            <input  type="radio" value="notShipped" checked={searchChoice ==="notShipped"}  onChange={(e) => setSearchChoice(e.target.value)}/>
                            Not Shipped       
                        </label>
                    </div>
        
                </div>
                {orders && <div className="or-orders">
                    {orders.map((order, index) => {
                        return <div className="or-order-list" key={index}  ref={(element) => {componentRef.current[index] = element}} >
                                    <ReactToPrint
                                        trigger={() => <button className="print-btn">Print this out!</button>}
                                        content={() => componentRef.current[index]}
                                    />
                                    {!order.shipped && <button className="print-btn" onClick={(e) => setShipped(e, order.id)}>Set the shipping</button>}
                                    <div className="or-order"> 
                                        <div className="or-seller">
                                            <h2  className="or-he2">Customer Information</h2>
                                            <div className="or-he3">Order ID: {order.id}</div>
                                            <div className="or-he3">Email: {order.email}</div>
                                            <div className="or-he3">Phone: {order.phone}</div>
                                            <div className="or-he3">Country: {order.country}</div>
                                            <div className="or-he3">Address: {order.address}</div>
                                            <div className="or-he3">Details: {order.details}</div>
                                            <div className="or-he3">City: {order.city}</div>
                                            <div className="or-he3">Postal Code: {order.postalCode}</div>
                                        </div>
                                        <div className="or-extra">
                                            <div className="or-payment">
                                                <h2  className="or-he2">Payment Information</h2>
                                                <div className="or-he3">Payment Method: {order.payment_method}</div>
                                                {order.creditCardNumber &&<div className="or-he3">Creadit Card Number: {order.creditCardNumber}</div>}
                                                {order.cardName && <div className="or-he3">Card Name: {order.cardName}</div>}
                                                <div className="or-he3">orderedAt: {formatDateString(order.orderedAt)}</div>
                                            </div>
                                            <div className="or-ordered">
                                                <h2  className="or-he2">Order Information</h2>
                                                <div className="or-he3">Discount: {order.discountApplied?"applied":"not applied"}</div>
                                                {order.discountApplied && <div className="or-he3">Discount Code: {order.discountCode.join(" ")}</div>}
                                                {order.discountApplied && <div className="or-he3">Discount Percentage: {order.discountPercentage.join("% ")}%</div>}
                                                <div className="or-he3">Shipped: {order.shipped? "Yes":"No"}</div>
                                                <div className="or-he3">Total: ${order.totalPaid}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="or-product">
                                        <div className="or-header">
                                            <div className="or-hd0">#</div>
                                            <div className="or-hd1">Product</div>
                                            <div className="or-hd2">Quantity</div>
                                            <div className="or-hd2">Price</div>
                                            <div className="or-hd2">Subtotal</div>
                                        </div>
                                        {order.products.map((item, index) => {
                                            return <div className="or-item" key={index}>
                                                        <div className="or-rank">{index + 1}</div>
                                                        <img className="or-img" src={item.cover} />
                                                        <div className="or-pod">
                                                            <div className="or-pod-it">
                                                                <div className="or-pod-it-por">{item.name}</div>
                                                                <div className="or-pod-it-por">Size: {order.size && order.size[index]}</div>
                                                            </div>
                                                        </div>
                                                        <div className="or-por">{order.quantity && order.quantity[index]}</div>
                                                        <div className="or-por">${item.price}</div>
                                                        <div className="or-por">${order.quantity && item.price * order.quantity[index]}</div>
                                                </div>
                                             })
                                        }
                                    </div>
                                </div>
                    })

                    }
                </div>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order:state.orders
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        getTheOrders: () => dispatch(getOrders()),
        setTheShippping: (id) => dispatch(setShipping(id)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
