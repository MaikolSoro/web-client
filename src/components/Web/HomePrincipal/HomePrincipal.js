import React from 'react';
import {Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

// importar las imagenes
import restaurante from "../../../assets/img/jpg/restaurant-pos.jpg";

import "./HomePrincipal.scss";

export default function HomePrincipal() {
    return (
     <Row className="home-principal">
        <Col lg={24} className="home-principal__title">
            <h2>App realizadas en el  2020 !!</h2>
        </Col>
         <Col lg={4} />
            <Col lg={16}>
                <Row className="row-apps">
                    <Col md={6}>
                    <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                    </Col>
                </Row>
                <Row className="row-apps">
                 <Col md={6}>
                    <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                </Col>
                <Col md={6} />
                <Col md={6} />
                <Col md={6}>
                <CardPrincipal 
                        image={restaurante} 
                        title="App en JavaScript"
                        subtitle="React-Node.js" link=""/>
                </Col>
                </Row>
            </Col>
            <Col lg={4} />
                <Col lg={24} className="home-principal__more">
                    <Link to="/home">
                        <Button>Ver más</Button>
                    </Link>
            </Col>
     </Row>
    );
}

// Cartas de las imagenes 
function CardPrincipal(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card className="home-principal__card"
            cover={<img src={image} alt={title} />}
            actions={[<Button>Ingresar</Button>]}
            >
            <Meta title={title} description={subtitle} />
            ...
            </Card>
        </a>
    )
}
