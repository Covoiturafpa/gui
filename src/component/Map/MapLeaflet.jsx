import { useEffect, useContext, useState } from "react";

import "/node_modules/leaflet/dist/leaflet.css"; // ../.. Faut-il remonter de 2 dossiers ? WORKING ?!
import styles from './mapleaflet.module.css';

import { Message } from 'rsuite';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-routing-machine";
import FetchService from "../../services/FetchService";
import { AfpaIconSvg } from "../AfpaIconSvg";
import {RideFormContext } from '../RideForms/RideFormContextProvider';

const MapLeaflet = () => {

    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates } = useContext(RideFormContext);
    const [waypoints, setWaypoints] = useState({
        destination,
        "arrival": {
            "lat": null,
            "lon": null
        }
    });

    useEffect(() => {
        FetchService.get("/centre").then((data) => {
            if (data.latitude !== undefined && data.longitude != undefined) {
                setWaypoints(
                    {
                        ...waypoints,
                        "arrival": {
                            "lat": data.latitude,
                            "lon": data.longitude
                        }
                    })
            }
        })
    }, [])

    useEffect(() => {
        setWaypoints(
            {
                ...waypoints,
                "destination": {
                    "lat": destination.lat,
                    "lon": destination.lon
                }
            })
    }, [destination])

    const afpaSvgIcon = L.divIcon({
        html: AfpaIconSvg,
        className: "",
        iconSize: [38, 45],
        iconAnchor: [19, 22.5],
        draggable: false
    })

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    return (
        waypoints.arrival.lat !== null && waypoints.arrival.lon !== null ?
            <MapContainer center={[waypoints.arrival.lat, waypoints.arrival.lon]} zoom={12} scrollWheelZoom={true} className='h-full w-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[waypoints.arrival.lat, waypoints.arrival.lon]} icon={afpaSvgIcon} >
                    <Popup>
                        AFPA Rochefort
                    </Popup>
                </Marker>
                {waypoints.arrival !== undefined ? <Routing waypoints={waypoints} /> : null}
            </MapContainer>
            : <div className="flex flex-col justify-center items-center h-full">
                <Message className="!relative justify-center" showIcon type="error" header="Erreur" full>
                    Récupération des données du centre impossible
                </Message>
            </div>
    )
}


const Routing = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        console.log(waypoints)
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
            createMarker: function (i, waypoint, n) {
                if (n === 2) {
                    if (i === 0) {
                        const defaultIcon = L.marker(waypoint.latLng, {
                            draggable: false
                        })
                        return defaultIcon
                    }
                }
            },
            summaryTemplate: "",
            itineraryClassName: styles.hide,
            fitSelectedRoutes: true,
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [waypoints]);

    return null;
}

export { MapLeaflet };