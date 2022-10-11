import { useEffect } from 'react';
import { React, useState } from 'react';

const SlidePartner = (props) => {
    const [partnersImg, setPartnersImg] = useState([]);

    useEffect(()=> {
        for (let i=0; i < props.partners.length; i++) {
            setPartnersImg(partnersImg => [<img key={props.partners.id} className="w-[200px] h-[100px] object-contain mx-6" src={require(`../assets/partenaires/${props.partners[i].logoPicturePath}` )} alt={`Logo ${props.partners[i].name}`}  />, ...partnersImg]) 
        }
    },[]);

    return(
        <div className=" w-full lg:w-[800px] overflow-hidden relative m-auto p-2">
            <div className={`animate-scroll flex w-[calc(200px * ${props.partners.length * 2})] h-full`}>
                {partnersImg}
                {partnersImg}
            </div>
        </div>
    )
}

export { SlidePartner };