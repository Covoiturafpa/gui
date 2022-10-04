import React from 'react';
import { Footer } from 'rsuite';
import { SlidePartner } from '../component/SlidePartnaire';
const LayoutFooter = () => {
    return (<Footer className=' bg-green-afpa'>
        <SlidePartner/>
        <div className="bg-green-700">
            <p className='text-center text-black p-1'>© Copyright Centre Afpa de Rochefort. Tous les droits sont réservés.</p>
        </div>
    </Footer>);
}

export { LayoutFooter };
