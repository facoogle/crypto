import React from "react";
import cajitaFeliz from "../../images/svg/Cajitafeliz.svg";
import home from "../../images/svg/Home.svg";
import Gasolina from "../../images/svg/Gasolina.svg";
import Hamburguesa from "../../images/svg/Hamburguesa.svg";
import Shop from "../../images/svg/Shop.svg";
import whitepaper from "../../images/svg/whitepaper.svg";
import { Nav } from "react-bootstrap";
import redbox from "../../images/redbox.png";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import moto from "../../images/home/moto.png";

class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>

        <Nav className="sidebar-nav">
          <div className="sidebar-second-header">
            <p>Welcome to the<br />most delicius Nft in the world</p>
          </div>


          <NavLink className="NavItem" to="/home">
            <img className="sidebar-icon" src={home} alt="home" />
            HOME
          </NavLink>


          <div className="sidebar-third-header" >
            <p><span style={{color:"#eba52c"}}>CryptoMC</span><br />PLAY & EARN</p>
            <img src={redbox} alt="redbox" className="redbox" />
          </div>

          <NavLink className="NavItem" to="/inventory">
            <img className="sidebar-icon" src={Hamburguesa} alt="hamburguesa" />
            INVENTORY
          </NavLink>



          <NavLink className="NavItem" to="/tools">
            <img className="sidebar-icon" src={Gasolina} alt="gasolina" />
            TOOLS
          </NavLink>

          <NavLink className="NavItem" to="/delivery">
            <img className="sidebar-icon" src={cajitaFeliz} alt="cajita" />
            DELIVERY
          </NavLink>

          <div className="sidebar-third-header">
            <p><span style={{color:"#eba52c"}}>CryptoMC</span><br />GET READY</p>
            <img src={moto} alt="moto" className="moto" />
          </div>

          <NavLink className="NavItem" to="/shop/shopburgers">
            <img className="sidebar-icon" src={Shop} alt="shop" />
            SHOP
          </NavLink>
          <div className="line"></div>
          <NavLink className="NavItem" to="/whitepaper">
            <img className="sidebar-icon" src={whitepaper} alt="whitepaper" />
            WHITEPAPER
          </NavLink>
        </Nav>
        <div className="sidebar-version">
          ver 0.0.1
        </div>
      </div>
    );
  }
}

export default SideBar;
