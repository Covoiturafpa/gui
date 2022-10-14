import React, { useState, useEffect, createContext } from 'react';
import { RideFormInputs } from '../component/RideForms/RideFormInputs';

import { Content, FlexboxGrid, Col } from 'rsuite';
import  SearchRidesForm  from '../component/RideForms/SearchRidesForm';
import  {RideFormContextProvider}  from '../component/RideForms/RideFormContextProvider';
import { MapLeaflet } from '../component/Map/MapLeaflet';
import { AddRideForm } from '../component/RideForms/AddRideForm';
import { CheckBoxDays } from '../component/CheckBoxDays/CheckBoxDays';
import { DestinationContext } from './Booking';

const SuggestRide = () => {
    const [destination, setDestination] = useState({ lat: null, lon: null });

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

    return (<Content className='h-full w-full flex'>
        <FlexboxGrid align='start' justify='space-around' className='h-full w-full'>
            <RideFormContextProvider>
                <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex'>
                    <AddRideForm />
                </FlexboxGrid.Item>
                {window.innerWidth >= 768 &&
                    <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                        <MapLeaflet />
                    </FlexboxGrid.Item>
                }
            </RideFormContextProvider>
        </FlexboxGrid>
    </Content>);
}

export { SuggestRide };