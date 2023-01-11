import React from 'react'
import "../../css/products/cancel.css"
import {BsFillQuestionCircleFill, BsFillEmojiFrownFill} from "react-icons/bs"


const Cancel = () => {
    return (
        <div className="ca-con">
            <div className="ca-error">
                <h1 className="ca-he1"><BsFillEmojiFrownFill className="ca-icon"/> Error Message</h1>
            </div>
            <div className="ca-error">
                <h2 className="ca-he1"><BsFillQuestionCircleFill className="ca-icon"/><div className="ca-txt">Something Wrong Happened Try to pay again</div></h2>
                <h2 className="ca-he1"><BsFillQuestionCircleFill className="ca-icon"/><div className="ca-txt">This message informs you that something happened when you were paying</div></h2>
                <h2 className="ca-he1"><BsFillQuestionCircleFill className="ca-icon"/><div className="ca-txt">Try again the payment if you have not paid. Otherwise, you have paid then contact the seller and show him the prove</div></h2>
                <h2 className="ca-he1"><BsFillQuestionCircleFill className="ca-icon"/><div className="ca-txt">Thanks for using our website and sorry for running in this problem</div></h2>
            </div>
        </div>
    )
}

export default Cancel
