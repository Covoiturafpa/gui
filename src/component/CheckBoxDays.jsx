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
    return (<div className='flex'>
                {allDays.map((day) => {
                    if(days === 0) {
                        return(<div>
                            <input type="checkbox" key={day.name} className={styles.checkbox} name={day.translate} />
                            <label className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }else if(days.some(item => item.name === day.name)){
                        return(<div>
                            <input type="checkbox" key={day.name} className={styles.checkbox} name={day.translate} checked/>
                            <label className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }else {
                        return(<div>
                            <input type="checkbox" key={day.name} className={styles.checkbox} name={day.translate}/>
                            <label className={styles.labelcheckbox}>{day.translate.charAt(0).toUpperCase()}</label>  
                        </div>);
                    }
                })}
            </div>);
};

export  { CheckBoxDays };