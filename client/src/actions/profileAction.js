import { UploadProduct, getProduct, updateProfile, updateProduct, loading, orders, userOrders, setShipped } from './types'
import axios from "axios"
import ls from "local-storage"


export const uploadProduct =  (name, productType,sizes, coverImage, extraImages, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode) => async dispatch => {
    try {
        const token = ls.get("authToken")
        const type = new String(coverImage.type).replace("image/","");
        const result = await uploadImages(coverImage, type)
        var coverImageUrl = ""
        if(result.message === "successfully uploaded"){
            coverImageUrl = result.url
            const uploadExtraResult = await uploadExtraImages(extraImages)
            if(uploadExtraResult.success === false){
                return dispatch({type:UploadProduct, payload:{message:"Error while uploading", success:false}})
            }
            const extraImagesList = uploadExtraResult.extraImagesList
            const information = {name:name, type:productType, price:productPrice, shipping:shippingPrice, quantity:quantity,sizes:sizes, cover:coverImageUrl, extraImages:extraImagesList, description:description, discountPercentage:discountPercentage, discountCode:discountCode}
            try {
                const res = await axios.post("/api/addProduct", {information},
                {
                    headers:{
                    authorization: 'Bearer ' + token
                    }
                }
                )
                return dispatch({type:UploadProduct, payload:res.data}) 
            } catch (error) {
                const images = [coverImageUrl, ...extraImagesList]
                for(var i = 0; i < images.length; i++){
                    await deleteImages(images[i]);
                }
                var payload = {
                    success:error.response.data.success,
                    message:error.response.data.message
                }
                return dispatch({type:UploadProduct, payload:payload})
            }
        }else{
            return dispatch({type:UploadProduct, payload:{message:"Error while uploading", success:false}})
            
        }
    } catch (error) {
        return dispatch({type:UploadProduct, payload:{message:error.message, success:false}})
    }
    
}

export const updateTheProduct = (id, name, productType, sizes, oldCover, coverImage, oldExtra, extraImages, extraList, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode) => async dispatch => {
    try {
        const token = ls.get("authToken")
        dispatch({type:loading, payload:"2%"})
        //Cover image upload and delete
        var coverImageUrl = oldCover
        if(coverImage){
            const type = new String(coverImage.type).replace("image/","");
            const result = await uploadImages(coverImage, type)
            if(result.message === "successfully uploaded"){
                dispatch({type:loading, payload:"15%"})
                coverImageUrl = result.url
                const deleteCover = await deleteImages(oldCover);
                if(!deleteCover){
                     dispatch({type:updateProduct, payload:{message:"Note cover image is not deleted due to some errors", success:false}})
                }
            }
        }
        dispatch({type:loading, payload:"35%"})
        //extra image upload and delete
        const uploadExtraResult = await uploadExtraImages(extraImages)
        if(uploadExtraResult.success === false){
            dispatch({type:updateProduct, payload:{message:"Error while uploading", success:false}})
            return 
        }
        dispatch({type:loading, payload:"45%"})
        const extraImagesList = [...extraList,...uploadExtraResult.extraImagesList]
        for(var i = 0; i < oldExtra.length; i++){
            const deleteCover = await deleteImages(oldExtra[i]);
            if(!deleteCover){
                dispatch({type:updateProduct, payload:{message:"Note some of extra images are not deleted due to some errors", success:false}})
            }
        }
        dispatch({type:loading, payload:"85%"})

        //updating the information
        const information = {id: id, name:name, type:productType, price:productPrice, shipping:shippingPrice, quantity:quantity,sizes:sizes, cover:coverImageUrl, extraImages:extraImagesList, description:description, discountPercentage:discountPercentage, discountCode:discountCode}
        console.log(information);
        try {
            const res = await axios.post("/api/editProduct", {information},
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            }
            )
            dispatch({type:loading, payload:"100%"})
            dispatch({type:updateProduct, payload:res.data}) 
        } catch (error) {
            var payload = {
                success:error.response.data.success,
                message:error.response.data.message
            }
            dispatch({type:updateProduct, payload:payload})
       
        }
    } catch (error) {
        dispatch({type:updateProduct, payload:{message:error.message, success:false}})
      

    }
}

export const getProducts = (type) => async dispatch => {
    const res = await axios.get(`/api/getProductByType/${type}`)

    dispatch({type:getProduct, payload:res.data})
}

export const getOrders = () => async dispatch => {
    const token = ls.get("authToken")
    try {
        const res = await axios
        .get(`/api/getOrders`,
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            }
        )
    
        dispatch({type:orders, payload:res.data})
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
       dispatch({type:orders, payload:payload})
    }
}
export const setShipping = (id) => async dispatch => {
    const token = ls.get("authToken")

    try {
        const res = await axios.post("/api/setShipped",
        {id:id},
        {
           headers:{
           authorization: 'Bearer ' + token
           }
       }
       )
       dispatch({type:setShipped, payload:res.data})
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
       dispatch({type:setShipped, payload:payload})
    }


}
export const getUserOrders = () => async dispatch => {
    const token = ls.get("authToken")
    try {
        const res = await axios
        .get(`/api/getMyOrders`,
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            }
        )
    
        dispatch({type:userOrders, payload:res.data})
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
       dispatch({type:userOrders, payload:payload})
    }
}


export const updateInfo = (information) => async dispatch =>  {
    const token = ls.get("authToken")
    try {
        const res = await axios.post(
            "/api/addInfo",
            {information},
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            })
    
        dispatch({type:updateProfile, payload:res.data})
    } catch (error) {
        var payload = {
            success:error.response.data.success,
            message:error.response.data.message
        }
       dispatch({type:updateProfile, payload:payload})
    }
}

const uploadImages = async (image, type) => {
    const token = ls.get("authToken")
    const uploadImage = await axios.get(
        `/api/uploadimage/${type}`,
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            }
        )
    if(uploadImage.data.success){
        const upload = await axios.put(uploadImage.data.message.Url, image, {
            headers:{
                'Content-Type': image.type,
            }
        })

        if(upload.status === 200){
            const url = "https://shop-now.s3.amazonaws.com/"+uploadImage.data.message.Key
            return {message:"successfully uploaded", url: url}
        }else{
            return {message:"Error while uploading"}
        }
    }else{
        return {message:"Error while uploading"}
    }

}

const uploadExtraImages = async (extraImages) => {
    var extraImagesList = []
    for(var i = 0; i < extraImages.length; i++){
        const type1 = new String(extraImages[i].type).replace("image/","");
        const result1 = await uploadImages(extraImages[i], type1)
        if(result1.message === "successfully uploaded"){
            extraImagesList = [...extraImagesList, result1.url]
        }else{
            for(var i = 0; i < extraImagesList.length; i++){
                await deleteImages(extraImagesList[i]);
            }
            return {extraImagesList:[], message:"Error while uploading", success:false}
        }
    }
    return {extraImagesList:extraImagesList, message:"successfully uploaded", success:true}
}

const deleteImages = async (imageUrl) => {
    try {
        if(imageUrl){
            const token = ls.get("authToken")
            const modifiedImage = imageUrl.replace("https://shop-now.s3.amazonaws.com/","")
            await axios.post('/api/deleteImage',
            {imageUrl:modifiedImage},
            {
                headers:{
                authorization: 'Bearer ' + token
                }
            }
            )
        }
        return true;
    } catch (error) {
        return false;
    }
}


