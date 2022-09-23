import React, {useState, useEffect} from 'react'
import "../../css/profile/editProduct.css"
import {NavLink as Link} from "react-router-dom" 
import { connect } from 'react-redux' 
import {getProducts} from '../../actions'
import LoadingSpinner from '../loadingSpinner';



const ProductEditing = ({products}) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    

    useEffect(() => {
        if(products){
            setLoading(false)
            if(products.success && products.message === "product successfully fetched"){
                setData(products.products)
                setSuccess(true)
                setError(false)
                window.scrollTo(0, 0);
            }else{
                setSuccess(false)
                setError(true)
                window.scrollTo(0, 0);
            }
        }

    },[products])

    return (
        <div className="ep-con">
            {loading && <LoadingSpinner/>}
            {success && <div className="ep-success">product successfully published</div>}
            {error && <div className="ep-error">product unsuccessfully published</div>}
            <div className="ep-title">
                <h2 className="ep-he2">All Products</h2>
            </div>
            <div className="ep-prod">
                <div className="ep-grid">
                    {data && data.map((item, index) => {
                        return  <Link   key={index} to="/profile/edit" state={{ data: item }} className="ep-item">
                                    <img className="ep-img" src={item.cover}/>
                                    <div className="ep-details">
                                        <h3 className="ep-he3">{item.name}</h3>
                                        <h3 className="ep-he3">{item.price} $</h3>
                                    </div>
                                </Link>
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products:state.products
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        getTheProducts: (type) => dispatch(getProducts(type)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductEditing)
