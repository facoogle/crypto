import React from 'react'
import img1 from "../images/home/moto.png"
import img2 from "../images/home/gasolina.png"
import img3 from "../images/home/hamburguesa.png"
import Notification from '../components/notification/Notification'
import "../style/style_home.css"
import { useNavigate } from 'react-router-dom'
export default function Home() {

  const notification = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus placeat in repudiandae fugiat."
  const navigate = useNavigate();

  const navTools=()=> {
    navigate('/tools')
  }

  const navDelivery=()=> {
    navigate('/delivery')
  }

  const navInventory=()=> {
    navigate('/inventory')
  }


  return (
    <section className='content-side-home'>
      
      <div className='selection'>
 
          <div onClick={navInventory} id='box1' className='box' >
            <img src={img3} alt="home-image" />
            <h2><strong>INVENTORY</strong></h2>
          </div>
 
 
          <div onClick={navTools} id='box2' className='box' >
            <img src={img2} alt="home-image" />
            <h2><strong>TOOLS</strong> </h2>
          </div>


          <div onClick={navDelivery} id='box3' className='box' >
            <img src={img1} alt="home-image" />
            <h2><strong>DELIVERY</strong></h2>
          </div>

      </div>
    </section>
  )
}
