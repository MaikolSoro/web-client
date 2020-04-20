import React, {useState, useEffect} from 'react';
import { Form, Icon, Input, Button, notification } from "antd";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props) {
    const {setIsVisibleModal, setReloadMenuWeb, menu} = props;

    return(
        <div className="edit-menu-web-form">
          <EditForm />
        </div>
    );
}

    /*-----------------------------*/
    /*  Creando el formulario para editar*/
    /*-----------------------------*/
    function EditForm(props) {
        // const { menuWebData, setMenuWebData, editMenu, menu } = props;
        return (
            <Form className="form-edit">
                <Form.Item>
                    <Input 
                        prefix={<Icon type="font-size"/>}
                        placeholder="Titulo"
                        // value={}
                        // onChange={}
                        />
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={<Icon type="link"/>}
                        placeholder="URL"
                        // value={}
                        // onChange={}
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
