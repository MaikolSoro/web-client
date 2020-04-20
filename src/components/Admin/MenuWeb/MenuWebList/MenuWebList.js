import React, {useState, useEffect} from 'react';
import {Switch, List, Button, Icon, Modal as ModalAntd, notification} from 'antd';
import Modal from  '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi, activateMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm';
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
    const [modalTitle, setModalTtile] = useState(""); 
    const [modalContent, setModalContent] = useState(null);


    useEffect(() => {
        const listItemArray = [];
        menu.forEach(item => {
            listItemArray.push({
                content: (<MenuItem item={item} activateMenu={activateMenu}/>)
            });
        });
        setListItems(listItemArray);
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
    const OnSort  = (sortedList, dropEvent) => {
        const accesToken = getAccessTokenApi();

        sortedList.forEach(item =>{
            const{_id } = item.content.props.Item;
            const order = item.rank;
            
            updateMenuApi(accesToken, _id, {order});
        })
    };

    /**
     * Crear menú
     */
    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTtile("Creando  nuevo menú");
        setModalContent(
           <AddMenuWebForm  
            setIsVisibleModal={setIsVisibleModal} 
            setReloadMenuWeb={setReloadMenuWeb}
           />
        );
    };
    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>Crear menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} OnSort={OnSort} type="vertical"/>
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
const {item, activateMenu} = props;

return (
    <List.Item 
            actions={[

                 //Switch para activar el menu 
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)}/>,
                    <Button type="primary">
                        <Icon type="edit"/>
                    </Button>,
                         <Button type="danger">
                             <Icon type="delete"/>
                        </Button>
            ]}>
                <List.Item.Meta title={item.title} description={item.url}/>
    </List.Item>
)
}
