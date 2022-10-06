import React, { useState } from 'react';
import { AfpaDaysTimetable } from './AfpaDaysTimetable';

const FooterAfpaInformations = (props) => {
    const [daysTimetable, setDaysTimetable] = useState(props.centre.daysTimetable);

    daysTimetable.sort((a,b) => a.id - b.id);
    return (
        <div>
            <div>
                <h4>Le {props.centre.name} est ouvert : </h4>
                <ul>
                    <AfpaDaysTimetable day={daysTimetable[0]}/>
                    <AfpaDaysTimetable day={daysTimetable[1]}/>
                    <AfpaDaysTimetable day={daysTimetable[2]}/>
                    <AfpaDaysTimetable day={daysTimetable[3]}/>
                    <AfpaDaysTimetable day={daysTimetable[4]}/>
                    <AfpaDaysTimetable day={daysTimetable[5]}/>
                    <AfpaDaysTimetable day={daysTimetable[6]}/>
                </ul>
            </div>
        </div>
    );
}

export { FooterAfpaInformations };