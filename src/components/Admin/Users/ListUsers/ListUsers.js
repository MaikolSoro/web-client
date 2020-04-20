import React, { useState, useEffect } from 'react';
import { Switch,List,Avatar,Button,Icon,notification, Modal as ModalAntd } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';

import {getAvatarApi, activateUserApi, deleteUserApi } from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';

import './ListUsers.scss';

const { confirm } =  ModalAntd;
export default function ListUsers(props) {
    const {usersActive, usersInactive, setReloadUsers} = props;
    const [viewUserActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal]    =  useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
    // console.log(usersActive);
    // console.log(usersInactive);
    const  addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(
                <AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>
        );   
    };

    return (
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch  defaultChecked
                            onChange={() => setViewUsersActives(!viewUserActives)}
                            
                    />
                        <span>
                            {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                        </span>
                </div>
                <Button type="primary" onClick={addUserModal}>Nuevo usuario</Button>
        
            </div>
            

           {viewUserActives ? (
                <UsersActive usersActive={usersActive}
                            setIsVisibleModal={setIsVisibleModal} 
                            setModalTitle={setModalTitle} 
                            setModalContent={setModalContent}
                            setReloadUsers={setReloadUsers}/> ) : ( <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />)}
           
           <Modal 
           title={modalTitle} 
           isVisible={isVisibleModal} 
           setIsVisible={setIsVisibleModal}>

          {modalContent}
           </Modal>
        </div>
    );
}

function UsersActive(props) {
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers} = props; 

    const editUser = user =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>);
        console.log(user);
    };
    return (
        <List
         className="users-active" 
         itemLayout="horizontal" 
         dataSource={usersActive} 
         renderItem={user =><UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}/>
        
        
    );
}

/*-----------------------------*/
/* Activar usuario */
/*-----------------------------*/
function UserActive(props) {
    const { user, editUser, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }
    }, [user]);

    /*-----------------------------*/
    /* Desactivar usuario */
    /*-----------------------------*/
    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false)
        .then(response => {
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err =>{
            notification["error"]({
                message:err
            });
        });
    };

    /*-----------------------------*/
    /* Mostrar el modal si desea eliminar usuario activo */
    /*-----------------------------*/
    const showDeleteConfirm = () => {
        const  accessToken = getAccessTokenApi();
        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email} ?`,
            okText : "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                })
            }
        });
    };
    return (
        <List.Item actions={[

            <Button type="primary" onClick={() => editUser(user)}>
                    <Icon type="edit" />
            </Button>,
                <Button type="danger" onClick={desactivateUser}>
                    <Icon type="stop"/>
                </Button>,
                    <Button type="danger" onClick={showDeleteConfirm}>
                        <Icon type="delete"/>
                    </Button>
        ]}>
            <List.Item.Meta avatar={<Avatar src={avatar ? avatar :  NoAvatar}/>} 
            title={`${user.name ? user.name :'...'}
                    ${user.lastname ? user.lastname : '...'}`}
            description={user.email}
            />
           
        </List.Item>
    )
}

/*-----------------------------*/
/* Inactivo usuario */
/*-----------------------------*/
function UsersInactive(props){
    const {usersInactive, setReloadUsers} = props;

    return (
        <List
         className="users-active" 
         itemLayout="horizontal"
          dataSource={usersInactive} 
          renderItem={user =><UserInactive user={user} setReloadUsers={setReloadUsers}/>}/>
    );
}

function UserInactive(props) {
  const { user, setReloadUsers} = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
      if(user.avatar) {
          getAvatarApi(user.avatar).then(response => {
              setAvatar(response);
          });
      }else {
          setAvatar(null);
      }
  }, [user]);

  /*-----------------------------*/
  /* Activar el usuario */
  /*-----------------------------*/
  const activateUser = () => {
      const accessToken = getAccessTokenApi();
    
      activateUserApi(accessToken, user._id, true)
        .then(response => {
        notification["success"]({
            message: response
        });
            setReloadUsers(true);
        })
        .catch(err => {
            notification["error"]({
                message: err
            });
        });
  };
   /*-----------------------------*/
    /* Mostrar el modal si desea eliminar usuario inactivo */
    /*-----------------------------*/
    const showDeleteConfirm = () => {
        const  accessToken = getAccessTokenApi();
        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email} ?`,
            okText : "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                })
            }
        });
    };
  return (
    <List.Item actions={[
        <Button type="primary" onClick={activateUser}>
                <Icon type="check" />
        </Button>,
             <Button type="danger" onClick={showDeleteConfirm}>
                 <Icon type="delete"/>
            </Button>
    ]}>
        <List.Item.Meta avatar={<Avatar src={avatar ? avatar :  NoAvatar}/>} 
        title={`${user.name ? user.name :'...'}
                ${user.lastname ? user.lastname : '...'}`}
        description={user.email}
        />
       
    </List.Item>
  );
}

