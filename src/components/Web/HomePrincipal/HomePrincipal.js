import React from 'react';
import {Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

// importar las imagenes
import ventas from "../../../assets/img/jpg/Pos.png";
import php from "../../../assets/img/jpg/PHP.png";
import ionic from "../../../assets/img/jpg/ionic.png";
import qrscanner from "../../../assets/img/jpg/qrScanner.png";
import peliculas from "../../../assets/img/jpg/peliculas.png";
import restaurant from "../../../assets/img/jpg/restaurant.jpg";

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
                        image={ventas} 
                        title="Sistema ventas con c#"
                        subtitle="Hecho con lenguaje c#" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={php}
                        title="Sistema de ventas"
                        subtitle="Hecho con lenguaje php" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={ionic} 
                        title="App de noticias"
                        subtitle="ionic con angular" link=""/>
                    </Col>
                    <Col md={6}>
                    <CardPrincipal 
                        image={qrscanner} 
                        title="App de qrscanner"
                        subtitle="ionic con angular" link=""/>
                    </Col>
                </Row>
                <Row className="row-apps">
                 <Col md={6}>
                    <CardPrincipal 
                        image={peliculas}
                        title="App en ionic"
                        subtitle="ionic con angular" link=""/>
                </Col>
                <Col md={6} />
                <Col md={6} />
                <Col md={6}>
                <CardPrincipal 
                        image={restaurant}
                        title="Sistema para restaurante o bares"
                        subtitle="Hecho con lenguaje c#" link=""/>
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
            
            </Card>
        </a>
    )
}
