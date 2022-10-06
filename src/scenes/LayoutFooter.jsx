import React, {useEffect, useState}from 'react';
import { Footer } from 'rsuite';
import { SlidePartner } from '../component/SlidePartnaire';
import { FooterAfpaInformations } from '../component/FooterAfpaInformations';
import { FooterAfpaLocation } from '../component/FooterAfpaLocation';
import  authService  from "../services/AuthService";
import  FetchService  from "../services/FetchService";

const LayoutFooter = () => {
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [isLoaded, setIsLoaded] = useState(false);
    const [centre, setCentre] = useState({});
    const [partners, setPartners] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = FetchService.get("/centre");
        fetch.then(
            (result) => {
                setCentre(result);
                setPartners(result.partners);
                setIsLoaded(true);

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [userId]);

    if (error) {
        return <div></div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    }else {
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
}

export { LayoutFooter };
