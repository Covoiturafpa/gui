import React, { useState, useEffect, useContext } from 'react';

import styles from './checkboxdays.module.css';

import { DaysTranslate } from '../DaysTranslate';
import { RideFormContext } from '../RideForms/RideFormContextProvider';

// props contient les days et disabled pour désactiver le click
const CheckBoxDays = (props) => {

    //Tableau contenant des Days et sert à la construction en front
    const [checkboxes, setCheckboxes] = useState([]);
    const {days} = useContext(RideFormContext);

    //construit le tableau checkboxes avec les paramètre données en props
      useEffect(() => {
        setCheckboxes([]);
        let newCheckboxes = [];
        DaysTranslate.map((day) => {
            if(props.days === 0 || !props.days.some(item => item.idDayWeek === day.id)) {
                newCheckboxes.push({id: day.id, name: day.name, translate: day.translate, checked: false});
                setCheckboxes(newCheckboxes);

            }else if (props.days.some(item => item.idDayWeek === day.id)){ 
                newCheckboxes.push({id: day.id, name: day.name, translate: day.translate, checked: true});
                setCheckboxes(newCheckboxes);
            }
            return newCheckboxes;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps 
      }, []);

      //Transmets à rideFormContext les idDayWeek checked
      useEffect(() => {
        let newData = [];
        checkboxes.map((checkbox) => {
            if(checkbox.checked === true) {
                newData.push({idDayWeek: checkbox.id});
            }
            return newData;
        });
        days.setValue(newData);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
      }, [checkboxes]);

      //Mets à jour les données coté front
      const toggleCheckbox = (id, index) => {
        const checkboxDataFront = [...checkboxes];
        checkboxDataFront[index].checked = !checkboxDataFront[index].checked;
        setCheckboxes(checkboxDataFront);

      }

      return (
        <div className='flex'>
            {checkboxes.map((checkbox, index )=> {
                return <div key={checkbox.id}>
                    <input disabled={props.disabled} type="checkbox" key={checkbox.id} id={checkbox.id} className={styles.checkbox} name={checkbox.translate} checked={checkbox.checked} onChange={() => toggleCheckbox(checkbox.id, index)}/>
                    <div className={styles.motherdiv}>
                        <label htmlFor={checkbox.name} className={styles.labelcheckbox}>{checkbox.translate.charAt(0).toUpperCase()}</label> 
                    </div>
                </div>
            })}
        </div>
      );
};

export default CheckBoxDays;