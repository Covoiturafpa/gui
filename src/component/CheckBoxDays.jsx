import { useEffect } from 'react';
import { useContext } from 'react';
import {React, useState} from 'react';
import styles from './css/checkboxdays.module.css';
import { DaysTranslate } from './DaysTranslate';
import { CheckboxDaysContext } from './RideFormInputs';

const CheckBoxDays = (props) => {
    const [days, setDays] = useState(props.days);
    const [checkboxes, setCheckboxes] = useState([]);
    const [dataCheckboxes, setDataCheckboxes] = useState([]);
    const {dataDays, setDataDays} = useContext(CheckboxDaysContext);

      useEffect(() => {
        setCheckboxes([]);
        let newCheckboxes = [];
        DaysTranslate.map((day) => {
            if(props.days === 0 || !props.days.some(item => item.idDayWeek == day.id)) {
                newCheckboxes.push({id: day.id, name: day.name, translate: day.translate, checked: false});
                setCheckboxes(newCheckboxes);

            }else if (props.days.some(item => item.idDayWeek == day.id)){ 
                newCheckboxes.push({id: day.id, name: day.name, translate: day.translate, checked: true});
                setCheckboxes(newCheckboxes);
            }
        });
      }, []);

      useEffect(() => {
        setDataCheckboxes([]);
        let newData = [];
        checkboxes.map((checkbox) => {
            if(checkbox.checked == true) {
                newData.push({name: checkbox.name});
                setDataCheckboxes(newData);
            }
        });
        setDataDays(newData);
      }, [checkboxes]);

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

export  { CheckBoxDays };