import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import '../../style/style_finalScreen.css';

export default function FinalScreen(props) {
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [rateImg, setRateImg] = useState('');
    const [TokenGainned, setTokenGainned] = useState('');
    const [numberResult, setNumberResult] = useState('');

    useEffect(() => {
        if(props.success){
            setSuccessMsg(props.success);
            setRateImg(props.rateImg);
            setTokenGainned(props.tokenGainned);
            setNumberResult(props.numberResult);
        }
        return () => {
            setSuccessMsg('');
            setRateImg('');
            setTokenGainned('');
            setNumberResult('');
        }
    }, [props.success , props.rateImg, props.tokenGainned, props.numberResult, props.showFinalScreen])

    const close = () => {
        props.close();
        props.setShowFinalScreen(false);
    }

    return (
        <AnimatePresence>
            {props.showFinalScreen && (
                <motion.div
                    className="final-background"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    
                    <div className="final-container">
                    <button onClick={close} className='close-Button'>X</button>
                        <div className="loading-text">
                            <h3>{SuccessMsg}</h3>
                            <img src={rateImg} alt="rate" />
                            <h3>number ={numberResult}/{props.finalRate}</h3>
                            <h3>you earned: {parseInt(TokenGainned).toFixed(2)} $CMC</h3>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
