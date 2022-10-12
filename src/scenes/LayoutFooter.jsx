import React, {useEffect, useState}from 'react';
import { Footer, Stack } from 'rsuite';
import { SlidePartner } from '../component/SlidePartnaire';
import { FooterAfpaInformations } from '../component/Footer/FooterAfpaInformations';
import { FooterAfpaLocation } from '../component/Footer/FooterAfpaLocation';
import  authService  from "../services/AuthService";
import  FetchService  from "../services/FetchService";

const LayoutFooter = () => {
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [centre, setCentre] = useState({});
    const [partners, setPartners] = useState([]);

        return (<Footer className="bg-header_footer bg-bottom h-min-content">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:justify-around w-full lg:w-[800px] m-auto">
                <a className="text-black visited:text-black" href="#">Plan du site</a>
                <a className="text-black visited:text-black" href="#">Conditions générales d'utilisation</a>
                <a className="text-black visited:text-black" href="#">Mentions légales</a>
            </div>
            <div className=" relative">
                <p className='text-center text-black p-1'>© Copyright Centre Afpa de Rochefort. Tous les droits sont réservés.</p>
            </div>
        </Footer>);
}

export { LayoutFooter };
