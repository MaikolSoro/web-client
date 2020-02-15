import React from "react";
import { Button, Icon } from "antd";
import logo from "../../../assets/img/png/logoWeb2.png";
import "./MenuTop.scss";


function MenuTop(props) {
  const {menuCollapsed, setMenuCollapsed} = props;
  return (
    <div className="menu-top">
      <div className="menuTop__left">
        <img className="menu-top__left-logo" src={logo} alt="Logo" />

        <Button type="link" onClick={()=>setMenuCollapsed(!menuCollapsed)}>
          <Icon  type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      </div>

      <div className="menu-top__right">
      <Button type="link" >
      <Icon  type="poweroff" />
    </Button>
      </div>
    </div>
  );
}
export default MenuTop;
