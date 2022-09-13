import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserBadgeIcon from '@rsuite/icons/UserBadge';

const AvatarIcon = () => {
    let navigate = useNavigate();
    return (
        <UserBadgeIcon onClick={ () => { navigate("/profil"); } } />
    );
}

export { AvatarIcon };