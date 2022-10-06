import React, { useState } from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const FooterAfpaLocation = (props) => {
    const [position, setPosition] = useState([props.centre.latitude, props.centre.longitude]);

    useEffect(() => {
        console.log(position);
    },[]);
    if(!position) {

    }else {
        return(
            <div className='flex'>
                <div>
                    <p>{props.centre.name}</p>
                    <p>{props.centre.address}</p>
                </div>
                <div className='h-40 w-96'>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='h-full w-full'>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>

            </div>
        );
    }

}
export {FooterAfpaLocation};