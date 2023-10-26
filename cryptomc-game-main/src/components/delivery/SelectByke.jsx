
import React, { useEffect } from 'react'
import Basic from '../../images/tools/MotoA.png'
import Advance from '../../images/tools/MotoB.png'
import Pro from '../../images/tools/MotoC.png'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import Timer from './Timer'


export default function SelectByke(props) {
    
    const dispatch = useDispatch()

    console.log(props.showBykes)

    

   
    const { userData, showByke } = useSelector(state => state.userState)


    const  bykes = userData?.nftTemporales ? userData?.nftTemporales.filter(element => element.type === "byke") : []
    
    console.log("Desde select", showByke)
  return (
  
    <AnimatePresence>
        {showByke &&(
    <motion.div 
    className='invetoryOpen'
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    
    transition={{ type: 'spring', stiffness: 80,  duration: 0.2  }}
    >
        <div className='closeButton' onClick={()=>props.close()}>X</div>
        <h2>Bike Inventory</h2>
        <div className='inventory-select'>
         {bykes.map((bike, index)=>(
            <div className='invetory-item' key={index} style={{height:"300px"}}>
                <div className='item-header'>
                    <div className='stars'>
                        <p>level: {bike.rarity}</p>
                    </div>
                    <div className='progress-box'>
                <div className='inventory-item-progressBar'>
                  <div className='inventory-item-progressBar-fill' style={{width: `${bike.progressBar/bike.progressBarMax*100}%`}}></div>
                </div>
                </div>
                
                <div className='id'><p>ID:{bike._id.substring(0,10)}</p></div>
                </div>
                <div className='item-body'>
                    <div className='item-img'>
                        <img src={{
                            1: Basic,
                            2: Advance,
                            3: Pro
                        }[bike.rarity]} alt=''/>
                    </div>
                </div>
                <div className='item-footer'>
                    <Timer
                    selectByke={props.selectByke}
                    eventTime={bike.eventTime}
                    interval={1000}
                    byke={bike}
                    />
                </div>
            </div>
        ))} 
        </div>
    </motion.div>
        )}
    </AnimatePresence>
    
    
  )
}
