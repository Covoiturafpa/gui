import { Form, Button } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { RideFormInputs } from './RideFormInputs';


const SearchRidesForm = (props) => {
    
    const submitForm = () => {
        const data = createFormData();
        console.log(data);
    }

    const createFormData = () => {
        const formData = new FormData();
        return formData;
    }
    
    return (
        <Form fluid>
            <RideFormInputs />
            <FormGroup className='flex justify-end my-4'>
                <Button appearance="primary" onClick={submitForm}>Rechercher</Button>
            </FormGroup>
        </Form>
    );
}

export { SearchRidesForm };