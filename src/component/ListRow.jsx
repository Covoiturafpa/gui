import { React} from 'react';
import { List, FlexboxGrid, Col } from 'rsuite';


const ListRow = (props) => {
    return(
        <List.Item>
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} colspan={24} md={12}>
                    <label>{props.label}</label>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={12}>
                    {props.children}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    );
}

export { ListRow };