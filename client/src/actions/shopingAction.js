import { newItem, CheckOut, payMster, payPal, success} from './types'
import axios from "axios"
import ls from "local-storage"

export const addNewItem = (item) => dispatch => {
    ls.set("cart", JSON.stringify(item))
    dispatch({type:newItem, payload:item})
}
export const getCheckOut = (item) => dispatch => {
    ls.set("checkout", JSON.stringify(item))
    dispatch({type:CheckOut, payload:item})
}
export const setInvoice = (item) => dispatch => {
    ls.set("invoice", JSON.stringify(item))
    dispatch({type:success, payload:item})
}


export const payByMasterCard = (number, month, year, cvc, amount, description) => async dispatch => {
    const res = await axios.post("/api/payment", {number, month, year, cvc, amount, description})
    
    dispatch({type:payMster, payload:res.data})
}

export const payByPayPal = (name, price, quantity, description) => async dispatch => {
    const res = await axios.post("/api/paypal", {name, price, quantity, description})
    
    dispatch({type:payPal, payload:res.data})
}
