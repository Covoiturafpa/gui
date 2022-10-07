import React, { useState, useEffect, createContext } from 'react';
import { RideFormInputs } from '../component/RideFormInputs';
import { Content, FlexboxGrid, Col } from 'rsuite';
import { SearchRidesForm } from '../component/SearchRidesForm';
import { MapLeaflet } from '../component/MapLeaflet';
import { AddRideForm } from '../component/AddRideForm';
import { CheckBoxDays } from '../component/CheckBoxDays';

const CheckboxDaysContext = createContext();


const SuggestRide = () => {
    const [dataDays, setDataDays] = useState([]);

    useEffect(() => {
        console.log(dataDays);
    }, [dataDays]);
    useEffect(() => {
        console.log(dataDays);
    }, []);
    return (<CheckboxDaysContext.Provider value={{ dataDays, setDataDays}}>
        <CheckBoxDays disabled={false} days={0}/>
    </CheckboxDaysContext.Provider>);
    /*return (
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
    );*/
}

export { CheckboxDaysContext, SuggestRide };