import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutBasic.scss";
function LayoutBasic(props) {
  const { routes } = props;
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Menu Sider</h2>
      <Layout>
        <Content>
        <LoadRouters routes={routes} />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
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
