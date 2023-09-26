import React from 'react'
import '../style/style_tools.css'
import Notification from '../components/notification/Notification';
import motoA from "../images/tools/MotoA.png"
import motoB from "../images/tools/MotoB.png"
import motoC from "../images/tools/MotoC.png"
import gasolina from "../images/tools/Gasolina.png"
import pergamino from "../images/tools/Pergamino.png"
import "../style/style_inventory.css";

export default function Tools() {

  const notification = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus placeat in repudiandae fugiat.";
  return (
    <div>
      

      <div className='selection'>

        <div id='moto-1' className='tool-item'>
        <div className='inventory-number'>10</div>
          <div className='sub-item'>
          <h2>McScooter</h2>
          <h2>Basic</h2>
          <h4>1 burger max</h4>
          <img src={motoA} alt="motoA" />
          </div>
        </div>

        <div id='moto-2' className='tool-item'>
        <div className='inventory-number'>10</div>
        <div className='sub-item'>
        <h2>McScooter</h2>
          <h2>Advance</h2>
          <h4>1 burger max</h4>
          <img src={motoB} alt="motoB" />
        </div>
        </div>

        <div id='moto-3' className='tool-item'>
        <div className='inventory-number'>10</div>
        <div className='sub-item'>
        <h2>McScooter</h2>
          <h2>Pro</h2>
          <h4>1 burger max</h4>
          <img src={motoC} alt="motoC" />
        </div>
        </div>

        <div id='gas-tool' className='tool-item'>
        <div className='inventory-number'>10</div>
        <div className='sub-item'>
        <h2>Fuel</h2>
          <h4>Don't stay half way</h4>
          <img src={gasolina} alt="gasolina" />
        </div>
        </div>

        <div id='contract-tool' className='tool-item'>
        <div className='inventory-number'>10</div>
        <div className='sub-item'>
        <h2>Contract</h2>
          <h4>Deliver your orders</h4>
          <img src={pergamino} alt="pergamino" />
        </div>
        </div>

        </div>
   
      

    </div>



  )
}
