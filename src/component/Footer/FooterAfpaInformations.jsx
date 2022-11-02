import React, { useEffect, useState } from 'react';

import { AfpaDaysTimetable } from '../AfpaDaysTimetable';

/**
 * Footer indiquant les informations du centre : jour d'ouverture + horaires
 * 
 * @param {*} props 
 *  centre:
 *      { dayTimetable: [
                {
                    "id": 2,
                    "day": "TUESDAY",
                    "startMorning": "08:00:00",
                    "endMorning": "12:00:00",
                    "startAfternoon": "13:00:00",
                    "endAfternoon": "18:00:00"
                },
                ...
            ]
        }
 */
const FooterAfpaInformations = ({ centre }) => {
    const [daysTimetable, setDaysTimetable] = useState([]);

    useEffect(() => {
        let tmpDaysTimeTable = centre.daysTimetable;
        console.log(centre.daysTimetable);
        tmpDaysTimeTable.sort((a, b) => a.id - b.id);
        setDaysTimetable(tmpDaysTimeTable);
    }, []);

    return (daysTimetable.length > 0 && 
        <div>
            <div>
                <h4>Le {centre.name} est ouvert : </h4>
                <ul>
                    <AfpaDaysTimetable day={daysTimetable[0]} />
                    <AfpaDaysTimetable day={daysTimetable[1]} />
                    <AfpaDaysTimetable day={daysTimetable[2]} />
                    <AfpaDaysTimetable day={daysTimetable[3]} />
                    <AfpaDaysTimetable day={daysTimetable[4]} />
                    <AfpaDaysTimetable day={daysTimetable[5]} />
                    <AfpaDaysTimetable day={daysTimetable[6]} />
                </ul>
            </div>
        </div>);
}

export default FooterAfpaInformations;