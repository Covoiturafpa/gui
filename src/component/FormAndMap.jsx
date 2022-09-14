import {React} from 'react';
import { FormSearchRides } from '../component/FormSearchRides';
import { FormLayout } from '../scenes/FormLayout';

const FormAndMap = (props) => {
    return(
        <FormLayout title={"Rechercher un trajet"} form={<FormSearchRides/>} />
    );
}

export { FormAndMap };