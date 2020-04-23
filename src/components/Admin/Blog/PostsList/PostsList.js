import React from 'react';
import { List, Button, Icon, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import "./PostsList.scss";

const {confirm } = Modal;

export default function PostsList(props) {
    const { posts } = props;


    return (
        <div className="posts-list">
         <List  
         dataSource={posts.docs}
         renderItem={post => <Post post={post}/>}
         />
        </div>
    );
}
/*-----------------------------*/
/* Componente nuevo para pasarle toda la información y devuelve todo el componente
 */
/*-----------------------------*/
function Post(props) {
const {post} = props;  

    return (
        <List.Item>
            actions={[
                <Link to={`/blog/${post.url}`} target="_blank">
                    <Button type="primary"  >
                         <Icon type ="eye" />
                    </Button>
                </Link>,
                <Button  type="primary">
                    <Icon type="edit"/>
                </Button>,  
                <Button  type="danger">
                    <Icon type="delete"/>
                </Button>   
            ]}>
                <List.Item.Meta title={post.title}/>
        </List.Item>
    );
}
