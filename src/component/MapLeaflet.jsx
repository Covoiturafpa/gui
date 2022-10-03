import { useEffect, useContext, useState } from "react";
import "../../node_modules/leaflet/dist/leaflet.css";
import styles from './css/mapleaflet.module.css';
import { MapContainer, TileLayer, Marker, Popup, Icon, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet-routing-machine";
import { DestinationContext as DestinationContext } from "../scenes/BookingForm";
import authHeader from '../services/AuthHeader';
import FetchService from "../services/FetchService";

const afpaIcon = new L.Icon({
    iconUrl: require(`../assets/LogoAfpa.jpg`),
    iconSize: [60, 30],
    shadowSize: [0, 0],
    className: "object-fill border-solid border border-black"
});

const MapLeaflet = () => {



    const { destination } = useContext(DestinationContext);
    const [waypoints, setWaypoints] = useState({});
    const [afpaPos, setAfpaPos] = useState([0, 0])
    // [45.95810, -0.96423];


    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    useEffect(() => {
        FetchService.get("/centre").then((data) => {
            const centreInformations = data;
            setAfpaPos([centreInformations.latitude, centreInformations.longitude]);
        })
    }, [])

    useEffect(() => {

        setWaypoints({
            destination: {
                lat: destination.lat,
                lon: destination.lon
            },
            arrival: {
                lat: afpaPos[0],
                lon: afpaPos[1]
            }
        })
        //setWaypoints([destination.lat, destination.lon, afpaPos[0], afpaPos[1]]);

    }, [destination])

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
            <Routing waypoints={waypoints} />
        </MapContainer>
    )
}


const Routing = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        if (!map
            || Object.keys(waypoints).length === 0
            || (waypoints.destination.lat === null || waypoints.destination.lon === null)) {
            return;
        }
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(waypoints.destination.lat, waypoints.destination.lon),
                L.latLng(waypoints.arrival.lat, waypoints.arrival.lon)
            ],
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 4 }]
            },
            summaryTemplate: "",
            itineraryClassName: styles.hide,
            fitSelectedRoutes: true
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [waypoints]);

    return null;
}

export { MapLeaflet };