import {React, useState} from 'react';
import { Form, ButtonToolbar, Button, Panel, Checkbox, RadioGroup, Radio } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';


const FormSearchRides = (props) => {
    const [valueNbRideSearch, setValueNbRideSearch] = useState("return");
    const [valueRideType, setValueRideType] = useState("recurring");


    const nbRideSearchHandler = (event) => {
        console.log(event.target.value);
        setValueNbRideSearch(event.target.value)
      }
    return(<Form fluid>
                <RadioGroup inline={true}>
                    <Radio value="simple" >Aller simple</Radio>
                    <Radio value="return">Aller retour</Radio>
                </RadioGroup>
                <Form.Group> 
                    <Form.ControlLabel>Départ</Form.ControlLabel>
                    <Form.Control name="departure" />
                </Form.Group>
                <button className="text-xl">
                    <BsArrowDownUp/>
                </button>
                <Form.Group> 
                    <Form.ControlLabel>Arrivée</Form.ControlLabel>
                    <Form.Control name="arrival" />
                </Form.Group>
                <RadioGroup value={valueRideType} inline={true}>
                    <Radio value="oneTime">Ponctuel</Radio>
                    <Radio value="recurring">Régulier</Radio>
                </RadioGroup>
                {valueRideType === "recurring" ?
                    <CheckBoxDays days={0} />
                : ""}

            </Form>);
}

export { FormSearchRides };