import React,{useEffect, useState} from 'react'
import "../../css/products/checkout.css"
import { Visa, Mastercard, Paypal, Applepay, Western, Googlepay,Discover } from "react-pay-icons";
import { connect } from 'react-redux'
import countryList from 'react-select-country-list'
import Select from "react-select";
import 'react-phone-number-input/style.css'
import PhoneInput,{ isValidPhoneNumber } from 'react-phone-number-input'
import {useNavigate} from "react-router-dom"
import {getCode} from "country-list"
import {getCheckOut} from '../../actions'





const Checkout = ({checkout, auth, sendCheckOut}) => {
    const [total, setTotal] = useState(null)
    const [subtotal, setSubtotal] = useState(null)
    const [shipping, setShipping] = useState(null)
    const [code, setCode] = useState(null)
    const [discountVal, setDiscountVal] = useState(null)
    const [Name, setName] = useState(auth.user?auth.user.name: '')
    const [Email, setEmail] = useState(auth.user?auth.user.email: '')
    const [phone, setPhone] = useState(auth.user?auth.user.phone.replace(" ","") : "+")
    const [country, setCountry] = useState(auth.user?{label:auth.user.country,value:getCode(auth.user.country)}: '')
    const [Address, setAddress] = useState(auth.user?auth.user.address:'')
    const [Details, setDetails] = useState(auth.user?auth.user.details: '')
    const [City, setCity] = useState(auth.user?auth.user.city: '')
    const [Postal, setPostal] = useState(auth.user?auth.user.postalCode: '')
    const [Discount, setDiscount] = useState('')
    const [items, setItems] = useState(null)
    const options = countryList().getData()
    const [dStatus, setDstatus] = useState(false)
    const [Error, setError] = useState("")
    const navigator = useNavigate();

    useEffect(() => {
        if(checkout){
            setTotal(checkout.total)
            setSubtotal(checkout.subTotal)
            setShipping(checkout.shipping)
            setCode(checkout.code)
            setDiscountVal(checkout.discount)
            setItems(checkout.items)
            
        }
    }, [checkout])

    const changeHandler = value => {
        setCountry(value)
    }

    const applyDiscount = () => {
        var t = total
        for(var i = 0; i<code.length; i++){
            if(Discount === code[i]){
                const discountValue = items[i].price * (discountVal[i] / 100)
                t = t - discountValue
                setDstatus(true)

            }
        }
        setTotal(t)

       
    }

    const handleFormSubmmision = () => {
        if(Name && Email && validateEmail(Email) && validatePhoneNumber(phone) && country.label && Address && Details && City && Postal){
            setError("")
            const data = {
                Name:Name,
                Email:Email,
                Phone:phone,
                Country:country.label,
                Address:Address,
                Details:Details,
                City:City,
                PostalCode:Postal,
                items:items,
                discountApplied:dStatus,
                discountCode:code, 
                discountPercentage:discountVal
            }
            if(dStatus){
                const data = {
                    subTotal:subtotal,
                    shipping:shipping,
                    total:total,
                    discountApplied:dStatus,
                    discount:discountVal,
                    code:code,
                    items:items
                }
                sendCheckOut(data)
            }
           
            navigator("/payment", {state:{data:data}})
        }else if(!validateEmail(Email)){
            setError("Please provide a valid email address")
            window.scrollTo(0, 0);
        }else if(!validatePhoneNumber(phone)){
            setError("Please provide a valid phone number")
            window.scrollTo(0, 0);
        }else if(!country.label){
            setError("Please provide enter your country")
            window.scrollTo(0, 0);
        }
        else{
            setError("Please Fill All Required Fields")
            window.scrollTo(0, 0);
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function validatePhoneNumber(phoneNumber){
        return isValidPhoneNumber(phoneNumber)
    }

    return (
        <div className="co-con">
            {Error &&        
                <div className="co-error">
                    <h3 className="co-he3">{Error}</h3>
                </div>
            }
            {subtotal && shipping && total &&
            <div className="co-cov">
                <div className="c-first">
                    <div className="co-info">
                        <form className="co-form">
                            <h2 className="co-he2">Personal Information</h2>
                            <label className="co-label">Name</label>
                            <input type="text" placeholder="John Smith" className="co-input" value={Name}  onChange={val => setName(val.target.value)}/>
                            <label className="co-label">Email</label>
                            <input type="email" placeholder="john@gmail.com" className="co-input"  value={Email}  onChange={val => setEmail(val.target.value)}/>
                            <label className="co-label">Phone Number</label>
                            <PhoneInput
                                value={phone}
                                onChange={phone => setPhone(phone)}

                            />
                        </form>
                    </div>
                    <div className="co-shipping">
                        <form className="co-form">
                            <h2 className="co-he2">Shipping Information</h2>
                            <label className="co-label">Country</label>
                            <Select defaultValue={country}   options={options} onChange={changeHandler}  className="co-input1"/>
                            <label className="co-label">Address</label>
                            <input type="text" placeholder="Address" className="co-input"  value={Address}  onChange={val => setAddress(val.target.value)}/>
                            <label className="co-label">Details</label>
                            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="co-input" value={Details}  onChange={val => setDetails(val.target.value)} />
                            <label className="co-label">City</label>
                            <input type="text" placeholder="City" className="co-input" value={City}  onChange={val => setCity(val.target.value)} />
                            <label className="co-label">Postal code</label>
                            <input type="number" placeholder="Postal code" className="co-input"  value={Postal}  onChange={val => setPostal(val.target.value)}/>
                        </form>
                    </div>
                </div>
                <div className="c-second">
                    <div className="co-discount">
                        <div className="co-form">
                                <h2 className="co-he2">Discount Information</h2>
                                <label className="co-label">Discount Code</label>
                                <input type="text" placeholder="Discount Code" className="co-input"  value={Discount}  onChange={val => setDiscount(val.target.value)}/>
                                <button className="co-btn" onClick={applyDiscount} disabled={dStatus}>Apply</button>
                        </div>
                    </div>
                    <div className="co-btns">
                        <div className="co-subtotal">
                            <h2 className="co-he2">Invoice Information</h2>
                            <h4 className="co-he4">Subtotal</h4>
                            <h5 className="co-he5">$ {subtotal && subtotal}</h5>
                            <h4 className="co-he4">Shipping</h4>
                            <h5 className="co-he5">$ {shipping && shipping}</h5>
                            <h4 className="co-he4">Total</h4>
                            <h5 className="co-he5">$ {total && total}</h5>
                        </div>
                        <div className="co-btn">
                            <button className="co-pay" onClick={handleFormSubmmision}>Pay Now</button>
                            <div className="f-icons">
                                <Visa className="f-icon" />
                                <Mastercard className="f-icon" />
                                <Paypal className="f-icon"/>
                                <Applepay className="f-icon"/>
                                <Western className="f-icon"/>
                                <Googlepay className="f-icon"/>
                                <Discover className="f-icon"/>
                            </div>
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
        auth:state.auth,

    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        sendCheckOut: (item) => dispatch(getCheckOut(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
