import { React} from 'react';
import { List, FlexboxGrid, Col } from 'rsuite';


const ListRow = (props) => {
    return(
        <List.Item>
            <FlexboxGrid className='mx-2' justify='space-between' align='middle'>
                <FlexboxGrid.Item as={Col} colspan={24} md={6} classPrefix="" 
                    className="flex items-center content-center justify-start h-5 md:h-6 lg:h-8">
                    <label className='block mb-2 md:mb-0'>
                        {props.label}
                    </label>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={16} className='text-left'>
                    {props.children}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    );
}

export { ListRow };