import { UploadProduct, updateProfile, updateProduct } from "../actions/types"

const profileReducer = (state = null, action) => {
    switch(action.type){
        case UploadProduct:
            return action.payload || false
        case  updateProfile:
            return action.payload || false
        case updateProduct:
            return action.payload || false
        default:
            return state
    }
}

export default profileReducer