import React from 'react';
import {Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

// importar las imagenes


import "./HomePrincipal.scss";

export default function HomePrincipal() {
    return (
     <Row className="home-principal">
        <Col lg={24} className="home-principal__title">
            <h2>App realizadas en el  2020 !!</h2>
        </Col>
        <Col lg={4} />
        <Col lg={16}>
            
        </Col>
        <Col lg={4} />
     </Row>
    )
}
