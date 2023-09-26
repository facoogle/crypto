import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react';
import BykeforRun from '../components/delivery/BykeforRun';
import SelectByke from '../components/delivery/SelectByke';
import StartBox from '../components/delivery/StartBox';
import Loading from '../components/loading/Loading';
import "../style/style_delivery.css";


export default function Delivery() {
  const [choiceEmpty, setChoiceEmpty] = useState(true);
  const [showBykes, setShowBykes] = useState(false);
  const [selectedByke, setSelectedByke] = useState(null);

  const openInventoryBykes = () => {
    setChoiceEmpty(false);
    setShowBykes(true);
  }

  const closeInventoryBykes = () => {
    if(selectedByke === null){
    setChoiceEmpty(true);
    }
    setShowBykes(false);
  }

  const selectedBykeHandler = (bike) => {
    setSelectedByke(bike);
    setChoiceEmpty(false);
    setShowBykes(false);
  }

  useEffect(()=>{
    if(selectedByke === null){
      setChoiceEmpty(true);
    }else{
      console.log(selectedByke)
    }
    
  },[selectedByke])

  const resetDelivery = () => {
    setSelectedByke(null);
    setChoiceEmpty(true);
  }

  
  return (
    <section className='content-side-delivery'>
      <Loading/>
      <StartBox choiceEmpty={choiceEmpty} openBykes={openInventoryBykes}/>
      <SelectByke selectByke={selectedBykeHandler} showBykes={showBykes}  close={closeInventoryBykes}/>
      <BykeforRun byke={selectedByke} resetDelivery={resetDelivery} showBykes={setShowBykes}/>
    </section>
  )
}
