import Bell from '@rsuite/icons/legacy/Bell';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FetchService from '../services/FetchService';
import AuthService from '../services/AuthService';

const BellNotification = () => {

    function fetchHasNewNotifications() {
        FetchService.get("/api/users/" + AuthService.getCurrentUserId() + "/new_notifications").then(data => {
            setHasNewNotifications(data);
        });
    }

    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        let interv;
        if (intervalId === null) {
            fetchHasNewNotifications();
            interv =  setInterval(fetchHasNewNotifications,500000)
            setIntervalId(interv);
        }
        return () => {clearInterval(interv)};
    }, []);

    return (<>
        {hasNewNotifications && <span className="flex h-2 w-2 absolute top-2 left-8 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>}
        <Bell onClick={() => { /* ouverture panel notif */ }} />
    </>);
}

export { BellNotification };