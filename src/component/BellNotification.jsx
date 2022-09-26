import Bell from '@rsuite/icons/legacy/Bell';
import React from 'react';

const BellNotification = () => {
    return <>
        <span className="flex h-2 w-2 absolute top-2 left-8 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <Bell onClick={() => { /* ouverture panel notif */ }} />
    </>;
}

export { BellNotification };