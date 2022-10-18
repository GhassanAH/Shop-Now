import Header from "./header"
import Footer from "./footer"
import "../css/app.css"
import {Routes, Route} from 'react-router-dom'
import Profile from "./auth/profile"
import SignIn from "./auth/signIn"
import SignUp from "./auth/signUp"
import Landing from "./landing"
import Cart from "./shop/cart"
import Details from "./shop/details"
import Checkout from "./shop/checkout"
import Payment from "./shop/payment"
import Success from "./shop/success"
import Cancel from "./shop/cancel"
import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {checkAuthorization} from '../actions'
import ResetPassword from "./auth/resetPassword"
import PasswordChanging from "./auth/passwordChanging"
import Info from "./profile/info"
import Orders from "./profile/orders"
import ProductAddition from "./profile/productAddition"
import ProductEditing from "./profile/productEditing"
import Editing from "./profile/editing"
import History from "./profile/history"
import Analysis from "./profile/analysis"



function App({checkTheAuthorization, auth}) {

  useEffect(() => {
    checkTheAuthorization()
  },[])

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
        language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem('translations')) || {
        [key]: {},
      };
      existing[key] = {...existing[key], [language]: value};
      localStorage.setItem('translations', JSON.stringify(existing));
    },
   };

  return (
    <div className="app">
          <div>
              <Header/>
              <Routes>
                    <Route exact path="/" element={<Landing/>}></Route>
                    <Route path="/signIn"  element={<SignIn/>}></Route>
                    <Route path="/signUp"  element={<SignUp/>}></Route>
                    <Route path="/forgotpassword"  element={<ResetPassword/>}></Route>
                    <Route path="/resetPassword/:token"  element={<PasswordChanging/>}></Route>
                    <Route path="/profile"  element={<Profile/>}>
                      <Route path="/profile/info"  element={<Info/>}/>
                      <Route path="/profile/add_products"  element={<ProductAddition/>}/>
                      <Route path="/profile/edit_products"  element={<ProductEditing/>}/>
                      <Route path="/profile/orders"  element={<Orders/>}/>
                      <Route path="/profile/history"  element={<History/>}/>
                      <Route path="/profile/analysis"  element={<Analysis/>}/>
                      <Route path="/profile/edit"  element={<Editing/>}/>
                    </Route>
                    <Route path="/cart"  element={<Cart/>}></Route>
                    <Route path="/productDetails"  element={<Details />}></Route>
                    <Route path="/checkout"  element={<Checkout />}></Route>
                    <Route path="/payment"  element={<Payment />}></Route>
                    <Route path="/success"  element={<Success />}></Route>
                    <Route path="/cancel"  element={<Cancel />}></Route>
              </Routes>
              <Footer />
          </div>
     
    </div>
);
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
      checkTheAuthorization: () => dispatch(checkAuthorization()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);

