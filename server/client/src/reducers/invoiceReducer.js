import { success } from "../actions/types"
import ls from "local-storage"
const data = JSON.parse(ls.get("invoice"))
const invoiceReducer = (state = data || null, action) => {
    switch(action.type){
        case success:
            return action.payload || false        
        default:
            return state
    }
}

export default invoiceReducer