import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import logo from "../../images/Navbar.png";
import pancake from "../../images/icons/pancakeswap.png";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import axios from "axios";
import { USER_DATA, CLEAR_DATA } from "../../redux/constanst";

function NavBar(props) {
  const [login, setLogin] = useState(false);
  const { userData } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const connectMeta = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const address = await sendWallet();
    } catch {
      Swal.fire("No conectaste a metamask");
      console.log("error");
    }

    /* address && setWallet() /
    /  try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address)
    } catch (err) {
      console.log("message:", err);
    } */
  };

  const sendWallet = async (userData) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const signer = await provider.getSigner();

        const address = await signer.getAddress();

        if (!userData) {
          
          const usuario = await axios.post(
            "http://localhost:3001/api/user/login",
            {
              wallet: address,
            }
          );

          dispatch({ type: USER_DATA, userData: usuario.data.usuario });
        } 
        
        setLogin(!login)  
        return address;
      
    } catch (err) {
      setLogin(!login)
      dispatch({ type: CLEAR_DATA }); 
    }
  };

  /* const sendWallet2 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const signer = await provider.getSigner();
      
      const address = await signer.getAddress();
          
      if (!userData) {
        console.log("Entramos", userData)
        const usuario = await axios.post(
          "http://localhost:3001/api/user/login",
          {
            wallet: address,
          }
        );

        dispatch({ type: USER_DATA, userData: usuario.data.usuario }); 
      }
          sendWallet();
        return address;
    
    } catch (err) {
       dispatch({ type: CLEAR_DATA });  
        sendWallet();
    }
  }; */

  useEffect(() => {
      sendWallet(userData)
    
  },[login]);

  let value;

  const MountUnmount = (value) => {
    /* useEffect(() => {
      if (wallet) {
        dispatch(fetchUser(wallet));
        console.log(wallet, "XD");
      }
    }, [wallet]); */
    //console.log(user);

    let token = 0;
    return (
      <button className="navbar-claim" href="#">
        CLAIM {userData ? userData?.token.toFixed(2): 0} $CMC
      </button>
    );
  };

  const MountUnmount2 = (value) => {
    /* useEffect(() => {
      if (wallet) {
        dispatch(fetchUser(wallet));
        console.log(wallet, "XD");
      }
    }, [wallet]); */
    //console.log(user);

    let token = 0;
    return (
      <button className="navbar-claim" style={{background:"green"}} href="#">
        Game {userData ? userData?.token.toFixed(2): 0} $
      </button>
    );
  };

  return (
    <Navbar className="navbar shadow-sm mb-5" expand>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={props.toggle}
          style={{ color: "#fff" }}
          className="mt-4"
        ></Button>
        <img
          style={{ cursor: "pointer" }}
          src={logo}
          alt="logo"
          className="logo-sidebar"
        />
        <h3>CryptoMC</h3>
      </div>
      <Button variant="outline-info" onClick={props.toggle}>
        {props.isOpen ? (
          <FontAwesomeIcon icon={faChevronLeft} />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} />
        )}
      </Button>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto navbar-buttons" navbar>
          <a className="navbar-pancake" href="#" target="_blank">
            <img src={pancake} alt="" />
            BUY $CMC
          </a>
          <MountUnmount />
          <MountUnmount2  />
          <img
            style={{ cursor: "pointer" }}
            src={logo}
            onClick={() => connectMeta()}
            alt="logo"
            className="navbar-logo"
          />
          <div className="navbar-account">
            0 &nbsp; $CMC <br />
            {userData.wallet && (
              <span className="navbar-bot-account">{`${userData.wallet.substring(
                0,
                4
              )}..${userData.wallet.substring(
                userData.wallet.length - 4,
                userData.wallet.length
              )}`}</span>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
