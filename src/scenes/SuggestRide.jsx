import React, { useState, useEffect, createContext } from 'react';
import { RideFormInputs } from '../component/RideFormInputs';
import { Content, FlexboxGrid, Col } from 'rsuite';
import { SearchRidesForm } from '../component/SearchRidesForm';
import { MapLeaflet } from '../component/MapLeaflet';
import { AddRideForm } from '../component/AddRideForm';
import { CheckBoxDays } from '../component/CheckBoxDays';
import { DestinationContext } from './Booking';




const SuggestRide = () => {
    const [dataDays, setDataDays] = useState([]);
    const [destination, setDestination] = useState({ lat: 1, lon: 1 });

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    function debounce(fn, ms) {
        let timer
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                fn.apply(this, arguments)
            }, ms)
        };
    }

    const debouncedHandleResize = debounce(
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 1000
    );

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);
    }, []);

    useEffect(() => {
        console.log(dataDays);
    },[dataDays]);

    return(<Content className='h-full w-full flex justify-center align-middle'>
    <FlexboxGrid align='middle' justify='space-around' className='h-full w-full'>
        <DestinationContext.Provider value={{ destination, setDestination }}>
            <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex justify-end'>
                {<SearchRidesForm />}
            </FlexboxGrid.Item>
            {window.innerWidth >= 768 &&
                <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                    <MapLeaflet />
                </FlexboxGrid.Item>
            }
        </DestinationContext.Provider>
    </FlexboxGrid>
</Content>);
}

export {SuggestRide };