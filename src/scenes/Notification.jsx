import React from 'react';
import { Message } from '../component/Message';
import { connectedUser } from '../config/api';


const Notification = () => {
    return (<>
                <ul>
                    {connectedUser.notifications.map((notification) => (<li key={notification.id}><Message {...notification}/></li>))}
                </ul>
            </>);
}

export { Notification };