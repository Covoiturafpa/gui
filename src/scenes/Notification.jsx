import React, { useState, useEffect } from 'react';
import { Message } from '../component/Message';
import { api } from '../config/api';
import FetchService from '../services/FetchService';
import AuthService from '../services/AuthService';

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

const NotificationsDiv = (props) => {
    return (<>
                <h2 className='text-2xl text-center'>{props.name}</h2>
                <ul className='p-2'>
                    {props.array.map((notification) => (<li key={notification.id} className="m-2"><Message {...notification}/></li>))}
                </ul>
            </>)
}

const Notification = () => {

    function fillNotificationArrays(data) {
        let lastUnreadNotifIndex = data.findIndex(isLastUnreadNotif);
        if (lastUnreadNotifIndex === -1) {
            setReadNotifications(data);
        }
        else {
            setUnreadNotifications(data.slice(0, lastUnreadNotifIndex + 1));
            setReadNotifications(data.slice(lastUnreadNotifIndex + 1));
        }
    }

    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            FetchService.get("/users/" + AuthService.getCurrentUserId() + "/notifications").then(data => {
                data.sort(compareNotifications);
                fillNotificationArrays(data);
            });
            setIsLoaded(true);
        }
        return () => {FetchService.put("/users/" + AuthService.getCurrentUserId() + "/notifications", {...unreadNotifications});}
    }, []);

    if (!isLoaded) {
        return(<div>Chargement...</div>);
    }
    else {
        return (<>
                    <NotificationsDiv {...{name:"Nouvelles Notifications", array:unreadNotifications}}/>
                    <NotificationsDiv {...{name:"Anciennes Notifications", array:readNotifications}}/>
                </>);
    }
}

export { Notification };