import { Panel } from "rsuite";
import { Member, InfoRound, CheckRound, BlockRound, Trash } from '@rsuite/icons';
import FetchService from "../services/FetchService";
import AuthService from '../services/AuthService';


function returnByNotifType(type, ne_value, nt_value, nr_value, ar_value, rr_value) {
    switch (type) {
        case "NEW_EMPLOYEE":
            return ne_value;
        case "NEW_TRAINEE":
            return nt_value;
        case "NEW_RESERVATION":
            return nr_value;
        case "ACCEPTED_RESERVATION":
            return ar_value;
        case "REJECTED_RESERVATION":
            return rr_value;
        default:
            return rr_value;
    }
}

function createHeaderText(type) {
    return returnByNotifType(type, "Nouvel.le Employé.e", "Nouveau Stagiaire", "Nouvelle Réservation", "Réservation Acceptée", "Réservation Refusée")
}

function createBackgroundColor (type, unread) {
    let backgroundColor = returnByNotifType(type, "bg-yellow-100", "bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-red-100");
    if (unread === true) {
        return backgroundColor;
    }
    else {
        return "bg-gray-100";
    }
}

const HeaderContent = (props) => {
    return (<div className="font-bold text-base">{createHeaderText(props.type)}</div>);
}

const MessageIcon = (props) => {
    let iconSize = "1.4em";
    return returnByNotifType(props.type, <Member fontSize={iconSize} color="#f5a623"/>, <Member fontSize={iconSize} color="#f5a623"/>, <InfoRound fontSize={iconSize} color="blue"/>, <CheckRound fontSize={iconSize} color="green"/>, <BlockRound fontSize={iconSize} color="red"/>);
}

const Message = (props) => {

    function deleteMessage() {
        FetchService.delete("/users/" + AuthService.getCurrentUserId() + "/notifications?idNotification=" + props.notification.id, props.notification).then(() => {props.onChange(props.notification);});
    }

    return (
            <Panel shaded bordered bodyFill>
                <div className={"grid grid-cols-12 items-center px-2 py-1 " + createBackgroundColor(props.notification.type, props.notification.isUnread)}>
                    <div className="col-span-2 justify-self-start "><MessageIcon {...{"type" : props.notification.type}}/></div>
                    <div className="col-span-8 justify-self-center"><HeaderContent {...{"type" : props.notification.type}} className='text-center'/></div>
                    <Trash className="col-span-2 justify-self-end cursor-pointer" fontSize="1.3em" onClick={deleteMessage}/>
                    <div className="col-span-12  justify-self-center" dangerouslySetInnerHTML={{__html: props.notification.content}}></div>
                </div>
            </Panel>
    )
}

export { Message }