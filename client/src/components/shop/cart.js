import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {addNewItem, getCheckOut} from '../../actions'
import "../../css/products/cart.css"
import {NavLink as Link} from "react-router-dom"



const Cart = ({shop, addItemToCart, sendCheckOut}) => {

    const [items, setItems] = useState([])
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        setItems(shop)
        setSubTotal(getSubTotal(shop))
    },[shop])

    const getSubTotal = (items) => {
        var subtotal = 0;
        for(var i = 0; i<items.length; i++){
            subtotal = subtotal + items[i].total
        }
        return subtotal
    }

    const removeAnItem = (item) => {
        const remainingItems = items.filter((product) => product.id !== item.id || product.size !== item.size)
        addItemToCart(remainingItems)
    }
    const checkout = () => {
        var checkoutfee = 0;
        var discount = [];
        var code = [];
        for(var i = 0; i<items.length; i++){
            checkoutfee = checkoutfee + items[i].shipping
            discount = [...discount, items[i].discount]
            code = [...code, items[i].code]
        }
        
        var total = subTotal + checkoutfee;
        const data = {
            subTotal:subTotal,
            shipping:checkoutfee,
            total:total,
            discount:discount,
            code:code,
            items:items
            
        }
        sendCheckOut(data)

    }

    return (
        <div className="c-con">
            {items.length !== 0 && 
            <div className="c-cov">
                <div className="c-header">
                    <div className="c-hd1">Product</div>
                    <div className="c-hd2">Quantity</div>
                    <div className="c-hd2">Price</div>
                    <div className="c-hd2">Total</div>
                </div>
                {items.map((item, index) => {
                    return <div className="c-item" key={index}>
                                <img className="c-img" src={item.image} />
                                <div className="c-pod">
                                    <div className="c-pod-it">
                                        <div className="c-pod-it-por">{item.title}</div>
                                        <div className="c-pod-it-por">Size: {item.size}</div>
                                        <button className="c-btn" onClick={e => removeAnItem(item)}>Remove</button>
                                    </div>
                                </div>
                                <div className="c-por">{item.quantity}</div>
                                <div className="c-por">${item.price}</div>
                                <div className="c-por">${item.total}</div>
                           </div>
                })

                }
                <div className="c-invoice">
                    <div className="c-in-del"><div>Subtotal</div> <span>${subTotal}</span></div>
                    <div className="c-in-sh">Tax included. Shipping calculated at checkout.</div>
                    <div className="c-in-btns">
                        <Link to="/checkout" className="c-link"><button className="c-btn" onClick={checkout}>Check Out</button></Link>
    
                    </div>
                </div>
            </div>}
            {items.length === 0 &&
            <div className="c-empty">
                <h1>The Cart is Empty</h1>
            </div>
            }
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
      shop: state.shop
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (item) => dispatch(addNewItem(item)),
        sendCheckOut: (item) => dispatch(getCheckOut(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
