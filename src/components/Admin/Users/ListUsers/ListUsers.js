import React, { useState } from 'react';
import { Switch,List,Avatar,Button,Icon } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
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
           {viewUserActives ? <UsersActive usersActive={usersActive} /> : <UsersInactive usersInactive={usersInactive} />}
           
           <Modal 
           title="Mi modal!" 
           isVisible={true} 
           setIsVisible={() => console.log('asas')}>

            Hola es mi primer modal
           </Modal>
        </div>
    );
}

function UsersActive(props) {
    const { usersActive} = props;   
    return (
        <List className="users-active" itemLayout="horizontal" dataSource={usersActive} renderItem={user =>(

            <List.Item actions={[
                <Button type="primary" onClick={() => console.log("Editar usuario")}>
                        <Icon type="edit" />
                </Button>,
                    <Button type="danger" onClick={()=> console.log("Desactivar Usuario")}>
                        <Icon type="stop"/>
                    </Button>,
                        <Button type="danger" onClick={() => console.log("Eliminar usuario")}>
                            <Icon type="delete"/>
                        </Button>
            ]}>
                <List.Item.Meta avatar={<Avatar src={user.avatar ? user.avatar :  NoAvatar}/>} 
                title={`${user.name ? user.name :'...'}
                        ${user.lastname ? user.lastname : '...'}`}
                description={user.email}
                />
               
            </List.Item>
        )}/>
        
        
    );
}

function UsersInactive(props){
    const {usersInactive} = props;

    return (
        <List className="users-active" itemLayout="horizontal" dataSource={usersInactive} renderItem={user =>(

            <List.Item actions={[
                <Button type="primary" onClick={() => console.log("Activar usuario")}>
                        <Icon type="check" />
                </Button>,
                     <Button type="danger" onClick={() => console.log("Eliminar usuario")}>
                         <Icon type="delete"/>
                    </Button>
            ]}>
                <List.Item.Meta avatar={<Avatar src={user.avatar ? user.avatar :  NoAvatar}/>} 
                title={`${user.name ? user.name :'...'}
                        ${user.lastname ? user.lastname : '...'}`}
                description={user.email}
                />
               
            </List.Item>
        )}/>
        
        
    );
}

