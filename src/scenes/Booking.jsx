import React, { useState, useEffect } from 'react';
import { Content, FlexboxGrid, Col } from 'rsuite';
import SearchRidesForm from '../component/RideForms/SearchRidesForm';
import { MapLeaflet } from '../component/Map/MapLeaflet';
import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';

const Booking = () => {

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
                <RideFormContextProvider>
                    <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex justify-end'>
                            <SearchRidesForm />
                    </FlexboxGrid.Item>
                    { window.innerWidth >= 768 &&
                        <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                            <MapLeaflet />
                        </FlexboxGrid.Item>
                    }
                </RideFormContextProvider>
                <FlexboxGrid.Item colspan={24} md={22} className='h-full w-full'>
                    {<></>}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    );
}

export { Booking };