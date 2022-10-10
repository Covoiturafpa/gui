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
    },[dataDays]);

    return(<CheckboxDaysContext.Provider value={{ dataDays, setDataDays}}>
        <CheckBoxDays days={0} disabled={false} context={CheckboxDaysContext}/>
    </CheckboxDaysContext.Provider>);
}

export { SuggestRide };