import { Notification } from 'rsuite';

const ToastMessage = (props) => {

    return (<Notification className="z-[100000]" type={props.type} header={props.header} duration={600} closable>
                {props.content}
            </Notification>);
}

export { ToastMessage };