import { React} from 'react';
import { List, FlexboxGrid } from 'rsuite';


const ListRow = (props) => {
    return(
        <List.Item>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={12}>
                    <label>{props.label}</label>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={12}>
                    {props.children}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    );
}

export { ListRow };