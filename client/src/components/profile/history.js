import React,{useEffect, useState} from 'react'
import "../../css/profile/orders.css"
import { connect } from 'react-redux' 
import {getUserOrders} from '../../actions'
import LoadingSpinner from '../../components/loadingSpinner';

const History = ({getTheOrders, order}) => {

    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState(false)


    useEffect(() => {
        if(order){
            setLoading(false)
            if(order.success){
                setOrders(order.orders)
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
            }
            setLoading(false)
        }
    },[order])

    useEffect(() => {
        getTheOrders()
        setLoading(true)
    },[])

    return (
        <div className="or-con">
            <div className="or-cov">
                {loading && <LoadingSpinner/>}
                {success && <div className="or-success">{message}</div>}
                {error && <div className="or-error">{message}</div>}
                {orders && <div className="or-orders">
                    {orders.map((order, index) => {
                        return <div className="or-order-list" key={index}>
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
                                                <div className="or-he3">{order.payment_method}</div>
                                                {order.creditCardNumber &&<div className="or-he3">{order.creditCardNumber}</div>}
                                                {order.cardName && <div className="or-he3">{order.cardName}</div>}
                                                <div className="or-he3">{order.orderedAt}</div>
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
        getTheOrders: () => dispatch(getUserOrders()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

