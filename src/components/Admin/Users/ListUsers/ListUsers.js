import React, { useState } from 'react';
import { Switch,List,Avatar,Button,Icon } from 'antd';
import NoAvatar from '../../../../assets/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props) {
    const {usersActive, usersInactive} = props;
    const [viewUserActives, setViewUsersActives] = useState(true);
    // console.log(usersActive);
    // console.log(usersInactive);


    return (
        <div className="list-users">
           <div className="list-users__switch">
           <Switch  defaultChecked
                    onChange={() => setViewUsersActives(!viewUserActives)}
                    
            />
            <span>
                {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
            </span>
           </div>
           {viewUserActives ? <UsersActive /> : <UsersInactive />}
        </div>
    );
}

function UsersActive(){
    return <h3>Lista de usuarios activos</h3>
}

function UsersInactive(){
    return <h3>Lista usuarios Inactivos</h3>
}
