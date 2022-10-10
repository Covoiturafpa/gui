import React, { useState, useEffect, createContext } from 'react';
import { Content, FlexboxGrid, Col } from 'rsuite';
import SearchRidesForm from '../component/RideForms/SearchRidesForm';
import { MapLeaflet } from '../component/Map/MapLeaflet';
import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';

const DestinationContext = createContext();

const Booking = () => {

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
        <Content className='h-full w-full flex justify-center align-middle'>
            <FlexboxGrid align='middle' justify='space-around' className='h-full w-full'>
                <DestinationContext.Provider value={{ destination, setDestination }}>
                    <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex justify-end'>
                        <RideFormContextProvider>
                            <SearchRidesForm />
                        </RideFormContextProvider>
                    </FlexboxGrid.Item>
                    { window.innerWidth >= 768 &&
                        <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                            <MapLeaflet />
                        </FlexboxGrid.Item>
                    }
                </DestinationContext.Provider>
                <FlexboxGrid.Item colspan={24} md={22} className='h-full w-full'>
                    {<></>}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    );
}

export { DestinationContext, Booking };