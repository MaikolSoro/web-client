import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout,Row,Col } from "antd";
import MenuTop from  "../components/Web/MenuTop";
import "./LayoutBasic.scss";


function LayoutBasic(props) {
  const { routes } = props;
  const { Footer } = Layout;

  return (
    <Row>
      <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
          <LoadRouters routes={routes} />
          <Footer>Michael Soro</Footer>
        </Col>
        <Col lg={4} />
    </Row>
  );
  
}
function LoadRouters({ routes }) {
  return(
    
    <Switch>
      {routes.map((route, index) => (
         <Route
           key={index}
           path={route.path}
           exact={route.exact}
           component={route.component}
         />
       ))}
       </Switch>
      ); 
}

export default LayoutBasic;
