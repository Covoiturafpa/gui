import React, { useState, useEffect, createContext } from 'react';
import { RideFormInputs } from '../component/RideFormInputs';
import { Content, FlexboxGrid, Col } from 'rsuite';
import { SearchRidesForm } from '../component/SearchRidesForm';
import { MapLeaflet } from '../component/MapLeaflet';
import { AddRideForm } from '../component/AddRideForm';

const DestinationContext = createContext();


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

    return (
        <DestinationContext.Provider value={{ destination, setDestination }}>
        <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex justify-end'>
            {<AddRideForm dimensions={dimensions} />}
        </FlexboxGrid.Item>
        {window.innerWidth >= 768 &&
            <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                <MapLeaflet />
            </FlexboxGrid.Item>
        }
    </DestinationContext.Provider>
    );
}

export { SuggestRide };