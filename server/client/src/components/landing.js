import React,{useState, useEffect} from 'react'
import "../css/landing.css"
import ho1 from "../img/h7.jpg"
import ho2 from "../img/h6.jpg"
import ho3 from "../img/h10.jpg"
import ho4 from "../img/h12.webp"
import ho5 from "../img/h3.webp"
import AllProducts from './shop/allProducts'


const Landing = () => {
    const [img, setImg] = useState("l-img")
    const [img1, setImg1] = useState("transparent")
    const [img2, setImg2] = useState("transparent")
    const [img3, setImg3] = useState("transparent")
    const [img4, setImg4] = useState("transparent")
    const [change, setChange] = useState(0)
    const [currentImageIndex, setCurrentIndexImage] = useState(0)

    const changeImg = () => {
        switch (currentImageIndex){
            case 0:
                setImg("transparent")
                setImg1("l-img")
                setCurrentIndexImage(currentImageIndex + 1)
                setTimeout(() => {setChange(change+1)}, 10000)
                return
            case 1:
                setImg1("transparent")
                setImg2("l-img")
                setCurrentIndexImage(currentImageIndex + 1)
                setTimeout(() => {setChange(change+1)}, 10000)
                return
            case 2:
                setImg2("transparent")
                setImg3("l-img")
                setCurrentIndexImage(currentImageIndex + 1)
                setTimeout(() => {setChange(change+1)}, 10000)
                return
            case 3:
                setImg3("transparent")
                setImg4("l-img")
                setCurrentIndexImage(currentImageIndex + 1)
                setTimeout(() => {setChange(change+1)}, 10000)
                return
            case 4:
                setImg4("transparent")
                setImg("l-img")
                setCurrentIndexImage(0)
                setTimeout(() => {setChange(change+1)}, 10000)
                return
        }
    }
    
    const changeImgByClick = (typeOfClick) => {
        if(typeOfClick === "back"){
            switch(currentImageIndex){
                case 0:
                    setCurrentIndexImage(4)
                    setImg("transparent")
                    setImg4("l-img")
                    return
                case 1:
                    setCurrentIndexImage(currentImageIndex - 1)
                    setImg1("transparent")
                    setImg("l-img")
                    return
                case 2:
                    setCurrentIndexImage(currentImageIndex - 1)
                    setImg2("transparent")
                    setImg1("l-img")
                    return
                case 3:
                    setCurrentIndexImage(currentImageIndex - 1)
                    setImg3("transparent")
                    setImg2("l-img")
                    return
                case 4:
                    setCurrentIndexImage(currentImageIndex - 1)
                    setImg4("transparent")
                    setImg3("l-img")
                    return
            }
        }else{
            setChange(change+1)
        }
    }

    useEffect(() => {
        
       changeImg()

    }, [change])

    return (
        <div className="l-con">
            <div className="l-imgs">
                <img  src={ho1} className={img}/>
                <img  src={ho2} className={img1}/>
                <img  src={ho3} className={img2}/>
                <img  src={ho4} className={img3}/>
                <img  src={ho5} className={img4}/>
                <button className="l-before" onClick={() => changeImgByClick("front")}> <div className="l-f3">{"<"}</div><div className="l-f2">{"<"}</div><div className="l-f1">{"<"}</div> </button>
                <button className="l-after" onClick={() => changeImgByClick("back")}> <div className="l-f1">{">"}</div><div className="l-f2">{">"}</div><div className="l-f3">{">"}</div> </button>

            </div>
            <AllProducts />

        </div>
    )
}

export default Landing
