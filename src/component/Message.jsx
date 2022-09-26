import { Panel } from "rsuite";
import { CharacterAuthorize, InfoRound, CheckRound, BlockRound, Trash } from '@rsuite/icons';

const MessageIcon = (props) => {
    if (props.type == "NEW_TRAINEE") {
        return (<CharacterAuthorize fontSize="2em" color="yellow"/>);
    }
    if (props.type == "NEW_RESERVATION") {
        return (<InfoRound fontSize="2em" color="blue"/>);
    }
    if (props.type == "ACCEPTED_RESERVATION") {
        return (<CheckRound fontSize="2em" color="green"/>);
    }
    if (props.type == "REJECTED_RESERVATION") {
        return (<BlockRound fontSize="2em" color="red"/>);
    }
}

const Message = (props) => {
    return (
            <Panel shaded bordered>
                <MessageIcon {...{"type" : props.type}}/>
                <div>{props.content}</div>
                <Trash/>
            </Panel>
    )
}

export { Message }