import React,{useState} from 'react'
import "../css/landing.css"
import ho1 from "../img/h7.jpg"
import ho2 from "../img/h6.jpg"
import AllProducts from './shop/allProducts'


const Landing = () => {
    const [img, setImg] = useState("l-img")
    const [img1, setImg1] = useState("transparent")

    const changeImg = () => {
        if(img === "l-img"){
            setImg("transparent")
            setImg1("l-img")
        }else if(img1 === "l-img"){
            setImg1("transparent")
            setImg("l-img")

        }
    }
    return (
        <div className="l-con">
            <div className="l-imgs">
                <img  src={ho1} className={img}/>
                <img  src={ho2} className={img1}/>
                <button className="l-before" onClick={changeImg}> <div className="l-f3">{"<"}</div><div className="l-f2">{"<"}</div><div className="l-f1">{"<"}</div> </button>
                <button className="l-after" onClick={changeImg}> <div className="l-f1">{">"}</div><div className="l-f2">{">"}</div><div className="l-f3">{">"}</div> </button>

            </div>
            <AllProducts />

        </div>
    )
}

export default Landing
