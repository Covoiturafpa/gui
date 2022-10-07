import React, {useEffect, useState}from 'react';
import { Footer } from 'rsuite';
import { SlidePartner } from '../component/SlidePartnaire';
import { FooterAfpaInformations } from '../component/FooterAfpaInformations';
import { FooterAfpaLocation } from '../component/FooterAfpaLocation';
import  authService  from "../services/AuthService";
import  FetchService  from "../services/FetchService";

const LayoutFooter = () => {
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [centre, setCentre] = useState({});
    const [partners, setPartners] = useState([]);

    return (<Footer className="bg-header_footer bg-bottom h-20">
        {/*<div className='flex justify-around'>
            <FooterAfpaInformations centre={centre} />
            <FooterAfpaLocation centre={centre} />
        </div>

        <div >
            <SlidePartner partners={partners}/>
        </div>*/}
        <div>
            <ul className='inline'>
                <li>
                    <a href="#">Plan du site</a>
                </li>
                <li>
                    <a href="#">Conditions générales d'utilisation</a>
                </li>
                <li>
                    <a href="#">Mentions légales</a>
                </li>
            </ul>
        </div>
        <div className="bg-green-700 relative">
            <p className='text-center text-black p-1'>© Copyright Centre Afpa de Rochefort. Tous les droits sont réservés.</p>
        </div>
    </Footer>);
}

export { LayoutFooter };
