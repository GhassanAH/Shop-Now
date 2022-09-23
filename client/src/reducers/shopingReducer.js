import { newItem} from "../actions/types"
import ls from "local-storage"
const data = JSON.parse(ls.get("cart"))

const shopingReducer = (state = data || [], action) => {
    switch(action.type){
        case newItem:
            return action.payload || false
        default:
            return state
    }
}

export default shopingReducer