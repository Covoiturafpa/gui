import { useEffect } from "react";
import "../../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const afpaIcon = new L.Icon({
    iconUrl: require(`../assets/LogoAfpa.jpg`),
    iconSize: [60, 30],
    shadowSize: [0, 0],
    className: "object-fill border-solid border border-black"
});

const MapLeaflet = () => {

    const afpaPos = [45.95810, -0.96423];

    useEffect(() => {
    }, [])

    return (
        <MapContainer center={afpaPos} zoom={12} scrollWheelZoom={true} className='h-full w-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={afpaPos} icon={afpaIcon} >
                <Popup>
                    AFPA Rochefort
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export { MapLeaflet };