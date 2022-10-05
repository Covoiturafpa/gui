import React from 'react';
import { Content, FlexboxGrid, Col } from 'rsuite';

const FormLayout = (props) => {
    return (<>
        <Content className='h-full backdrop-blur-xl'>
            <h2 className='text-center'>{props.title}</h2>
            <FlexboxGrid justify="center" align='middle' className='h-full'>
                <FlexboxGrid.Item as={Col} colspan={22} md={20} lg={14}>
                    {props.form}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    </>);
}

export { FormLayout };