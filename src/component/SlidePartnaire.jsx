import { React } from 'react';
import afaq from '../assets/partenaires/Afaq_9001.png';
import franceRelance from '../assets/partenaires/france-relance.png';
import fse from '../assets/partenaires/fse.jpg';
import opqf from '../assets/partenaires/opqf.png';
import region from '../assets/partenaires/region.jpg';
import synofdes from '../assets/partenaires/synofdes.png';

const SlidePartner = (props) => {

    return(
        <div className="w-5/6 overflow-hidden relative m-auto p-2">
            <div className="animate-scroll flex w-[calc(300px * 12)] h-full">
                <img className="w-[300px] h-[180px] object-contain mx-2" src={afaq} alt="Logo AFAQ" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={franceRelance} alt="Logo France relance" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={fse} alt="Logo union européen fse" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={opqf} alt="Logo OPQF" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={region} alt="Logo Région nouvelle aquitaine" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={synofdes} alt="Logo Synofdes" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={afaq} alt="Logo AFAQ" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={franceRelance} alt="Logo France relance" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={fse} alt="Logo union européen fse" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={opqf} alt="Logo OPQF" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={region} alt="Logo Région nouvelle aquitaine" />
                <img className="w-[300px] h-[180px] object-contain mx-2" src={synofdes} alt="Logo Synofdes" />
            </div>
        </div>
    )
}

export { SlidePartner };