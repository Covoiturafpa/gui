import {React, useState} from 'react';
import styles from './css/checkboxdays.module.css';

const CheckBoxDays = (props) => {
    const [allDays, setAllDays] = useState([{"name":"MONDAY", "translate":"Lundi"},
                                            {"name":"TUESDAY", "translate": "Mardi"},
                                            {"name":"WEDNESDAY", "translate":"Mercredi"},
                                            {"name":"THURSDAY","translate":"Jeudi"},
                                            {"name":"FRIDAY","translate":"Vendredi"},
                                            {"name":"SATURDAY","translate":"Samedi"},
                                            {"name":"SUNDAY", "translate":"Dimanche"}]);
    const [days, setDays] = useState(props.days);

    const handleChange = (event) => {
        console.log(event.target);

        if (event.target.children.checked) {
           
        }else {
            
        }
    }
    return (<div className='flex'>
                {allDays.map((day) => {
                    if(days === 0 || !days.some(item => item.name === day.name)) {
                        return(<div key={day.name}>
                            <input type="checkbox" key={day.name} id={day.name} className={styles.checkbox} name={day.translate} />
                            <label htmlFor={day.name} className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }else if (days.some(item => item.name === day.name)){
                        return(<div key={day.name}>
                            <input type="checkbox" key={day.name} id={day.name} className={styles.checkbox} name={day.translate} checked/>
                            <label htmlFor={day.name} className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }else {
                        
                    }
                })}
            </div>);
};

export  { CheckBoxDays };