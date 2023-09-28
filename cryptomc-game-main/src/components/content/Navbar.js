import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import logo from "../../images/Navbar.png";
import pancake from "../../images/icons/pancakeswap.png"
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/user/userActions";
import { fetchInventoryData } from "../../redux/inventory/inventoryActions";

import { ethers } from "ethers";
 function NavBar (props) {
  const [wallet, setWallet] = useState('0x000')
  
   const connectMeta = async () =>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const address = await sendWallet()
    setWallet()
   /*  try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address)
    } catch (err) {
      console.log("message:", err);
    } */
  };

  const sendWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return address
    } catch (err) {
      
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      sendWallet().then((data) => {
        if(!wallet){

          console.log(data)
          setWallet(data)
        }
      })
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

    
    let value ; 

    const MountUnmount = (value) => {
      const dispatch = useDispatch();
      const user = useSelector(state => state.user);
      const inventory = useSelector(state => state.inventory);
      
      useEffect(()=>{
        dispatch(fetchUser())
        dispatch(fetchInventoryData())
      },[value])
       //console.log(user);
       //console.log("inventory",inventory);
      let token = user.token;
      value = user.token;
      return (
        <button className="navbar-claim" href="#">CLAIM {(token).toFixed(2)} $CMC</button>
      )
    }

    return (
      <Navbar
        className="navbar shadow-sm mb-5"
        expand
      >
        
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
          </Button>
          <img src={logo} alt="logo" className="logo-sidebar" />
          <h3>CryptoMC</h3>
        </div>
        <Button variant="outline-info" onClick={props.toggle}>
        
        {props.isOpen?<FontAwesomeIcon icon={faChevronLeft} />: <FontAwesomeIcon icon={faChevronRight} />}
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto navbar-buttons" navbar>
            <a className="navbar-pancake" href="#" target="_blank"><img src={pancake} alt=""/>BUY $CMC</a>
            <MountUnmount/>
            <img src={logo} onClick={() => connectMeta()} alt="logo" className="navbar-logo"/>
            <div className="navbar-account">
              0 &nbsp;  $CMC <br/>
              {wallet && <span className="navbar-bot-account">{`${wallet.substring(0,4)}..${wallet.substring(wallet.length-4, wallet.length)}`}</span> }
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }




export default NavBar;
