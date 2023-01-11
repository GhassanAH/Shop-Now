import React from 'react'
import "../css/footer.css"
import { Visa, Mastercard, Paypal, Applepay, Western, Googlepay,Discover } from "react-pay-icons";

const Footer = () => {
    return (
        <div className="s-footer">
            <div className="f-idea">
                <div className="f-stat">
                    <h2 className="f-he2">ShopNow</h2>
                    <div className="f-p">Thank you for shopping in ShopNow website</div>
                </div>
            </div>
            <div className="f-body">
                <div className="f-cus">
                    <h3 className="f-he3">Customer Service</h3>
                    <div className="f-li">Shipping Policy</div>
                    <div className="f-li">Refund Policy</div>
                    <div className="f-li">Terms of Service</div>
                    <div className="f-li">Privacy Policy</div>
                </div>
                <div className="f-con">
                    <h3 className="f-he3">Contact Us</h3>
                    <div className="f-p">If you have any questions please <a>contact us.</a></div>

                </div>
                <div className="f-ser-stat">
                    <h3 className="f-he3">Processing Time</h3>
                    <div className="f-p">We process and fulfill items within 24 hours then domestic First Class shipping takes 3-7 days and Priority shipping takes 3-5 days. For special or limited drops the fulfillment can take 15 business days.</div>
                </div>
            </div>
            <div className="f-cop">
                <div className="f-cop-con">
                    <div className="f-copyright">
                        © 2022, ShopNow
                    </div>
                    
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
    )
}

export default Footer
