import React from 'react';
import { useState } from 'react';
import { Form, RadioGroup, Radio, DateRangePicker, SelectPicker} from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { BsArrowDownUp } from "react-icons/bs";
import  authService  from "../services/AuthService";

const AddRideForm = () => {
    const [type, setType] = useState("");
    const [nbRide, setNbRide] = useState("");
    const { beforeToday } = DateRangePicker;

    return(
        <Form>
            <RadioGroup  inline value={type} onChange={setType}>
                <Radio value="O">Ponctuel</Radio>
                <Radio value="R">Régulier</Radio>
            </RadioGroup>
            <RadioGroup inline  value={nbRide} onChange={setNbRide}>
                <Radio value="O">Aller simple</Radio>
                <Radio value="R">Aller retour</Radio>
            </RadioGroup>
            <Form.Group controlId="departure">
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" />
            </Form.Group>
            <button>
                <BsArrowDownUp />
            </button>
            <Form.Group controlId="arrival">
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" />
            </Form.Group>
            <DateRangePicker disabledDate={beforeToday()}/>
            <FormGroup className='pl-1 pt-3'>
                <Form.ControlLabel>Jours</Form.ControlLabel>
                <SelectPicker style={{ width: 224 }} />
            </FormGroup>
            <SelectPicker style={{ width: 224 }} />
        </Form>
    );
}

export {AddRideForm} ; 