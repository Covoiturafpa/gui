import React, {useState}from 'react';
import { Footer } from 'rsuite';

import  authService  from "../services/AuthService";


const LayoutFooter = () => {
    // const [userId, setUserId] = useState(authService.getCurrentUserId());
    // const [centre, setCentre] = useState({});
    // const [partners, setPartners] = useState([]);

        return (<Footer className="rs-footer bg-white">
            <div className='bg-footer_wave bg-cover h-20 bg-no-repeat flex flex-col items-center justify-end'>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:justify-around w-full lg:w-[800px] mx-auto">
                    <a className="text-neutral-100 visited:text-neutral-100" href="#">Plan du site</a>
                    <a className="text-neutral-100 visited:text-neutral-100" href="#">Conditions générales d'utilisation</a>
                    <a className="text-neutral-100 visited:text-neutral-100" href="#">Mentions légales</a>
                </div>
                <div className=" relative">
                    <p className='text-center text-neutral-100 p-1'>© Copyright Centre Afpa de Rochefort. Tous les droits sont réservés.</p>
                </div>
            </div>

        </Footer>);
}

export { LayoutFooter };
