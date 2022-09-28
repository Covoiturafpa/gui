import { useEffect, useContext } from "react";
import "../../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet';
import L from 'leaflet';
import { DestinationContext as DestinationContext } from "../scenes/BookingForm";

const afpaIcon = new L.Icon({
    iconUrl: require(`../assets/LogoAfpa.jpg`),
    iconSize: [60, 30],
    shadowSize: [0, 0],
    className: "object-fill border-solid border border-black"
});

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapLeaflet = () => {

    const { destination, setDestination } = useContext(DestinationContext);
    const afpaPos = [45.95810, -0.96423];
    
    useEffect(() => {
        if (destination.lat != null && destination.lon != null) {

        }
    }, [destination])
    console.log(destination.lat != null);
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
            {destination.lat != null && destination.lon != null &&
            <Marker position={[destination.lat, destination.lon]} >
            </Marker>
            }
        </MapContainer>
    )
}

export { MapLeaflet };