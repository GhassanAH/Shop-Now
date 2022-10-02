import React,{useState, useEffect} from 'react'
import "../../css/products/payment.css"
import {Visa, Mastercard, Western, Discover } from "react-pay-icons";
import { connect } from 'react-redux'
import {payByPayPal, payByMasterCard, setInvoice} from '../../actions'
import {useNavigate, useLocation} from "react-router-dom"
import Loading from 'react-loading-components';
import LoadingSpinner from '../../components/loadingSpinner';


const Payment = ({checkout, payment, payByThePayPal, payByTheMasterCard, setInvoiceInfo, auth}) => {
    const [card, setCard] = useState(auth.user?auth.user.creditCardNumber: '')
    const [cvc, setCVC] = useState(auth.user? auth.user.exp: '')
    const [cardName, setCardName] = useState(auth.user?auth.user.cardName: '')
    const [exp, setExpiryDate] = useState(auth.user?auth.user.cvc: '')
    const [valid1, setValid1] = useState(true)
    const [valid2, setValid2] = useState(true)
    const [valid3, setValid3] = useState(true)
    const [total, setTotal] = useState(null)
    var location = useNavigate()
    var cardNumber = ''
    const [load, setLoad] = useState(false)
    const info = useLocation()
    const [CustomerData, setCustomerData] = useState(null)
    const [loading, setLoading] = useState(false)

    


    useEffect(() => {
        if(checkout && info.state){
            setTotal(checkout.total)
            setCustomerData(info.state.data)
        }
    }, [checkout])

    useEffect(() => {
        if(payment){
            if(payment.message === "successfully paid"){
                setLoad(false)
                location("/success")
            
            }else if(payment.message === "unsuccessfully paid"){
                setLoad(false)
            }else if(payment.message === "unsuccessfully paid by paypal"){
                setLoad(false)
            }else if(payment.message === "successfully paid by paypal"){
                setLoad(false)
                location("/success")
            }else if(payment.message === "redirect url"){
                setLoading(false)
                window.location.href = payment.url
            }
            else{
                setLoad(false)
            }
        }
    }, [payment])

    const handleCardDisplay = () => {
        const rawText = [...card.split(' ').join('')] 
        const creditCard = [] 
        rawText.forEach((t, i) => {
            if (i % 4 === 0) creditCard.push(' ') 
            creditCard.push(t)
        })
        return creditCard.join('') 
    }

    const handleCVCDisplay = () => {
        const rawText = [...cvc.split('/').join('')] 
        const creditCard = [] 
        rawText.forEach((t, i) => {
            if (i !== 0 && i % 2 === 0) creditCard.push('/') 
            creditCard.push(t)
        })
        return creditCard.join('') 
    }

    const payByMaster = (e) => {
        e.preventDefault()
        setLoad(true)
        setInvoiceInfo(CustomerData)
        const done = validate()
        if(done){
            var expDate = cvc.split("/")
            var month = parseInt(expDate[0],10)
            var year = parseInt(expDate[1],10)
            var amount = Number(total)
            var description = "This is payment from ShopNow"
            var products = [];
            var sizes = [];
            var quantity = [];

            for(var i = 0; i < CustomerData.items.length; i++){
                products = [...products, CustomerData.items[i].id]
                sizes = [...sizes, CustomerData.items[i].size]
                quantity = [...quantity, CustomerData.items[i].quantity]
                console.log(quantity)

            }
            const seller = {
                email:CustomerData.Email,
                phone:CustomerData.Phone,
                country:CustomerData.Country,
                address:CustomerData.Address,
                details:CustomerData.Details,
                city:CustomerData.City,
                postal:CustomerData.PostalCode,
            }
            console.log(seller)
            payByTheMasterCard(cardNumber, month, year, exp, amount, description, products, seller, CustomerData.discountApplied, sizes, quantity)
        }else{
            setLoad(false)
        }
    }

    const payByPayPal = (e) => {
        e.preventDefault()
        setLoading(true)
        var products = [];
        var sizes = [];
        var quantity = [];
        for(var i = 0; i < CustomerData.items.length; i++){
            products = [...products, CustomerData.items[i].id]
            sizes = [...sizes, CustomerData.items[i].size]
            quantity = [...quantity, CustomerData.items[i].quantity]

        }

        const seller = {
            email:CustomerData.Email,
            phone:CustomerData.Phone,
            country:CustomerData.Country,
            address:CustomerData.Address,
            details:CustomerData.Details,
            city:CustomerData.City,
            postal:CustomerData.PostalCode,
        }
        setInvoiceInfo(CustomerData)
        var amount = Number(total)
        var description = "This is payment from ShopNow"

        payByThePayPal(cardName, amount,quantity, description,products, seller, CustomerData.discountApplied, sizes, quantity)
    }

    const validate = () => {
        var valid1 = false;
        var valid2 = false;
        var valid3 = false;
        const exp1 = new String(exp)
        if(card.length === 20){
            var cardNum = card.replaceAll(" ", "")
            var cardNum2 = Number(cardNum)
            if(Number.isInteger(cardNum2)){
                valid1 = true;
                cardNumber = cardNum
            }
        }
        if(cvc.length === 5){
            var cvcNum = cvc.split("/")
            if(cvcNum.length === 2){
                var f = Number(cvcNum[0])
                var s  = Number(cvcNum[1])
                if(Number.isInteger(f) && Number.isInteger(s)){
                    valid2 = true
                }
            }
        }if(exp1.length === 3){
            var f2 = Number(exp1)
            if(Number.isInteger(f2)){
                valid3 = true
            }
        }
        setValid1(valid1)
        setValid2(valid2)
        setValid3(valid3)
        return valid1 && valid2 && valid3
    }

    return (
        <div className="p-con">
            {total &&
                <div className="p-cov">
                <div className="p-msc">
                    <div className="p-c-header">
                        <h2 className="p-he2">Credit Card</h2>
                        <div className="p-pay-icons">
                            <Visa className="p-icon" />
                            <Mastercard className="p-icon" />
                            <Western className="p-icon"/>
                            <Discover className="p-icon"/>
                        </div>
                    </div>
                    {loading && <LoadingSpinner/>}

                    <form className="p-form">
                        <label className="p-label">Card Number</label>
                        <input type="card" className={`p-field ${!valid1? "alert":""}`}  placeholder="xxxx xxxx xxxx xxxx" value={handleCardDisplay()}  onChange={(e) => setCard(e.target.value)} maxLength="20"/>
                        {!valid1 && <div className="stat">Please enter valid Card Number</div>}
                        <label className="p-label">Card Name</label>
                        <input type="card" className="p-field" placeholder="Card Name" value={cardName} onChange={(e) => setCardName(e.target.value)}/>
                        <div className="p-dual">
                            <div className="p-dual-col">
                                <label className="p-label">Expiration date</label>
                                <input type="card" className={`p-field ${!valid2? "alert":""}`} placeholder="MM/YY" value={handleCVCDisplay()}  onChange={(e) => setCVC(e.target.value)} maxLength="5"/>
                                {!valid2 && <div className="stat">Please enter valid Expiration date</div>}
                            </div>
                            <div className="p-dual-col">
                                <label className="p-label">Security Code</label>
                                <input type="card" className={`p-field ${!valid3? "alert":""}`} value={exp} placeholder="xxx" maxLength="3" onChange={(e) => setExpiryDate(e.target.value)}/>
                                {!valid3 && <div className="stat">Please enter valid Security Code</div>}
                            </div>

                        </div>
                        <div className="p-btns">
                            <button className="p-btn" onClick={(e) => payByMaster(e)}>Pay ${total} usd {load && <Loading type='oval' width={20} height={20} fill='#ffffff' />}</button>
                        </div>
                    </form>
                    <div className="p-footer">
                        <div className="p-btns">
                            <button className="p-btn" onClick={(e) => payByPayPal(e)}><img className="p-img" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png"/></button>
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
        payment:state.pay,
        auth:state.auth
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        payByTheMasterCard: (number, month, year, cvc, amount, description, products, seller, discountApplied,size,quantity) => dispatch(payByMasterCard(number, month, year, cvc, amount, description, products, seller, discountApplied,size,quantity)),
        payByThePayPal: (name, price, quantity, description, products, seller, discountApplied,size) => dispatch(payByPayPal(name, price, quantity, description, products, seller, discountApplied,size)),
        setInvoiceInfo:(item) => dispatch(setInvoice(item)),
    
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Payment)
