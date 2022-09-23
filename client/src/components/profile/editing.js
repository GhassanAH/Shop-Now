import React, {useState, useEffect, useRef} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../css/profile/addProduct.css"
import { connect } from 'react-redux' 
import {updateTheProduct} from '../../actions'
import LoadingSpinner from '../loadingSpinner';
import { useLocation } from 'react-router'
import {BsFillXCircleFill} from "react-icons/bs"



const Editing = ({update_product, profile}) => {
    const location = useLocation()
    const data = location.state.data
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState(data.cover);
    const [extraImages, setExraImages] = useState([]);
    const [extraImagesUrl, setExraImagesUrl] = useState(data.extraImages);
    const [name, setName] = useState(data.name)
    const [type, setType] = useState(data.type)
    const [productPrice, setProductPrice] = useState(data.price)
    const [shippingPrice, setShippingPrice] = useState(data.shipping)
    const [quantity, setQuantity] = useState(data.quantity)
    const [description, setDescription] = useState(data.description);
    const [discountPercentage, setDiscountPercentage] = useState(data.discountPercentage)
    const [discountCode, setDiscountCode] = useState(data.discountCode)
    const [sizes, setSizes] = useState(data.sizes || [])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const [oldCover, setOldCover] = useState(data.cover)
    const [oldExtra, setOldExtra] = useState([])
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);

    const handleChange = (image) => {
        if(image){
            setExraImages(prev => [...prev, image])
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                setExraImagesUrl(prev => [...prev, result])
            }
            fileReader.readAsDataURL(image);

        }

    }  
    
    const handleCoverImage = (cover) => {
        if(cover){
            setCoverImage(cover)
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                setCoverImageUrl(result)
            }
            fileReader.readAsDataURL(cover);
        }
        
    }
    const removeCover = (e) => {
        e.preventDefault()
        setOldCover(coverImageUrl)
        setCoverImageUrl("")

    }
    const removeExtra = (e, url) => {
        e.preventDefault()
        setOldExtra([...oldExtra, url])
        const newImages = extraImagesUrl.filter((img) => img !== url)
        setExraImagesUrl(newImages)

    }
    useEffect(() => {
        console.log("p ",profile)
        if(profile){
            setLoading(false)
            if(profile.success && profile.message === "Product Successfully Eidted"){
                setSuccess(true)
                setError(false)
                setMessage(profile.message)
                window.scrollTo(0, 0);
            }else if(profile.success === false){
                setSuccess(false)
                setError(true)
                setMessage(profile.message)
                window.scrollTo(0, 0);
                
            }
        }
    },[profile])

    const editTheProduct = (e) => {
        e.preventDefault()
        document.documentElement.style.setProperty('--body-opcity', "0.3")
        setLoading(true)
        window.scrollTo(300, 300);
        if(name && type && coverImageUrl && productPrice >= 0 && shippingPrice >= 0 && quantity >= 0 && description ){
                const exImages = extraImagesUrl.filter((url) => url.includes("https://shop-now.s3.amazonaws.com/"))
                var sizes2 = []
                if(ref1.current.checked){
                    sizes2 = [...sizes2, ref1.current.value]
                }if(ref2.current.checked){
                    sizes2 = [...sizes2, ref2.current.value]
                }if(ref3.current.checked){
                    sizes2 = [...sizes2, ref3.current.value]
                }if(ref4.current.checked){
                    sizes2 = [...sizes2, ref4.current.value]
                } if(ref5.current.checked){
                    sizes2 = [...sizes2, ref5.current.value]
                } if(ref6.current.checked){
                    sizes2 = [...sizes2, ref6.current.value]
                } if(ref7.current.checked){
                    sizes2 = [...sizes2, ref7.current.value]
                }
                update_product(
                    data._id,
                    name, 
                    type, 
                    sizes2,
                    oldCover,
                    coverImage,
                    oldExtra, 
                    extraImages, 
                    exImages,
                    productPrice, 
                    shippingPrice, 
                    quantity, 
                    description, 
                    discountPercentage, 
                    discountCode)
        } else{
            setLoading(false)
            setSuccess(false)
            setError(true)
            setMessage("Please Fill Empty fileds or the number could not be negative")
            window.scrollTo(0, 0);
        }
    }
        

    return (
        <div className="pa-con">
            <div className="pa-cov">
                {loading && <LoadingSpinner/>}
                {success && <div className="pa-success">{message}</div>}
                {error && <div className="pa-error">{message}</div>}
                <form className="pa-form">
                    <h1 className="pa-he1">Product Editing form</h1>
                    <label className="pa-label import">Product Name</label>
                    <input className="pa-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"/>
                    <label className="pa-label import">Product Type</label>
                    <select className="pa-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option className="pa-option">Hoodies</option>
                        <option className="pa-option">Crewnecks</option>
                        <option className="pa-option">Long Sleeves</option>
                        <option className="pa-option">T-Shirts</option>
                        <option className="pa-option">Accessories</option>
                    </select>
                    <label className="pa-label import">Product Price</label>
                    <input className="pa-input" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Product Price"/>
                    <label className="pa-label import">Shipping Price</label>
                    <input className="pa-input" type="number"value={shippingPrice} onChange={(e) => setShippingPrice(e.target.value)} placeholder="Shipping Price"/>
                    <label className="pa-label import">Product Quantity</label>
                    <input className="pa-input" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Product Quantity"/>
                    <label className="pa-label import">Product Sizes</label>
                    <div className="pa-check">
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("S")? true:false} value="S" className="pa-ch-input" ref={ref1}/> S</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("M")? true:false} value="M" className="pa-ch-input" ref={ref2}/> M</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("L")? true:false} value="L" className="pa-ch-input" ref={ref3}/> L</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("XL")? true:false} value="XL" className="pa-ch-input" ref={ref4}/> XL</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("XXL")? true:false} value="XXL" className="pa-ch-input" ref={ref5}/> XXL</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("XXXL")? true:false} value="XXXL" className="pa-ch-input" ref={ref6}/> XXXL</label>
                        <label className="pa-lab"><input type="checkbox" defaultChecked={data.sizes.includes("XXXXL")? true:false} value="XXXXL" className="pa-ch-input" ref={ref7}/> XXXXL</label>
                    </div>
                    <label className="pa-label import">Product Cover Image</label>
                    <input className="pa-image" type="file"  accept="image/*" onChange={(e) => handleCoverImage(e.target.files[0])}/>
                    <div className="image-bar">
                        {coverImageUrl && 
                            <div className="pa-cover">
                                <img  className="pa-img" src={coverImageUrl} width="40" height="40" />
                                <button onClick={(e) => removeCover(e)} className="pa-btn" ><BsFillXCircleFill /></button>
                            </div>
                        }
         
                    </div>
 
                    <label className="pa-label">Extra Product Images</label>
                    <input className="pa-image" type="file"  accept="image/*"  onChange={(e) => handleChange(e.target.files[0])} multiple/>
                    <div className="image-bar">
                    {extraImagesUrl && extraImagesUrl.map((image, index) => {
                                     return <div className="pa-cover" key={index}>
                                                <img  className="pa-img" src={image} width="40" height="40" />
                                                <button onClick={(e) => removeExtra(e, image)} className="pa-btn" ><BsFillXCircleFill /></button>
                                            </div>
                                    })}
                    </div>
                    <label className="pa-label import">Product Description</label>
                    <ReactQuill 
                    className="pa-description" theme="snow" 
                    value={description} 
                    onChange={setDescription} 
            
                    />
                    <label className="pa-label">Product Discount percentage</label>
                    <input className="pa-input" type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} placeholder="Product Discount percentage"/>
                    <label className="pa-label">Product Discount Code</label>
                    <input className="pa-input" type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Product Discount Code"/>
                    <button disabled={loading} className="pa-btn" onClick={editTheProduct}>Edit the product</button>
                </form>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile:state.profile,
        
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        update_product: (name, productType,oldCover, coverImage, oldExtra, extraImages,extraList, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode) => dispatch(updateTheProduct(name, productType,oldCover, coverImage, oldExtra, extraImages,extraList, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editing)
