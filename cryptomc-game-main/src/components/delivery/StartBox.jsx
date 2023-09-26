import React from 'react'
import plus from "../../images/svg/pluschoice.svg"
import { motion, AnimatePresence } from 'framer-motion'

export default function StartBox(props) {

  return (
    <AnimatePresence>
      {props.choiceEmpty && (
    <motion.div className='select-box'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 80,  duration: 0., delay: 0.2 }}
      exit={{ scale: 0 }}
    >
    <h2>Start Delivery</h2>
    <div className='imgbox' onClick={()=>props.openBykes()}>
      <img src={plus} alt={plus}/>
    </div>
  </motion.div>
      )}
  </AnimatePresence>
  )

}
