import React, { useState , useEffect } from 'react';
import { Button, notification } from "antd";
import { withRouter} from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import { getPostsApi } from "../../../api/post";
import "./Blog.scss";


 function Blog(props) {

    /*-----------------------------*/
    /* Estados de blog */
    /*-----------------------------*/
    const {location, history } = props;
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent , setModalContent] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

    /*-----------------------------*/
    /* Cuando page se actualice el useEffect,
     se vuele a ejecutar y recupere los nuevos valores */
    /*-----------------------------*/
    useEffect(() => {
        getPostsApi(12, page).then(response => {
            //si response.code existe, me la compara sino no entre
            if(response?.code !==200) {
                notification["warning"] ({
                    message: response.message
                });
            } else {
                setPosts(response.posts);
            }
        }).catch(() => {
            notification["error"]({
                message: "Error del servidor."
            });
        });
        setReloadPosts(false);
    }, [page, reloadPosts]);

    return (
        <div className="blog">
           <div className="blog__add-post">
            <Button type="primary">
                 Nuevo post
            </Button>
           </div>

            <h1>Post list...</h1>
            <h2>Paginación</h2>
           <Modal title={modalTitle}
                  isVisible={isVisibleModal}
                  setVisible={setIsVisibleModal}
                  with="75%"
            />
        </div>
    );
}

export default withRouter(Blog);
