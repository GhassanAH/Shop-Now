import { combineReducers } from "redux";
import  shopingReducer  from './shopingReducer'
import  checkoutReducer  from './checkoutReducer'
import  paymentReducer  from './paymentReducer'
import  invoiceReducer  from './invoiceReducer'
import  authReducer  from './authReducer'
import profileReducer from "./profileReducer"
import productsReducer from "./productsReducer"
import loadingReducer from "./loadingReducer"




export default combineReducers({
    shop:shopingReducer,
    checkout:checkoutReducer,
    pay:paymentReducer,
    invoice:invoiceReducer,
    auth:authReducer,
    profile:profileReducer,
    products:productsReducer,
    loading:loadingReducer,
})