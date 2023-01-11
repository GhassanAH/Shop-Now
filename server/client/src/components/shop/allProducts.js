import React, {useState, useEffect} from 'react'
import "../../css/products/allProducts.css"
import "../../css/landing.css"
import {NavLink as Link} from "react-router-dom" 
import { connect } from 'react-redux' 
import {getProducts} from '../../actions'
import LoadingSpinner from '../loadingSpinner';


const AllProducts = ({products, productType}) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    const [error, setError] = useState(false)

    useEffect(() => {
        if(products){
            setLoading(false)
            if(products.success && products.message === "product successfully fetched"){
                setData(products.products)
                setError(false)
                window.scrollTo(0, 0);
            }else{
                setError(true)
                window.scrollTo(0, 0);
            }
        }

    },[products])

    return (
        <div className="ap-con">
            {error && <div className="ap-error">product unsuccessfully published</div>}
            <div className="ap-title">
                <h2 className="ap-he2">{productType}</h2>
            </div>
            <div className="ap-prod">
                <div className="ap-prod-cov">
                    <div className="ap-grid">
                        {data && data.map((item, index) => {
                            return  <Link  key={index} to={item.quantity?"/productDetails":""} state={{ data: item }} className="ap-item">
                                        <img className="ap-img" src={item.cover}/>
                                        <div className="ap-details">
                                            <h3 className="ap-he3">{item.name}</h3>
                                            <h3 className="ap-he3"> $ {item.price}</h3>
                                            {item.quantity === 0 && <h3 className="ap-sold"> Sold Out</h3>}
                                        </div>
                                    </Link>
                        })}
                    </div>
                </div>
            </div>
            {loading && <LoadingSpinner/>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products:state.products,
        productType:state.prod
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        getTheProducts: (type) => dispatch(getProducts(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
