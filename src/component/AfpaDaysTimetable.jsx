import React, {useEffect, useState} from 'react';
import { DaysTranslate } from './DaysTranslate';

/**
 * TODO : N'est pas encore utilisé dsans l'application
 */
/**
 * @param {*} props {day: "Lundi" , startMorning: "Heure matin début", endMorning: "Heure matin fin", startAfternoon: "Heure après-midi début", endAfternoon: "Heure après-midi fin"}
 * @returns 
 */
const AfpaDaysTimetable = (props) => {
    const [dayName, setDayName] = useState("");

    useEffect(() => {
        DaysTranslate.map(dayTranslate => {
            if(dayTranslate.name == props.day.day) {
                setDayName(dayTranslate.translate);
            }
        });
    }, []);

    return(
        <li>{dayName} : de {props.day.startMorning !== null ? props.day.startMorning : "-" } à {props.day.endMorning !== null ? props.day.endMorning : "-"} et de {props.day.startAfternoon !== null ? props.day.startAfternoon : "-"} à {props.day.endAfternoon !== null ? props.day.endAfternoon : "-"}</li>
    );
}

export { AfpaDaysTimetable };