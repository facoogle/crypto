import React from 'react';
import Notification from '../components/notification/Notification';
import "../style/style_inventory.css";
import Common from '../images/inventory/Common.png';
import Rare from '../images/inventory/Rare.png';
import Uncommon from '../images/inventory/Uncommon.png';
import Legendary from '../images/inventory/Legendary.png';
import logo from '../images/Navbar.png';
import { useSelector } from 'react-redux';


export default function Inventory() {
  const { userData } = useSelector(state => state.userState);
  const burgers = Object.values(userData).length > 0 ? userData.nftTemporales.filter(element => element.type === "burger") : []
  const notification = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, delectus placeat in repudiandae fugiat.";
  const common = 'rgb(106,106,106)'
  const uncommon = 'linear-gradient(90deg, rgba(38,32,208,1) 0%, rgba(5,3,74,1) 86%)';
  const rare = 'linear-gradient(90deg, rgba(167,32,208,1) 0%, rgba(46,3,74,1) 86%)';
  const legendary = 'linear-gradient(90deg, rgba(208,178,32,1) 0%, rgba(74,72,3,1) 86%)';

  return (
    <section className="content-side-inventory">
      
      <div className='inventory-selection row'>
        {burgers.map((item) => {
          console.log(item, burgers.length)
          return (
          <div className='inventory-item' key={item.id}
            style={{
              background: {
                1: common,
                2: uncommon,
                3: rare,
                4: legendary
              }[item.rarity]
            }}
          >
            <div className='inventory-item-image'>
              <img src={{
                1: Common,
                2: Uncommon,
                3: Rare,
                4: Legendary
              }[item.rarity]} alt={item.name} />
            </div>
            <div className='inventory-item-info'>
              <div className='inventory-item-header'>
                <div className='inventory-item-info-rarity'>
                  {item.rarity === 1 && 'Common'}
                  {item.rarity === 2 && 'Uncommon'}
                  {item.rarity === 3 && 'Rare'}
                  {item.rarity === 4 && 'Legendary'}
                </div>
                <div className='inventory-item-info-id'>
                  {item._id}
                </div>
              </div>
              <div className='inventory-item-info-name'>
                {item.name}
              </div>

              <div className='inventory-item-info-score'>
                <img src={logo} alt="logo" />
                {item.score}
              </div>
              {item.state === 'temporal' ?
                <>
                  <div className='progress-box'>
                    <div className='inventory-item-progressBar'>
                      <div className='inventory-item-progressBar-fill' style={{ width: `${item.progressBar / item.progressBarMax * 100}%` }}></div>
                    </div>
                  </div>
                  <div className='inventory-item-actualprogress'>
                    {item.progressBar}/{item.progressBarMax}
                  </div>
                </>
                :
                <div className='inventory-item-sellbtn'>
                  <button>Sell</button>
                </div>
              }
            </div> {/*item info */}
          </div>
        )})}
      </div>
    </section>
  )
}
