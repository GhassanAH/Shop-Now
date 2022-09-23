import { CheckOut } from "../actions/types"
import ls from "local-storage"
const data = JSON.parse(ls.get("checkout"))
const checkOutReducer = (state = data || null, action) => {
    switch(action.type){
        case CheckOut:
            return action.payload || false
        default:
            return state
    }
}

export default checkOutReducer