import React, {useState, useEffect} from 'react'
import "../../css/profile/info.css"
import {BsFillPencilFill, BsCheckSquareFill} from "react-icons/bs"
import Select from "react-select";
import countryList from 'react-select-country-list'
import PhoneInput,{ isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux' 
import {updateInfo} from '../../actions'
import LoadingSpinner from '../loadingSpinner';




const Info = ({updateTheInfo, profile, auth}) => {

    const [email, setEmail] = useState(auth.user.email || "")
    const [phone, setPhone] = useState(auth.user.phone || "")
    const [country, setCountry] = useState(auth.user.country || "")
    const [address, setAddress] = useState(auth.user.address || "")
    const [details, setDetails] = useState(auth.user.details || "")
    const [city, setCity] = useState(auth.user.city || "")
    const [postal, setPostal] = useState(auth.user.postalCode || "")
    const [selCoun, setSelCoun] = useState(null)
    const [credit, setCredit] = useState(auth.user.creditCardNumber || "")
    const [card, setCard] = useState(auth.user.cardName || "")
    const [exp, setExp] = useState(auth.user.exp || "")
    const [cvc, setCvc] = useState(auth.user.cvc || "")
    const [name, setName] = useState(auth.user.name || "")
    const [ch, setCh] = useState(false)
    const [ch1, setCh1] = useState(false)
    const [ch2, setCh2] = useState(false)
    const [ch3, setCh3] = useState(false)
    const [ch4, setCh4] = useState(false)
    const [ch5, setCh5] = useState(false)
    const [ch6, setCh6] = useState(false)
    const [ch7, setCh7] = useState(false)
    const [ch8, setCh8] = useState(false)
    const [ch9, setCh9] = useState(false)
    const [ch10, setCh10] = useState(false)
    const [ch11, setCh11] = useState(false)
    const options = countryList().getData()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    useEffect(() => {
        
    })

    useEffect(() => {
        if(profile){
            setLoading(false)
            if(profile.success && profile.message === "information successfully added"){
                setSuccess(true)
                setError(false)
                setMessage(profile.message)
                window.scrollTo(0, 0);
            }else if(profile.success === false && profile.message === "information unsuccessfully added"){
                setSuccess(false)
                setError(true)
                setMessage(profile.message)
                window.scrollTo(0, 0);
                
            }
        }
    }, [profile])

    

    const handleSelect = (val) => {
        setCountry(val.label)
        setSelCoun(val)
    }


    const handleOpen = (e, val) => {
        e.preventDefault()
        switch(val){
            case "0":
                setCh(true)
                return
            case "1":
                setCh1(true)
                return
            case "2":
                setCh2(true)
                return
            case "3":
                setCh3(true)
                return
            case "4":
                setCh4(true)
                return
            case "5":
                setCh5(true)
                return
            case "6":
                setCh6(true)
                return
            case "7":
                setCh7(true)
                return
            case "8":
                setCh8(true)
                return
            case "9":
                setCh9(true)
                return
            case "10":
                setCh10(true)
                return
            case "11":
                setCh11(true)
                return
        }

    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const handleClose = (e, val) => {
        e.preventDefault()
        switch(val){
            case "0":
                setCh(!validateEmail(email))
                return
            case "1":
                setCh1(!isValidPhoneNumber(phone))
                return
            case "2":
                setCh2(false)
                return
            case "3":
                setCh3(false)
                return
            case "4":
                setCh4(false)
                return
            case "5":
                setCh5(false)
                return
            case "6":
                setCh6(false)
                return
            case "7":
                var cardNum = credit.replaceAll(" ", "")
                var cardTest = Number(cardNum)
                var cardlength = credit.length < 20
                setCh7(!Number.isInteger(cardTest) || cardlength)
                return
            case "8":
                setCh8(false)
                return
            case "9":
                setCh9(validExp(exp))
                return
            case "10":
                setCh10(false)
                return
            case "11":
                setCh11(false)
                return
        }

    }
    const handleCardDisplay = () => {
        const rawText = [...credit.split(' ').join('')] 
        const creditCard = [] 
        rawText.forEach((t, i) => {
            if (i % 4 === 0) creditCard.push(' ') 
            creditCard.push(t)
        })
        return creditCard.join('') 
    }

    const handleCVCDisplay = () => {
        const rawText = [...exp.split('/').join('')] 
        const creditCard = [] 
        rawText.forEach((t, i) => {
            if (i !== 0 && i % 2 === 0) creditCard.push('/') 
            creditCard.push(t)
        })
        return creditCard.join('') 
    }

    const validExp = (val) => {
        if(val.length === 5){
            var cvcNum = val.split("/")
            if(cvcNum.length === 2){
                var f = Number(cvcNum[0])
                var s  = Number(cvcNum[1])
                if(Number.isInteger(f) && Number.isInteger(s)){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

    const hadleSubmmisition = (e) => {
        e.preventDefault()
        setLoading(true)

        if(!ch && !ch1 && !ch2 && !ch3 && !ch4 && !ch5 && !ch6 && !ch7 && !ch8 && !ch9 && !ch10){
            var information = {
                id:auth.user._id,
                name:name,
                phone:phone,
                country:country,
                address:address,
                details:details,
                city:city,
                postalCode:postal,
                creditCardNumber:credit,
                cardName:card,
                exp:exp,
                cvc:cvc
            }
            updateTheInfo(information)   

        }else{
            setSuccess(false)
            setLoading(false)
            setError(true)
            setMessage("Please confirm all changes and correct any errors")
        }

    }


    return (
        <div className="io-con">
            <div className="io-cov">
                {loading && <LoadingSpinner/>}
                {success && <div className="io-success">{message}</div>}
                {error && <div className="io-error">{message}</div>}
                <div className="io-info">
                    <h1 className="io-he1">Your Information </h1>
                    <div className="io-he2">
                        {ch11 && <input value={name} className="io-inp" onChange={(e) => setName(e.target.value)}/>}
                        {!ch11 && <div className="io-txt"><div>Name:</div> <div>{name}</div> </div>}
                        {!ch11 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "11")}><BsFillPencilFill /></button></div>} 
                        {ch11 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "11")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch && <input value={email} className="io-inp" onChange={(e) => setEmail(e.target.value)}/>}
                        {!ch && <div className="io-txt"><div>Email:</div> <div>{email}</div> </div>}
                        {!ch && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "0")}><BsFillPencilFill /></button></div>} 
                        {ch && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "0")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch1 && <PhoneInput value={phone} className="io-inp" onChange={(p) => setPhone(p)}/>}
                        {!ch1 && <div className="io-txt"><div>Phone Number:</div> <div>{phone}</div></div>} 
                        {!ch1 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "1")}><BsFillPencilFill /></button></div>}
                        {ch1 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "1")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch2 && <Select options={options} value={selCoun} className="io-inp" onChange={(value) => handleSelect(value)}/>}
                        {!ch2 && <div className="io-txt"><div>Country:</div> <div>{country}</div></div>} 
                        {!ch2 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "2")}><BsFillPencilFill /></button></div>}
                        {ch2 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "2")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch3 && <input value={address} className="io-inp" onChange={(e) => setAddress(e.target.value)}/>}
                        {!ch3 && <div className="io-txt"><div>Address:</div> <div> {address}</div></div>} 
                        {!ch3 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "3")}><BsFillPencilFill /></button></div>}
                        {ch3 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "3")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch4 && <input value={details} className="io-inp" onChange={(e) => setDetails(e.target.value)}/>}
                        {!ch4 && <div className="io-txt"><div>Details:</div> <div> {details}</div></div>} 
                        {!ch4 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "4")}><BsFillPencilFill /></button></div>}
                        {ch4 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "4")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch5 && <input value={city} className="io-inp" onChange={(e) => setCity(e.target.value)}/>}
                        {!ch5 && <div className="io-txt"><div>City:</div> <div> {city}</div></div>} 
                        {!ch5 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "5")}><BsFillPencilFill /></button></div>}
                        {ch5 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "5")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch6 && <input type="number" value={postal} className="io-inp" onChange={(e) => setPostal(e.target.value)}/>}
                        {!ch6 && <div className="io-txt"><div>Postal Code:</div> <div> {postal}</div></div>} 
                        {!ch6 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "6")}><BsFillPencilFill /></button></div>}
                        {ch6 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "6")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch7 && <input placeholder={credit} value={handleCardDisplay()} className="io-inp" onChange={(e) => setCredit(e.target.value)} maxLength="20"/>}
                        {!ch7 && <div className="io-txt"><div>Credit Card:</div> <div> {credit}</div></div>} 
                        {!ch7 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "7")}><BsFillPencilFill /></button></div>}
                        {ch7 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "7")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch8 && <input value={card} className="io-inp" onChange={(e) => setCard(e.target.value)}/>}
                        {!ch8 && <div className="io-txt"><div>Card Name:</div> <div> {card}</div></div>} 
                        {!ch8 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "8")}><BsFillPencilFill /></button></div>}
                        {ch8 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "8")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch9 && <input maxLength="5" value={handleCVCDisplay()} placeholder={exp} className="io-inp" onChange={(e) => setExp(e.target.value)}/>}
                        {!ch9 && <div className="io-txt"><div>Exp:</div> <div> {exp}</div></div>} 
                        {!ch9 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "9")}><BsFillPencilFill /></button></div>}
                        {ch9 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "9")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        {ch10 && <input type="number" value={cvc} className="io-inp" onChange={(e) => setCvc(e.target.value)}/>}
                        {!ch10 && <div className="io-txt"><div>CVC:</div> <div> {cvc}</div></div>} 
                        {!ch10 && <div className="io-icon"><button className="io-i" onClick={(e) => handleOpen(e, "10")}><BsFillPencilFill /></button></div>}
                        {ch10 && <div className="io-icon"><button className="io-i" onClick={(e) => handleClose(e, "10")}><BsCheckSquareFill /></button></div> }
                    </div>
                    <div className="io-he2">
                        <div className="io-txt">Thank you for using our service</div>
                    </div>
                    <div className="io-btns">
                        <button className="io-btn" onClick={(e) => hadleSubmmisition(e)}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth:state.auth,
        profile:state.profile
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        updateTheInfo: (information) => dispatch(updateInfo(information)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
