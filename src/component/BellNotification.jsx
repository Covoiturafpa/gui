import Bell from '@rsuite/icons/legacy/Bell';
import React from 'react';

const BellNotification = () => {
    return <>
        <span class="flex h-2 w-2 absolute top-2 left-8 z-10">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <Bell onClick={() => { /* ouverture panel notif */ }} />
    </>;
}

export { BellNotification };