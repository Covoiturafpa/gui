import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import styles from './css/checkboxdays.module.css';

const CheckBoxDays = (props) => {
    const [allDays, setAllDays] = useState(["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]);
    const [days, setDays] = useState(props);
    let i = 0;
    return (<div className='flex'>
                {allDays.map((day) => {
                    if(days[i] == day) {
                        i++;
                        return(<div>
                            <input type="checkbox" id={day} className={styles.checkbox} name={day} checked/>
                            <label className={styles.labelcheckbox}>{day.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }else {
                        return(<div>
                            <input type="checkbox" id={day} className={styles.checkbox} name={day}/>
                            <label className={styles.labelcheckbox}>{day.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }
                })}
            </div>);
};

export  { CheckBoxDays };