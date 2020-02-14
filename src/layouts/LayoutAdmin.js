import React from "react";
import { Route,Switch } from "react-router-dom";

import { Layout } from "antd";
import "./LayoutAdmin.scss";

function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Menu Sider</h2>
      <Layout>
        <Header>Header</Header>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Michael Soro </Footer>
      </Layout>
    </Layout>
  );
}

{/* Cargar las rutas */}
function LoadRoutes({ routes }) {
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

export default LayoutAdmin;
