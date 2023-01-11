import { getProduct } from "../actions/types"

const productsReducer = (state = null, action) => {
    switch(action.type){
        case getProduct:
            return action.payload || false        
        default:
            return state
    }
}

export default productsReducer