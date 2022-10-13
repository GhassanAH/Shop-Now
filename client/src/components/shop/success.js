import React,{useEffect, useState} from 'react'
import {NavLink as Link} from "react-router-dom"
import "../../css/products/success.css"
import { connect } from 'react-redux'
import {addNewItem} from '../../actions'
import {BsFillCheckCircleFill, BsFillQuestionCircleFill} from "react-icons/bs"




const Success = ({checkout, invoice, addItemToCart}) => {
    const [CustomerData, setCustomerData] = useState(null)
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(null)
    const [subtotal, setSubtotal] = useState(null)
    const [shipping, setShipping] = useState(null)
    const [applied, setApplied] = useState(null)
    const [discountVal, setDiscountVal] = useState([])
    const [discountCode, setDiscountCode] = useState([])

    useEffect(() => {
        addItemToCart([])
    },[])

    useEffect(() => {
        if(checkout && invoice){
            setTotal(checkout.total)
            setSubtotal(checkout.subTotal)
            setShipping(checkout.shipping)
            setDiscountVal(checkout.discount)
            setDiscountCode(checkout.code)
            setItems(checkout.items)
            setApplied(checkout.discountApplied)
            setCustomerData(invoice)
        }
    }, [checkout,invoice])

    return (
        <div className="s-con">
            {items.length !== 0 && 
            <div className="s-cov">
                <div className="s-success">
                   <h1 className="s-he1"><BsFillCheckCircleFill className="s-icon"/>  <div className="s-txt">You have Paid Successfully.</div></h1>
                   <h2 className="s-he2"><BsFillQuestionCircleFill className="s-icon"/> <div className="s-txt">The shipping will take two to three days.</div></h2>
                   <h2 className="s-he2"><BsFillQuestionCircleFill className="s-icon"/> <div className="s-txt">Note if you did not get your order withen the specified day. you should contact the sell right away.</div></h2>
                </div>
                <div className="s-header">
                    <div className="s-hd1">Product</div>
                    <div className="s-hd2">Quantity</div>
                    <div className="s-hd2">Price</div>
                    <div className="s-hd2">Total</div>
                </div>
                {items.map((item, index) => {
                    return <div className="s-item" key={index}>
                                <img className="s-img" src={item.image} />
                                <div className="s-pod">
                                    <div className="s-pod-it">
                                        <div className="s-pod-it-por">{item.title}</div>
                                        <div className="s-pod-it-por">Size: {item.size}</div>
                                    </div>
                                </div>
                                <div className="s-por">{item.quantity}</div>
                                <div className="s-por">${item.price}</div>
                                <div className="s-por">${item.total}</div>
                           </div>
                })

                }
            <div className="s-invoice">
                <div className="s-sec1">
                    <div className="s-in-del"><div>Customer Information</div></div>
                    <div className="s-in-del"><div>Name</div> <span>{CustomerData.Name}</span></div>
                    <div className="s-in-del"><div>Email</div> <span>{CustomerData.Email}</span></div>
                    <div className="s-in-del"><div>Phone</div> <span>{CustomerData.Phone}</span></div>
                    <div className="s-in-del"></div>
                    <div className="s-in-del"></div>
                    <div className="s-in-del"><div>Seller Information</div></div>
                    <div className="s-in-del"><div>Name</div> <span>Hamed</span></div>
                    <div className="s-in-del"><div>Email</div> <span>hamed@gmail.com</span></div>
                    <div className="s-in-del"><div>Phone</div> <span>+968 93421234</span></div>
                </div>
                <div className="s-sec2">
                    <div className="s-in-del"><div>Subtotal</div> <span>${subtotal}</span></div>
                    <div className="s-in-del"><div>Shipping</div> <span>${shipping}</span></div>
                    {applied && <div className="s-in-del"><div>Discount Percentage</div> <span>{discountVal.join("% ")}%</span></div>}
                    {applied && <div className="s-in-del"><div>Discount Code</div> <span>{discountCode.join(" ")}</span></div>}
                    <div className="s-in-del"><div>Total</div> <span>${total}</span></div>
                    <div className="s-in-sh">Tax included. Shipping is calculated at checkout.</div>
                    <div className="s-in-btns">
                        <Link to="/" className="s-link"><button className="s-btn">Continue Shopping</button></Link>
                    </div>
                </div>

            </div>
            </div>
            
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        checkout: state.checkout,
        invoice:state.invoice
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (item) => dispatch(addNewItem(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Success)
