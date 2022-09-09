import React from 'react';
import { Content, FlexboxGrid } from 'rsuite';

const LoginLayout = (props) => {
    return (<>
        <Content>
            <FlexboxGrid justify="center" align='middle' className='h-full'>
                <FlexboxGrid.Item colspan={12} form={props}>
                    {props.form}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    </>);
}

export { LoginLayout };