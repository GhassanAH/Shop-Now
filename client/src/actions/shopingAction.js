import { newItem, CheckOut, payMster, payPal, success, productType} from './types'
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


export const payByMasterCard = (number, month, year, cvc, amount, description, products, seller, discountApplied, size, quantity, discountCode, discountPercentage) => async dispatch => {
    try {
        await deduct(quantity, products);
        const res = await axios.post("/api/payment", {number, month, year, cvc, amount, description, products, seller, discountApplied, size, quantity, discountCode, discountPercentage})
        dispatch({type:payMster, payload:res.data})
        
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
        dispatch({type:payMster, payload:payload})
    }
    
}

export const payByPayPal = (name, price, quantity, description, products, seller, discountApplied, size, discountCode, discountPercentage) => async dispatch => {
    try {
        await deduct(quantity, products);
        const res = await axios.post("/api/paypal", {name, price, quantity, description, products, seller, discountApplied, size, discountCode, discountPercentage})
        
        dispatch({type:payPal, payload:res.data})
        
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
        dispatch({type:payPal, payload:payload})
    }
    
}

export const getType = (type) => dispatch => {
    dispatch({type:productType, payload:type})

}
const deduct = async (quantity, products) => {
    for(var i = 0; i < products.length; i++){
        var id = products[i];
        var amount = quantity[i];
        try {
            await axios.post("/api/reduceAmount", {id, amount});
        } catch (error) {
            continue
        }
    }
}