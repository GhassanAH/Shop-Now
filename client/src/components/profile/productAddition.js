import React, {useState, useEffect, useRef} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../css/profile/addProduct.css"
import { connect } from 'react-redux' 
import {uploadProduct} from '../../actions'
import LoadingSpinner from '../loadingSpinner';



const ProductAddition = ({UploadTheProduct, profile}) => {
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [extraImages, setExraImages] = useState([]);
    const [extraImagesUrl, setExraImagesUrl] = useState([]);
    const [name, setName] = useState("")
    const [type, setType] = useState("Hoodies")
    const [productPrice, setProductPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [discountCode, setDiscountCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);

    const handleChange = (image) => {
        setExraImages(prev => [...prev, image])
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            setExraImagesUrl(prev => [...prev, result])
        }
        fileReader.readAsDataURL(image);
    }  
    
    const handleCoverImage = (cover) => {
        setCoverImage(cover)
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            setCoverImageUrl(result)
        }
        fileReader.readAsDataURL(cover);
        
    }

    useEffect(() => {
        if(profile){
            setLoading(false)
            if(profile.success && profile.message === "product successfully added"){
                setSuccess(true)
                setError(false)
                setMessage(profile.message)
                window.scrollTo(0, 0);
            }else{
                setSuccess(false)
                setError(true)
                setMessage(profile.message)
                window.scrollTo(0, 0);
                
            }
        }
    },[profile])

    const uploadTheProduct = (e) => {
        e.preventDefault()
        document.documentElement.style.setProperty('--body-opcity', "0.3")
        setLoading(true)
        window.scrollTo(300, 300);
        var sizes = []
        if(ref1.current.checked){
            sizes = [...sizes, ref1.current.value]
        }if(ref2.current.checked){
            sizes = [...sizes, ref2.current.value]
        }if(ref3.current.checked){
            sizes = [...sizes, ref3.current.value]
        }if(ref4.current.checked){
            sizes = [...sizes, ref4.current.value]
        } if(ref5.current.checked){
            sizes = [...sizes, ref5.current.value]
        } if(ref6.current.checked){
            sizes = [...sizes, ref6.current.value]
        } if(ref7.current.checked){
            sizes = [...sizes, ref7.current.value]
        }
        if(name && type && coverImage && productPrice && shippingPrice && quantity && description){
            UploadTheProduct(
                name, 
                type, 
                sizes,
                coverImage, 
                extraImages, 
                productPrice, 
                shippingPrice, 
                quantity, 
                description, 
                discountPercentage, 
                discountCode)

        }else{
            setLoading(false)
            setSuccess(false)
            setError(true)
            setMessage("Please fill all required fields")
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
                    <h1 className="pa-he1">Product Creational form</h1>
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
                        <label className="pa-lab"><input type="checkbox"   value="S" className="pa-ch-input" ref={ref1}/> S</label>
                        <label className="pa-lab"><input type="checkbox"  value="M" className="pa-ch-input" ref={ref2}/> M</label>
                        <label className="pa-lab"><input type="checkbox"  value="L" className="pa-ch-input" ref={ref3}/> L</label>
                        <label className="pa-lab"><input type="checkbox"  value="XL" className="pa-ch-input" ref={ref4}/> XL</label>
                        <label className="pa-lab"><input type="checkbox"  value="XXL" className="pa-ch-input" ref={ref5}/> XXL</label>
                        <label className="pa-lab"><input type="checkbox"  value="XXXL" className="pa-ch-input" ref={ref6}/> XXXL</label>
                        <label className="pa-lab"><input type="checkbox"  value="XXXXL" className="pa-ch-input" ref={ref7}/> XXXXL</label>
                    </div>
                    <datalist id="browsers">
                        <option>Google</option>
                        <option>IE9</option>
                    </datalist>
                    <label className="pa-label import">Product Cover Image</label>
                    <input className="pa-image" type="file"  accept="image/*" onChange={(e) => handleCoverImage(e.target.files[0])}/>
                    <div className="image-bar">
                        {coverImageUrl && <img className="pa-img" src={coverImageUrl} width="40" height="40"/>}
         
                    </div>
 
                    <label className="pa-label">Extra Product Images</label>
                    <input className="pa-image" type="file"  accept="image/*"  onChange={(e) => handleChange(e.target.files[0])} multiple/>
                    <div className="image-bar">
                    {extraImagesUrl && extraImagesUrl.map((image, index) => {
                                     return<img className="pa-img" src={image} width="40" height="40" key={index}/>
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
                    <button disabled={loading} className="pa-btn" onClick={uploadTheProduct}>Publish the product</button>
                </form>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile:state.profile
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        UploadTheProduct: (name, productType,coverImage, extraImages, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode) => dispatch(uploadProduct(name, productType,coverImage, extraImages, productPrice, shippingPrice, quantity, description, discountPercentage, discountCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddition)
