import { loading } from "../actions/types"

const loadingReducer = (state = null, action) => {
    switch(action.type){
        case loading:
            return action.payload || false        
        default:
            return state
    }
}

export default loadingReducer