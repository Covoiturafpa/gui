import { useEffect } from 'react';
import { useContext } from 'react';
import {React, useState} from 'react';
import styles from './css/checkboxdays.module.css';
import { DaysTranslate } from './DaysTranslate';
import { CheckboxDaysContext } from '../scenes/SuggestRide';

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
        console.log(dataCheckboxes);
        setDataDays(dataCheckboxes);
      }, [checkboxes]);

      const toggleCheckbox = (id, index) => {
        const checkboxDataFront = [...checkboxes];
        checkboxDataFront[index].checked = !checkboxDataFront[index].checked;
        setCheckboxes(checkboxDataFront);
        console.log(checkboxes);

      }
      if(days == 0)
      return (
        <div className='flex'>
            {checkboxes.map((checkbox, index )=> {
                return <div key={checkbox.id}>
                    <input disabled={props.disabled} type="checkbox" key={checkbox.id} id={checkbox.id} className={styles.checkbox} name={checkbox.translate} checked={checkbox.checked} onClick={() => toggleCheckbox(checkbox.id, index)}/>
                    <div className={styles.motherdiv}>
                        <label htmlFor={checkbox.name} className={styles.labelcheckbox}>{checkbox.translate.charAt(0).toUpperCase()}</label> 
                    </div>
                </div>
            })}
        </div>
      );

      /*
    return (<div className='flex'>
                {DaysTranslate.map((day) => {
                    if(days === 0 || !days.some(item => item.name === day.name)) {
                        return(<div key={day.id}>
                            <input disabled={props.disabled} type="checkbox" key={day.id} id={day.id} className={styles.checkbox} name={day.translate}/>
                            <div className={styles.motherdiv}>
                                <label htmlFor={day.name} className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label> 
                            </div>
                        </div>);
                    }else if (days.some(item => item.name === day.name)){
                        return(<div key={day.id}>
                            <input disabled={props.disabled} type="checkbox" key={day.id} id={day.id} className={styles.checkbox} name={day.translate} checked/>  
                            <div className={styles.motherdiv}>
                                <label htmlFor={day.name} className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>
                            </div>
                        </div>);
                    }else {
                        
                    }
                })}
            </div>);*/
};

export  { CheckBoxDays };