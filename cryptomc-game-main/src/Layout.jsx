import React from "react";
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";

import NavBar from "./components/content/Navbar";
class Layout extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }


  componentWillMount() {
     this.updateWidth();
     window.addEventListener("resize", this.updateWidth.bind(this));
   }

 
   componentWillUnmount() {
     window.removeEventListener("resize", this.updateWidth.bind(this));
   }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <div className="App wrapper row">
        <NavBar toggle={this.toggle} isOpen={this.state.isOpen}/>
          <div id="sidebar" className={this.state.isOpen?"col-xl-2 col-md-3  col-sm-4":"col-0"}>
          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          </div>
          <div id="content" className="col">
          <Content toggle={this.toggle} isOpen={this.state.isOpen} />
          </div>
        </div>

      </div>
    );
  }
}

export default Layout;
