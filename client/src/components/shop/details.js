import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router'
import "../../css/products/details.css"
import { connect } from 'react-redux'
import {addNewItem} from '../../actions'
import ImageZoomer from '../../utils/imageZoomer'


const Details = ({addItemToCart, shop}) => {
    const location = useLocation()
    const [size, setSize] = useState("S")
    const [data, setData] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [prev, setPrev] = useState([])

    useEffect(() => {
        if(location.state){
            setPrev(shop)
            setData(location.state.data)
        }
    }, [shop])


    const onDecrease = (e) => {
        e.preventDefault()
        if(quantity <= 1){
            setQuantity(1)
        }else{
            const newQuantity = quantity - 1;
            setQuantity(newQuantity)
        }

    }
    const onIncrease = (e) => {
        e.preventDefault()
        const newQuantity = quantity + 1;
        setQuantity(newQuantity)
   
    }
    const addItem = (e) => {
        e.preventDefault()
        const product = buildProduct()
        const prevProduct = findNotSamePrevProduct()
        const newItems = [...prevProduct, product]
        addItemToCart(newItems);
   
    }
    
    const buildProduct = () => {
        var prevProduct = findSamePrevProduct()
        var total = data.price * quantity
        var prevQuantity = quantity
        if(prevProduct[0]){
            prevQuantity = prevProduct[0].quantity + quantity
            total = data.price * prevQuantity
        }
        
        return {
            id:data._id,
            image: data.cover,
            title: data.name,
            size: size,
            price: data.price,
            quantity: prevQuantity,
            shipping:data.shipping,
            total: total,
            discount:data.discountPercentage,
            code:data.discountCode
        }
    }
    const findSamePrevProduct = () => {
        return prev.filter((product) => product.id === data.ID && product.size === size)
    }
    const findNotSamePrevProduct = () => {
        return prev.filter((product) => product.id !== data.ID || product.size !== size)
    }


    const createMarkup = (html) => {
        return  {
            __html: html
        }

    }

    return (
        <div className="d-con">
            {data && 
            <div className="d-cov">
                <div className="d-s-img">
                    <ImageZoomer data={data}/>
                </div>

                <div className="d-detal">
                    <h2 className="d-he2">Product Name:</h2>
                    <h2 className="d-he3">{data.name}</h2>
                    <h2 className="d-he2">Product Price:</h2>
                    <h2 className="d-he3">$ {data.price}</h2>
                    <h2 className="d-he2">Product Shipping Price:</h2>
                    <h2 className="d-he3">$ {data.shipping}</h2>
                    <h2 className="d-he2">Product Type:</h2>
                    <h2 className="d-he3">{data.type}</h2>
                    <h2 className="d-he2">Product Description:</h2>
                    <div className="d-desc" dangerouslySetInnerHTML={createMarkup(data.description)}></div>
                    <div className="d-size">
                        <h2 className="d-he2">Product Size</h2>
                        <form className="d-form">
                        {data.sizes.map((sizeValue, index) => {
                            return <label key={index} className="d-label">
                                        <input  type="radio" 
                                                value={sizeValue} 
                                                checked={size === sizeValue} 
                                                onChange={(e) => setSize(e.target.value)}/>
                                        {sizeValue} 
                                    </label> 
                            }
                            )
                        }
                        </form>
                        
                    </div>
                    <div className="d-count">
                        <h3 className="d-he2"> Product Quantity</h3>
                        <div className="d-count-box">
                            <button className="d-btn" onClick={(e) =>  onDecrease(e)}>-</button>
                            <div className="d-box">{quantity}</div>
                            <button className="d-btn" onClick={(e) => onIncrease(e)}>+</button>
                        </div>
                    </div>
                    <div className="d-add-cart">
                        <button className="d-btn" onClick={(e) => addItem(e)}>Add to The Cart</button>
                    </div>
                </div>
            </div>}
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
      shop: state.shop
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (item) => dispatch(addNewItem(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details)
