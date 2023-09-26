import React, { useState, useEffect } from 'react';
import MotoA from '../../images/tools/MotoA.png';
import MotoB from '../../images/tools/MotoB.png';
import MotoC from '../../images/tools/MotoC.png';
import plus from "../../images/svg/pluschoice.svg";
import { motion, AnimatePresence } from 'framer-motion';
import SelectBurger from './SelectBurger';
import common from "../../images/delivery/burgers/common.png";
import uncommon from "../../images/delivery/burgers/uncommon.png";
import rare from "../../images/delivery/burgers/rare.png";
import legendary from "../../images/delivery/burgers/legendary.png";
import gas from "../../images/tools/Gasolina.png";
import contract from "../../images/tools/Pergamino.png";
import burger from "../../images/home/hamburguesa.png";
import check from "../../images/delivery/checks/check.png";
import unchecked from "../../images/delivery/checks/unchecked.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStartDelivery } from '../../redux/inventory/inventoryActions';
import FinalScreen from './FinalScreen';
import { fetchDeliverySuccess } from '../../redux/user/userActions';
import Alerts from '../alerts/Alerts';



export default function BykeforRun(props) {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [backgroundByke, setBackgroundByke] = useState(null);
    const [burgerBag, setBurgerBag] = useState([]);
    const [currentSpace, setCurrentSpace] = useState([]);
    const [spaceDisponible, setSpaceDisponible] = useState([]);
    const [showBurger, setShowBurger] = useState(false);
    const [nearSuccessRating, setNearSuccessRating] = useState(0);
    const [farSuccessRating, setFarSuccessRating] = useState(0);
    const [farRewardcalc, setFarRewardcalc] = useState(0);
    const [nearRewardcalc, setNearRewardcalc] = useState(0);
    const [farOrNear, setFarOrNear] = useState('near');
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [successResult, setSuccessResult] = useState(null);
    const [rateImg, setRateImg] = useState(null);
    const [rewardResult, setRewardResult] = useState(0);
    const [numberResult , setNumberResult] = useState(0);
    const [finalRate, setFinalRate] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertKey, setAlertKey] = useState('no alert');

    const customSpace = 3;

    useEffect(() => {
        if(props.byke === null){
            setBackgroundByke(null)
        }else{
        if (props.byke.level === 1) {
            setBackgroundByke(MotoA);
        }
        if (props.byke.level === 2) {
            setBackgroundByke(MotoB);
        }
        if (props.byke.level === 3) {
            setBackgroundByke(MotoC);
        }
        return () => {
            setBackgroundByke(null);
        }
    }
    }, [props.byke])

    useEffect(() => {
        if (props.byke !== null) {
        emptySpace();
        disponibleSpace();
        successCalculate();
        rewardCalculate();
        return () => {
            setCurrentSpace([]);
            setSpaceDisponible([]);
            setNearSuccessRating(0);
            setFarSuccessRating(0);
            setNearRewardcalc(0);
            setFarRewardcalc(0);
        }
    }
    }, [props.byke, burgerBag])

    const emptySpace = () => {
        let spaceCounter = [];
        const counter = customSpace - props.byke.level
        for (let i = 0; i < counter; i++) {
            spaceCounter.push([{ space: i }]);
        }
        setCurrentSpace(spaceCounter);
    }

    const disponibleSpace = () => {
        let spaceCounter = [];
        let burger = burgerBag.length
        const counter = props.byke.level - burger
        for (let i = 0; i < counter; i++) {
            spaceCounter.push([{ space: i }]);
        }
        setSpaceDisponible(spaceCounter);
    }

    const showBurgerInventory = () => {
        setShowBurger(true);
    }

    const closeBurgerInventory = () => {
        setShowBurger(false);
    }

    const selectBurger = (burger) => {
        setBurgerBag([...burgerBag, burger]);
    }

    const removeBurger = (burger) => {
        let newBurgerBag = burgerBag.filter(item => item.id !== burger.id);
        setBurgerBag(newBurgerBag);
    }

    // const showBykesInventory = () => {
    //     props.showBykes(true);
    //     setBurgerBag([]);
    // }

    const rewardCalculate = () => {
        let nearReward = 0;
        let farReward = 0;
        for (let i = 0; i < burgerBag.length; i++) {
            switch (burgerBag[i].rarity) {
                case "Common":
                    nearReward += 5.1;
                    farReward += 10.2;
                    break;
                case "Uncommon":
                    nearReward += 7.5;
                    farReward += 15;
                    break;
                case "Rare":
                    nearReward += 12.14;
                    farReward += 24.28;
                    break;
                case "Legendary":
                    nearReward += 30;
                    farReward += 60;
                    break;
                default:
                    break;
            }
        }
        setFarRewardcalc(farReward);
        setNearRewardcalc(nearReward);
    }

    const successCalculate = () => {
        let nearSuccessRate = []
        let farSuccessRate = []
        for (let i = 0; i < burgerBag.length; i++) {
            switch (burgerBag[i].rarity) {
                case 'Common':
                    nearSuccessRate.push(90);
                    farSuccessRate.push(45);
                    break;
                case 'Uncommon':
                    nearSuccessRate.push(80);
                    farSuccessRate.push(40);
                    break;
                case 'Rare':
                    nearSuccessRate.push(70);
                    farSuccessRate.push(35);
                    break;
                case 'Legendary':
                    nearSuccessRate.push(60);
                    farSuccessRate.push(30);
                    break;
                default:
                    break;
            }
            const nearSucces = Math.min(...nearSuccessRate)
            const farSucces = Math.min(...farSuccessRate)
            setNearSuccessRating(nearSucces);
            setFarSuccessRating(farSucces);
        }
    }

        const startDelivery = () => {
            let progressLess;
            let reward
            const result = Math.floor(Math.random() * 101);

            if(farOrNear === 'near'){
                progressLess = 1;
                if(result <= nearSuccessRating){
                    setSuccessResult('Congratulations! orders delivered on time');
                    setRateImg(check);
                    setNumberResult(result);
                    setFinalRate(nearSuccessRating);
                    reward = nearRewardcalc;
                }else{
                    setSuccessResult('Sorry, orders not delivered on time');
                    setRateImg(unchecked);
                    setNumberResult(result);
                    setFinalRate(nearSuccessRating);
                    reward = 0;
                }
            }else{
                progressLess = 2;
                if(result <= farSuccessRating){ 
                    setSuccessResult('Congratulations! orders delivered on time');
                    setRateImg(check);
                    setNumberResult(result);
                    setFinalRate(farSuccessRating);
                    reward = farRewardcalc;
                }else{
                    setSuccessResult('Sorry, orders not delivered on time');
                    setRateImg(unchecked);
                    setNumberResult(result);
                    setFinalRate(farSuccessRating);
                    reward = 0;
                }
            }
            if(user.gas < progressLess ){setAlertKey(    {
                key: 'noGas',
                header: 'Out of Gas',
                body: 'please fill the gas',
            }); setShowAlert(true);   return}
            if(user.contract < progressLess ){setAlertKey(    {
                key: 'noRoute',
                header: 'No Route',
                body: 'please select a route',
            });  setShowAlert(true);  return}
            if(props.byke.progressBar < progressLess ){setAlertKey(    {
                key: 'noMoto',
                header: 'broken motorcycle',
                body: 'has no more uses',
            }); setShowAlert(true);   return}
            for(let i = 0; i < burgerBag.length; i++){
                if(burgerBag[i].progressBar < progressLess ){  setAlertKey(    {
                    key: 'noBurger',
                    header: 'no Burger',
                    body: 'has not enought uses',
                });setShowAlert(true);  return}
            }
            setRewardResult(reward);
            setShowFinalScreen(true);
            dispatch(fetchDeliverySuccess(progressLess, reward));
            dispatch(fetchStartDelivery(props.byke, burgerBag, progressLess ));
            
        }

        const closeDelivery = () => {
            setBurgerBag([]);
            props.resetDelivery();
        }


    return (
        <>  
            <Alerts showAlert={showAlert} setShowAlert={setShowAlert} alertKey={alertKey}/>

            <FinalScreen setShowFinalScreen={setShowFinalScreen} showFinalScreen={showFinalScreen} success={successResult} rateImg={rateImg} tokenGainned={rewardResult} numberResult={numberResult} finalRate={finalRate} close={closeDelivery}/>
            
            <SelectBurger burgerBag={burgerBag} showBurger={showBurger} selectBurger={selectBurger} close={closeBurgerInventory} />

            <AnimatePresence>
                {props.byke && (
                    <motion.div
                        transition={{ duration: 0.2 }}
                        className='byke-menu'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1,  }}
                        exit={{ opacity: 0 }}
                    >
                        <div className='byke-menu-img'>
                            <h3>Select Burgers</h3>
                            <div className='bag-burgers'>
                                {burgerBag.map((burger, index) => (
                                    <div key={index} className='freeBox'>
                                        <div onClick={() => removeBurger(burger)} className='closeButton2'>X</div>
                                        <img src={{
                                            'Common': common,
                                            'Rare': rare,
                                            'Uncommon': uncommon,
                                            'Legendary': legendary
                                        }[burger.rarity]} alt={burger.name} />

                                    </div>
                                ))}
                                {spaceDisponible.map((space, index) =>
                                    <div className='freeBox' key={index}></div>)}
                                {currentSpace.map((space, index) =>
                                    <div className='closeBox' id={`space${index}`} key={index}></div>)}
                            </div>

                            <img id='bgdByke' src={backgroundByke} alt={backgroundByke} />


                            <div className='choose-burger'>

                                <div className='imgbox2'>
                                    {spaceDisponible.length > 0 ?
                                        <img onClick={showBurgerInventory} src={plus} alt={plus} />
                                        :
                                        <h3>Full Bag!</h3>}

                                </div>
                            </div>
                        </div>
                        <div className='byke-info'>
                            <div className='info-header'>
                                <h3>Delivery Information</h3>
                            </div>
                            <div className='byke-info-section'>
                                <button onClick={() => setFarOrNear('near')} className={farOrNear === 'near' ? 'button' : 'button notChoiceButton'}><h3>Near</h3></button>
                                <button onClick={() => setFarOrNear('far')} className={farOrNear === 'far' ? 'button' : 'button notChoiceButton'}><h3>Far</h3></button>

                                {/* <img src={backgroundByke} alt={backgroundByke}/>
                                <button onClick={showBykesInventory}><h3>change byke</h3></button> */}
                            </div>
                            <div className='byke-info-section'>
                                <img src={burger} alt={burger} /> 
                                <h3>=  {burgerBag.length}</h3>
                                {burgerBag.length > 0 ?
                                <img src={check} alt={check} />:
                                <img src={unchecked} alt={unchecked} />
                                }
                            </div>
                            <div className='byke-info-section'>
                                <img src={gas} alt={gas} />
                                {farOrNear === 'near' ?
                                <h3>{user.gas} - 1 = {user.gas - 1}</h3>:
                                <h3>{user.gas} - 2 = {user.gas - 2}</h3>
                                }
                                {user.gas > 0 ?
                                <img src={check} alt={check} />:
                                <img src={unchecked} alt={unchecked} />
                                }
                            </div>
                            <div className='byke-info-section'>
                                <img src={contract} alt={contract} />
                                {farOrNear === 'near' ?
                                <h3>{user.contract} - 1 = {user.contract - 1}</h3>:
                                <h3>{user.contract} - 2 = {user.contract - 2}</h3>
                                }
                                {user.contract > 0 ?
                                <img src={check} alt={check} />:
                                <img src={unchecked} alt={unchecked} />
                                }
                            </div>

                            <div className='byke-info-section'>
                                <h3> Rate: {farOrNear === 'near' ? nearSuccessRating : farSuccessRating}%</h3>
                            </div>
                            <div className='byke-info-section'>
                                <h3>Posible Profit: {farOrNear === 'near' ? nearRewardcalc : farRewardcalc}$ CMC</h3>
                            </div>
                            <div className='byke-info-section'>
                                <button onClick={startDelivery} className={burgerBag.length === 0 && user.gas > 0 && user.contract > 0 ? 'block-button button' : 'button'}>
                                    <h3>Start</h3>
                                </button>
                                <button onClick={closeDelivery} className='cancel-button button'>
                                    <h3>Cancel</h3>
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
