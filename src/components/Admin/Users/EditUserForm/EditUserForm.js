import React, {useState,useEffect, useCallback} from 'react';
import {Avatar, Form, Icon, Input, Select,Button,Row, Col} from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import "./EditUserForm.scss";

export default function EditUserForm(props){

    /*-----------------------------*/
    /* Estados para guardar la información  */
    /*-----------------------------*/
    const {user} = props;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData , setUserData] = useState({

        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar
    });

    /*-----------------------------*/
    /* Editar o Guardar el avatar del usuario */
    /*-----------------------------*/
    useEffect(() =>{
        if(avatar){
            setUserData({...userData, avatar})
        }
    },[avatar]);

    /*-----------------------------*/
    /*  Esta funcion se va ejecutar cuando se va actualizar el usuario*/
    /*-----------------------------*/
    const updateUser = e => {
        e.preventDefault();
        console.log(userData);

    }
    // console.log(avatar);
    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

/*-----------------------------*/
/* Subir la imagen o el avatar del usuario */
/*-----------------------------*/
function UploadAvatar(props) {
    const { avatar, setAvatar } = props;

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)});

        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive} = useDropzone({

        accept:"image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>
            ):(
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;
    return (
        <Form className= "form-edit" onSubmit={updateUser}>
            <Row gutter={24}>
                <Col span={12}> 
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="user"/>}
                             placeholder= "Nombre" 
                             defaultValue={userData.name}
                             onChange={e=> setUserData({...userData, name: e.target.value })}/>

                    </Form.Item>
                </Col>
                <Col span={12}> 
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="user"/>}
                            placeholder= "Apellidos" 
                            defaultValue={userData.lastname}
                            onChange={e=> setUserData({...userData, lastname: e.target.value })}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="mail"/>}
                            placeholder= "Correo electronico" 
                            defaultValue={userData.email}
                            onChange={e=> setUserData({...userData, email: e.target.value })}/>
                    </Form.Item>
                </Col>
                <Col span={12}> 
                    <Form.Item>
                        <Select
                            placeholder ="Selecciona un rol" 
                            onChange={e => setUserData({...userData, role: e})} 
                            defaultValue={userData.role}>
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviewr">Revisor</Option>
                            
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}> 
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="lock"/>}
                            type="password"
                            placeholder="Contraseña"    
                            onChange={e => setUserData({...userData, password: e.target.value})}/>

                    </Form.Item>
                </Col>
                <Col span={12}> 
                     <Form.Item>
                        <Input 
                            prefix={<Icon type="lock"/>}
                            type="password"
                            placeholder=" Repetir contraseña"    
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}/>

                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                        Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}
