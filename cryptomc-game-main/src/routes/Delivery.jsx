import React from 'react'
import {useState} from 'react'
import { useEffect } from 'react';
import BykeforRun from '../components/delivery/BykeforRun';
import SelectByke from '../components/delivery/SelectByke';
import StartBox from '../components/delivery/StartBox';
import Loading from '../components/loading/Loading';
import "../style/style_delivery.css";
import { useDispatch, useSelector } from 'react-redux';
import { BYKE_SELECT, SHOW_BYKE } from './../redux/constanst/index';


export default function Delivery() {
  const { showByke , bykeSelect } = useSelector(state => state.userState)
  const dispatch = useDispatch()
  const [choiceEmpty, setChoiceEmpty] = useState(true);

  const openInventoryBykes = () => {
    console.log("Si se activo la funcion")
    setChoiceEmpty(false);
    dispatch({ type: SHOW_BYKE, showByke: true });
  }

  const closeInventoryBykes = () => {
    if(bykeSelect === null){
    setChoiceEmpty(true);
    }
    dispatch({type: SHOW_BYKE, showByke: false});
  }

  const selectedBykeHandler = (bike) => {
    
    dispatch({type: BYKE_SELECT, bykeSelect: bike});
    setChoiceEmpty(false);
    dispatch({type: SHOW_BYKE, showByke: false});
  }

  useEffect(()=>{
    if(bykeSelect === null){
      setChoiceEmpty(true);
    }else{
      console.log("Esto es" , bykeSelect)
    }
    
  },[bykeSelect])

  const resetDelivery = () => {
    
    dispatch({type: BYKE_SELECT, bykeSelect: null});
    setChoiceEmpty(true);
  }

  
  return (
    <section className='content-side-delivery'>
      <Loading/>
      <StartBox choiceEmpty={choiceEmpty} openBykes={openInventoryBykes}/>
      <SelectByke selectByke={selectedBykeHandler} showByke={showByke}  close={closeInventoryBykes}/>
      <BykeforRun resetDelivery={resetDelivery} />
    </section>
  )
}
