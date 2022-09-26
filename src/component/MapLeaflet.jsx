import { useEffect } from "react";
import "../../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import LogoAfpa from "../assets/LogoAfpa.jpg";

delete L.Icon.Default.prototype._getIconUrl;

console.log({LogoAfpa});

// TODO: taille icones
L.Icon.Default.mergeOptions({
    // iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    // iconUrl: require('leaflet/dist/images/marker-icon.png'),
    // shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    iconRetinaUrl: require(`../assets/LogoAfpa.jpg`),
    iconUrl: require(`../assets/LogoAfpa.jpg`)
});

const MapLeaflet = () => {

    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    // useEffect(() => {
    //     setLatitude(45.95864);
    //     setLongitude(-0.96423);
    // }, [])


    const afpaPos = [45.95864, -0.96423];

    useEffect(() => {
    }, [])

    return (
        <MapContainer center={afpaPos} zoom={15} scrollWheelZoom={true} className='h-full w-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={afpaPos}>
                <Popup>
                    AFPA Rochefort
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export { MapLeaflet };