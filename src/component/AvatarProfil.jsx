import React from 'react';
import { List, Button, Checkbox, Uploader, FlexboxGrid, Col } from 'rsuite';
import { AvatarUploader } from './AvatarUploader';


/**
 * TODO: Pas encore implementé
 * Objectif: Permettre l'upload d'un avatar et l'affichage de celui ci si déjà présent/ou à defaut un placeholder 
 */
const AvatarProfil = (user) => {
    return (
        <div className='flex justify-center items-center'>
            {/* <button className=' h-50 w-50 rounded-md overflow-hidden'>
                <img src='https://avatars.githubusercontent.com/u/12592949'
                    alt={user.surname + " " + user.firstName}
                    className='object-cover object-center' />
            </button> */}
            <div className='flex-col mx-auto'>
                <div >
                    <AvatarUploader avatar={user.photo_path}></AvatarUploader>
                </div>
                <div >
                    <Checkbox name='isAvatarDeleted'>Effacer la photo</Checkbox>
                </div>
            </div>
        </div>
    );
}

export { AvatarProfil };