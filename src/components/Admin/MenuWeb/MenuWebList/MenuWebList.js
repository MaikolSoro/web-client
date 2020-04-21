import React, {useState, useEffect} from 'react';
import {Switch, List, Button, Icon, Modal as ModalAntd, notification} from 'antd';
import Modal from  '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi, activateMenuApi, deleteMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';
import "./MenuWebList.scss";

const {confirm} = ModalAntd;

/*-----------------------------*/
/* Listando menús con acción de drag and drop */
/*-----------------------------*/
export default  function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;

    /*-----------------------------*/
    /* Estado que va guardar la nueva version del menu */
    /*-----------------------------*/
    const [listItems, setListItems] = useState([]);

    /*-----------------------------*/
    /* Estados del menu*/
    /*-----------------------------*/
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


    useEffect(() => {
        const listItemArray = [];
        menu.forEach(item => {
            listItemArray.push({
                content: (
                    <MenuItem 
                    item={item} 
                    activateMenu={activateMenu} 
                    editMenuWebModal={editMenuWebModal}
                    deleteMenu={deleteMenu}
                    />)
            });
        });
        setListItems(listItemArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu]);

    /*-----------------------------*/
    /* Activar  y desactivar el menu */
    /*-----------------------------*/
    const activateMenu = (menu, status) => {
        const accesToken = getAccessTokenApi();

        activateMenuApi(accesToken, menu._id, status)
            .then(response => {
                notification["success"]({
                    message: response
                });
        });
    }
    /*-----------------------------*/
    /* Cambia el orden del menu */
    /*-----------------------------*/
    const onSort = (sortedList, dropEvent) => {
        const accesToken = getAccessTokenApi();
    
        sortedList.forEach(item => {
          const { _id } = item.content.props.item;
          const order = item.rank;
          updateMenuApi(accesToken, _id, { order });
        });
      };

    /**
     * Crear menú
     */
    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menú");
        setModalContent(
           <AddMenuWebForm  
            setIsVisibleModal={setIsVisibleModal} 
            setReloadMenuWeb={setReloadMenuWeb}
           />
        );
    };

    /*-----------------------------*/
    /* Editar menú */
    /*-----------------------------*/
    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menu: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm
              setIsVisibleModal={setIsVisibleModal}
              setReloadMenuWeb={setReloadMenuWeb}
              menu={menu}
            />
          );
        };
    /*-----------------------------*/
    /* Eliminar menú */
    /*-----------------------------*/
    const deleteMenu = menu => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando menu",
            content: `¿Estas seguro de que quieres eliminar el menu ${menu.title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            //Cuando hacen click
            onOk() {
              deleteMenuApi(accesToken, menu._id)
                .then(response => {
                  notification["success"]({
                    message: response
                  });
                  setReloadMenuWeb(true);
                })
                .catch(() => {
                  notification["error"]({
                    message: "Error del servidor, intentelo más tarde."
                  });
                });
            }
          });
        };
    
    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>Crear menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
            <Modal title={modalTitle} 
                    isVisible={isVisibleModal} 
                    setIsVisible={setIsVisibleModal}>

                {modalContent}
            </Modal>
        </div>
    );
}

function MenuItem(props) {
const {item, activateMenu, editMenuWebModal, deleteMenu} = props;

    return (
        <List.Item 
                actions={[

                    //Switch para activar el menu 
                    <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)}/>,
                        <Button type="primary" onClick={() => editMenuWebModal(item)}>
                            <Icon type="edit"/>
                        </Button>,
                            <Button type="danger"  onClick={() => deleteMenu(item)}>
                                <Icon type="delete"/>
                            </Button>
                ]}>
                    <List.Item.Meta title={item.title} description={item.url}/>
        </List.Item>
    );
}
