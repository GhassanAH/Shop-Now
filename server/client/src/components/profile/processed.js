import React,{useEffect, useState, useRef} from 'react'
import "../../css/profile/orders.css"
import { connect } from 'react-redux' 
import {getOrders, setNotShipping} from '../../actions'
import LoadingSpinner from '../../components/loadingSpinner';

const Processed = ({getTheOrders, order, setTheShippping}) => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState(false)
    let componentRef = useRef([]);

    useEffect(() => {
        if(order){
            if(order.success){
                if(order.message === "shipping has been canceled"){
                    getTheOrders()
                }else{
                    setOrders(order.orders)
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


    const setNotShipped = (e, id) => {
        e.preventDefault();
        setLoading(true)
        setTheShippping(id)
        setOrders([])
        window.scrollTo(0, 0);
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const newDate = d.getDate() + " " + months[d.getMonth()] + " " +  d.getFullYear()
        return newDate;
    }

    return (
        <div className="or-con">
               <div className="or-cov">
                    {loading && <LoadingSpinner/>}
                    {success && <div className="or-success">{message}</div>}
                    {error && <div className="or-error">{message}</div>}
                    {orders && <div className="or-orders">
                        {orders.map((order, index) => {
                            if(order.shipped){
                                return <div className="or-order-list" key={index}  ref={(element) => {componentRef.current[index] = element}} >
                                            <div class="or-con-btns">
                                                <button className="print-btn" onClick={(e) => setNotShipped(e, order.id)}>Not Shipped</button>
                                            </div>
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
                                                        <div className="or-he3">Ordered At: {formatDate(order.orderedAt)}</div>
                                                    </div>
                                                    <div className="or-ordered">
                                                        <h2  className="or-he2">Order Information</h2>
                                                        <div className="or-he3">Discount: {order.discountApplied?"applied":"not applied"}</div>
                                                        {order.discountApplied && <div className="or-he3">Discount Code: {order.discountCode}</div>}
                                                        {order.discountApplied && <div className="or-he3">Discount Percentage: %{order.discountPercentage}</div>}
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
                            }
                            return 
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
        setTheShippping: (id) => dispatch(setNotShipping(id)),


    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Processed)
