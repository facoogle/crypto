import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../../style/style_alert.css'
import alert from '../../images/svg/alert.svg'

export default function Alerts(props) {


    const closeAlert = () => {
        props.setShowAlert(false)
    }

    useEffect(() => {
        if (props.showAlert) {
            setTimeout(() => {
                closeAlert()
            }, 3000)
        }
    }, [props.showAlert])

    return (
        <AnimatePresence>
            {props.showAlert && (
            <motion.div
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 100, opacity: 0 }}
            >
                <div className="alerts">
                    <div className='alert-icon'>
                        <img src={alert} alt='alert'/>
                    </div>
                    <div className="alerts-container">
                        <div className='alert-header'>
                            {props.alertKey.header}
                        </div>
                        <div className='alert-body'>
                            {props.alertKey.body}
                        </div>
                    </div>
                    <div onClick={closeAlert} className='alert-close'>
                        <h2 >X</h2>
                    </div>
                </div>

            </motion.div>
            )}
        </AnimatePresence>
    )
}
