import { React } from 'react';
import { List, Button, Checkbox, Uploader, FlexboxGrid, Col } from 'rsuite';

const AvatarProfil = (props) => {
    return (
        
            <FlexboxGrid className='mx-2 '>
                <FlexboxGrid.Item as={Col} colspan={14} md={8} >
                    <button className='rounded-md overflow-hidden'>
                        <img src='https://avatars.githubusercontent.com/u/12592949'
                            alt={props.user.surname + " " + props.user.firstName}
                            className='object-cover object-center'/>
                    </button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={16} className='text-left'>
                    <div className='bg-green-100 w-100'>
                        <Uploader className='' />
                        <Checkbox className=''> Effacer la photo</Checkbox>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        
    );
}

export { AvatarProfil };