import { Message } from "rsuite";

const ErrorMessage = (message) => {
    return (
        <Message showIcon type="error" header="Error">
            {message}
        </Message>
    )
}

export default { ErrorMessage };