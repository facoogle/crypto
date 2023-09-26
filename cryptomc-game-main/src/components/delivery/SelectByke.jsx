
import React, { useEffect } from 'react'
import MotoA from '../../images/tools/MotoA.png'
import MotoB from '../../images/tools/MotoB.png'
import MotoC from '../../images/tools/MotoC.png'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInventoryData } from '../../redux/inventory/inventoryActions'
import Timer from './Timer'


export default function SelectByke(props) {
    const dispatch = useDispatch();
    console.log(props.showBykes)
    const bykes = useSelector(state => state.inventory.bykes)

    useEffect(()=>{
        dispatch(fetchInventoryData())
    }, [dispatch])
  return (
  
    <AnimatePresence>
        {props.showBykes &&(
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
            <div className='invetory-item' key={index}>
                <div className='item-header'>
                    <div className='stars'>
                        <p>level: {bike.level}</p>
                    </div>
                    <div className='progress-box'>
                <div className='inventory-item-progressBar'>
                  <div className='inventory-item-progressBar-fill' style={{width: `${bike.progressBar/bike.progressBarMax*100}%`}}></div>
                </div>
                </div>
                
                <div className='id'><p>ID:{bike.id}</p></div>
                </div>
                <div className='item-body'>
                    <div className='item-img'>
                        <img src={{
                            1: MotoA,
                            2: MotoB,
                            3: MotoC
                        }[bike.level]} alt=''/>
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
