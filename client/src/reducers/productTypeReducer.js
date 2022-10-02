import { productType } from "../actions/types"

const productTypeReducer = (state = null, action) => {
    switch(action.type){
        case productType:
            return action.payload || false        
        default:
            return state
    }
}

export default productTypeReducer