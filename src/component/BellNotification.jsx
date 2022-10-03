import Bell from '@rsuite/icons/legacy/Bell';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FetchService from '../services/FetchService';

// async function fetchHasNewNotifications(id) {
//     let options = {
//         method: "GET",
//         headers: {
//             "Content-type": "application/json;charset=UTF-8"
//         },
//         mode: "cors"
//     }
//     let hasNewNotifications = null;
//     try {
//         let response = await fetch(api + "/users/" + id + "/new_notifications", options);
//         if (!response.ok) {
//             let message = `Erreur ${response.status}`;
//             throw new Error(message);
//         }
//         hasNewNotifications = await response.json();
//     }
//     catch(error) {
//         console.log(error.message);
//     }
//     return hasNewNotifications;
// }

const BellNotification = () => {

    let [hasNewNotifications, setHasNewNotifications] = useState(false);
    let [intervalId, setIntervalId] = useState(null);

    let idUser = 97;

    useEffect(() => {
        if (intervalId === null) {
            setIntervalId(setInterval(() => {
                FetchService.get("/users/51/new_notifications").then(data => {
                    setHasNewNotifications(true);
                })
            },5000));
        }
        return () => {clearInterval(intervalId)};
    }, []);

    return (<>
        { hasNewNotifications && <span className="flex h-2 w-2 absolute top-2 left-8 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>}
        <Bell onClick={() => { /* ouverture panel notif */ }} />
    </>);
}

export { BellNotification };