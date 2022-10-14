import { React, useState, useContext } from 'react';

import { Table, IconButton } from 'rsuite';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

import { FiArrowRight } from "react-icons/fi";

import CheckBoxDays from '../CheckBoxDays/CheckBoxDays';

import Moment from 'moment';
import RidesResultTable from './RidesResultTable';
import { RideFormContext } from './RideFormContextProvider';

const SearchResults = (props) => {

    const { rides } = useContext(RideFormContext);

    if (rides.value.length === 0) {
        return (
            <div>
                <div className="bg-gray-background rounded-t-md py-1">
                    <p className='text-center'>Aucun trajet disponible</p>
                </div>
            </div>
        );
    } 
    else {
        if (rides.value.length === 1) {
            return (<>
                <h5 className='text-center my-2'>Trajets disponible</h5>
                <RidesResultTable returns={false} />
            </>)
        }
        else if (rides.value.length === 2) {
            return (<>
                <h5 className='text-center my-2'>Trajets aller</h5>
                <RidesResultTable returns={false} />
                <h5 className='text-center my-2'>Trajets retour</h5>
                <RidesResultTable returns={true} />
            </>)
        }
    }
}

export default SearchResults;