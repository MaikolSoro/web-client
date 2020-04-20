import React, {useState, useEffect} from 'react';
import {Switch, List, Button, Icon, Modal as ModalAntd, notification} from 'antd';
import Modal from  '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';

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
                content: (<MenuItem item={item}/>)
            })
        });
        setListItems(listItemArray);
    }, [menu])

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

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary">Menu menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} OnSort={OnSort} type="vertical"/>
            </div>
        </div>
    );
}

function MenuItem(props) {
const {item} = props;

return (
    <List.Item 
            actions={[

                 //Switch para activar el menu 
                <Switch defaultChecked={item.active}/>,
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
