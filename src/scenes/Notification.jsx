import React, { useState, useEffect } from 'react';
import { Message } from '../component/Message';
import { api } from '../config/api';

async function fetchNotifications(id) {
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        mode: "cors"
    }
    let notifications = null;
    try {
        let response = await fetch(api + "/users/" + id + "/notifications", options);
        if (!response.ok) {
            let message = `Erreur ${response.status}`;
            throw new Error(message);
        }
        notifications = await response.json();
    }
    catch(error) {
        console.log(error.message);
    }
    return notifications;
}

async function setAsReadAllNotifications(id) {
    let options = {
        method: "PUT",
        mode: "cors"
    }
    try {
        let response = await fetch(api + "/users/" + id + "/notifications", options);
        if (!response.ok) {
            let message = `Erreur ${response.status}`;
            throw new Error(message);
        }
    }
    catch(error) {
        console.log(error.message);
    }
}

function compareNotifications(notifA, notifB) {
    if (notifA.isUnread && !notifB.isUnread) {
        return -1;
    }
    if (!notifA.isUnread && notifB.isUnread) {
        return 1;
    }
    else {
        if (new Date(notifA.createdTime) < new Date(notifB.createdTime)) {
            return 1;
        }
        if (new Date(notifA.createdTime) > new Date(notifB.createdTime)) {
            return -1;
        }
        else {
            return 0;
        }
    }
}

function isLastUnreadNotif(notification, index, notifications) {
    if (index < (notifications.length - 1)) {
        if (notification.isUnread && !notifications[index+1].isUnread) {
            return true;
        }
    }
    else if (index === (notifications.length - 1) && notification.isUnread) {
        return true;
    }
    return false;
}

const Notification = () => {
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    let idUser = 97

    useEffect(() => {
        if (!isLoaded) {
            fetchNotifications(idUser).then(data => {
                data.sort(compareNotifications);
                let lastUnreadNotifIndex = data.findIndex(isLastUnreadNotif);
                if (lastUnreadNotifIndex === -1) {
                    setReadNotifications(data);
                }
                else {
                    setUnreadNotifications(data.slice(0, lastUnreadNotifIndex + 1));
                    setReadNotifications(data.slice(lastUnreadNotifIndex + 1));
                }
            });
            setIsLoaded(true);
        }
        if (isLoaded) {
            //setAsReadAllNotifications(idUser);
        }
    }, []);

    if (!isLoaded) {
        return(<div>Chargement...</div>);
    }
    else {
        return (<>
                    <h2 className='text-2xl text-center'>Nouvelles notifications</h2>
                    <ul className='p-2'>
                        {unreadNotifications.map((notification) => (<li key={notification.id} className="m-2"><Message {...notification}/></li>))}
                    </ul>
                    <h2 className='text-2xl text-center'>Anciennes notifications</h2>
                    <ul className='p-2'>
                        {readNotifications.map((notification) => (<li key={notification.id} className="m-2"><Message {...notification}/></li>))}
                    </ul>
                </>);
    }
}

export { Notification };