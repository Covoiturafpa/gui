import { React, useContext } from 'react';

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
                <RidesResultTable returns={true} />
                <h5 className='text-center my-2'>Trajets retour</h5>
                <RidesResultTable returns={true} />
            </>)
        }
    }
}

export default SearchResults;