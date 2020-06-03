import React, {useState, useEffect} from 'react';
import { Form, Icon, Input, Button, notification } from "antd";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props) {
    const {setIsVisibleModal, setReloadMenuWeb, menu} = props;
    const [menuWebData, setMenuWebData] = useState({});

    useEffect(() =>{
        setMenuWebData(menu);
    },[menu])   

    /*-----------------------------*/
    /* Editar el menu */
    /*-----------------------------*/
    const editMenu = event => {
        event.preventDefault();
        
        if(!menuWebData.title || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        } else {
            const accesToken = getAccessTokenApi();
            updateMenuApi(accesToken,menuWebData._id, menuWebData)
            .then(response =>  {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false); // para ocultar el modal
                setReloadMenuWeb(true); // recargar el menú y salga los nuevos valores
            })
            .catch(() => {
                notification["error"]({
                    message: "Problema con el servidor, intentelo más tarde."
                });
            });
        }
    }
    return(
        <div className="edit-menu-web-form">
          <EditForm  menuWebData={menuWebData}
          setMenuWebData={setMenuWebData}
          editMenu={editMenu}
          />
        </div>
    );
}

    /*-----------------------------*/
    /*  Creando el formulario para editar*/
    /*-----------------------------*/
    function EditForm(props) {
         const { menuWebData, setMenuWebData, editMenu } = props;
        return (
            <Form className="form-edit" onSubmit={editMenu}>
                <Form.Item>
                    <Input 
                        prefix={<Icon type="font-size"/>}
                        placeholder="Titulo"
                        value={menuWebData.title}
                        onChange={e => setMenuWebData({...menuWebData, title: e.target.value})}
                        />
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={<Icon type="link"/>}
                        placeholder="URL"
                        value={menuWebData.url}
                        onChange={e => setMenuWebData({...menuWebData, url: e.target.value})}
                        />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Actualizar menú
                    </Button>
                </Form.Item>
            </Form>
        )
    }
