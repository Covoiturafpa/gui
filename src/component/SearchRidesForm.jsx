import { React, useState } from 'react';
import { Form, ButtonToolbar, Button, Panel, Checkbox, RadioGroup, Radio, DatePicker, DateRangePicker, Stack } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';
import FormGroup from 'rsuite/esm/FormGroup';
import FormControl from 'rsuite/esm/FormControl';


const SearchRidesForm = (props) => {
    const [valueNbRideSearch, setValueNbRideSearch] = useState("return");
    const [rideType, setRideType] = useState("R");
    const [afpaValue, setAfpaValue] = useState("AFPA Rochefort");
    const [destinationValue, setDestinationValue] = useState("");


    const nbRideSearchHandler = (event) => {
        console.log(event.target.value);
        setValueNbRideSearch(event.target.value)
    }

    const datePickerRanges = [
        {
            label: "Aujourd'hui",
            value: new Date(),
            closeOverlay: true
        },
    ];

    return (<Form fluid>
        <Stack wrap>
            <RadioGroup inline={true} value={rideType} onChange={setRideType} className='mr-4'>
                <Radio value="O" >Ponctuel</Radio>
                <Radio value="R" >Régulier</Radio>
            </RadioGroup>
            <Checkbox >Aller retour</Checkbox>
        </Stack>
        <Form.Group className='pt-2' controlId='destinationInput'>
            <Form.ControlLabel>Départ</Form.ControlLabel>
            <Form.Control name="destination" value={destinationValue}/>
        </Form.Group>
        <button className="text-xl w-full flex justify-center">
            <BsArrowDownUp onClick={() => {
                const destination = document.querySelector("#destinationInput");
                const afpa = document.querySelector("#afpaInput");
                [destination.name, afpa.name] = [afpa.name, destination.name];
                const temp = afpaValue;
                setAfpaValue(destinationValue);
                setDestinationValue(temp);
            }}/>
        </button>
        <Form.Group controlId='afpaInput'>
            <Form.ControlLabel>Arrivée</Form.ControlLabel>
            <Form.Control name="afpa" value={afpaValue}/>
        </Form.Group>
        <div className='h-36'>
        {rideType === "O" &&
            <FormGroup className='pt-3'>
                <Form.ControlLabel>Date de début</Form.ControlLabel>
                <DatePicker format="yyyy-MM-dd" ranges={datePickerRanges} placeholder={"aaaa-mm-jj"} />
            </FormGroup>
        }
        {rideType === "R" &&
            <>
                <FormGroup className='pl-1 pt-3'>
                    <Form.ControlLabel>Jours</Form.ControlLabel>
                    <RadioGroup>
                        <CheckBoxDays days={0} />
                    </RadioGroup>
                </FormGroup>
                <FormGroup className='pt-0'>
                    <Form.ControlLabel>Dates de début - fin</Form.ControlLabel>
                    <DateRangePicker format="yyyy-MM-dd" ranges={datePickerRanges} placeholder={"aaaa-mm-jj"} showOneCalendar placement='topStart' />
                </FormGroup>
            </>
        }
        </div>
        <FormGroup className='flex justify-end'>
            <Button appearance="primary">Rechercher</Button>
        </FormGroup>
    </Form>);
}

export { SearchRidesForm };