import React from "react";
import { Button, Icon } from "antd";
import logo from "../../../assets/img/png/logoPersonal.png";
import "./MenuTop.scss";
import {logout} from "../../../api/auth";

function MenuTop(props) {
  const {menuCollapsed, setMenuCollapsed} = props;

  /*-----------------------------*/
  /* La funcion del btn, Salimos del panel administrador , nos devuelve al login  */
  /*-----------------------------*/
  const logoutUser = () => {
    logout();
    // console.log('desconectado');
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menuTop__left">
        <img className="menu-top__left-logo" src={logo} alt="Logo" />

        <Button type="link" onClick={() =>setMenuCollapsed(!menuCollapsed)}>
          <Icon  type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      </div>

      <div className="menu-top__right">
      <Button type="link" onClick={logoutUser}>
      <Icon  type="poweroff" />
    </Button>
      </div>
    </div>
  );
}
export default MenuTop;
