import React,{useState} from 'react'
import "../css/products/image_zoomer.css"
import ImageZoom from "react-image-zooom";



const ImageZoomer = ({data}) => {
    const [mimg, setMImage] = useState(data.cover)
    const [images, setImages] = useState([data.cover, ...data.extraImages])
    const [pos, setPos] = useState(0)


    const handleClick = (e, img, index) => {
        e.preventDefault()
        setMImage(img)
        setPos(index)
    }

    function ImgMagnifier(props) {
        return <ImageZoom  src={props.src} zoom="300" className="img" />;
    }

    const handleLeftNavigation = (e) => {
        e.preventDefault()
        if(pos > 0){
            const position = pos - 1
            setPos(position)
            setMImage(images[position])
        }else{
            setMImage(mimg)

        }



    }

    const handleRightNavigation = (e) => {
        e.preventDefault()
        if(pos < images.length - 1){
            const position = pos + 1
            setPos(position)
            setMImage(images[position])
        }else{
            setMImage(mimg)

        }

        
    }


    return (
        <div className="iz-con">
            <div className="iz-cov">
                <div className="m-img" >
                    <button className="iz-l" onClick={(e) => handleLeftNavigation(e)}>{"<"}</button>
                    <ImgMagnifier src={mimg} />
                    <button className="iz-r" onClick={(e) => handleRightNavigation(e)}>{">"}</button>
                </div>
                <div className="img-grid">
                    {images.map((img, index) => {
                        return <button className="m-img" onClick={event  => handleClick(event, img, index)} key={index}>
                                    <img src={img} className="img" />
                               </button>
                    })

                    }
                </div>
            </div>
        </div>
    )
}

export default ImageZoomer
