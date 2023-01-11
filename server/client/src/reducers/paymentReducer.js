import { payPal, payMster} from "../actions/types"

const paymentReducer = (state = null, action) => {
    switch(action.type){
        case payMster:
            return action.payload || false        
        case payPal:
            return action.payload || false
        default:
            return state
    }
}

export default paymentReducer