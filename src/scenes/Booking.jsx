import React, { useState, useEffect, useRef, useContext } from 'react';
import { Content, FlexboxGrid, Col } from 'rsuite';
import { MapLeaflet } from '../component/Map/MapLeaflet';
import SearchRidesForm from '../component/RideForms/SearchRidesForm';
import SearchResults from '../component/RideForms/SearchResults';
import { RideFormContext } from '../component/RideForms/RideFormContextProvider';
import { IconButton } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';

const Booking = () => {

    const searchForm = useRef();
    const searchResultRef = useRef();
    const { rides } = useContext(RideFormContext);

    useEffect(() => {
        if (rides.value[0].length !== 0) {
            searchResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [rides.value])

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const scrollToForm = () => {
        if (searchForm) {
            searchForm.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

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
            if (dimensions) {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                })
            }
        }, 1000
    );

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);
    });

    return (
        <Content className='h-full w-full flex justify-center align-middle' ref={searchForm}>
            <FlexboxGrid align='middle' justify='space-around' className='h-full w-full'>
                <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-fit flex justify-end'>
                    <SearchRidesForm />
                </FlexboxGrid.Item>
                {window.innerWidth >= 768 &&
                    <FlexboxGrid.Item as={Col} colspan={22} md={11} className='h-full w-full'>
                        <MapLeaflet />
                    </FlexboxGrid.Item>
                }
                <FlexboxGrid.Item colspan={24} md={22} className='h-full w-full' ref={searchResultRef}>
                    <SearchResults />
                    {rides.value.length > 0 &&
                        <div className='mt-5 pr-5 md:pr-10 flex justify-end'>
                            <IconButton icon={<SortUpIcon />} size="lg" onClick={scrollToForm} />
                        </div>
                    }
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    );
}

export { Booking };