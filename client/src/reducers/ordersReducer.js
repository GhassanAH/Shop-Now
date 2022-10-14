import { orders, userOrders, setShipped } from "../actions/types"

const ordersReducer = (state = null, action) => {
    switch(action.type){
        case orders:
            return action.payload || false
        case userOrders:
            return action.payload || false
        case setShipped:
            return action.payload || false
        default:
            return state
    }
}

export default ordersReducer