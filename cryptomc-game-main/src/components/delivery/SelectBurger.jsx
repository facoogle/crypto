import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Common from "../../images/inventory/Common.png";
import Rare from "../../images/inventory/Rare.png";
import Uncommon from "../../images/inventory/Uncommon.png";
import Legendary from "../../images/inventory/Legendary.png";
import Timer from "./Timer";

export default function SelectBurger(props) {
  const common = "rgb(106,106,106)";
  const uncommon =
    "linear-gradient(90deg, rgba(38,32,208,1) 0%, rgba(5,3,74,1) 86%)";
  const rare =
    "linear-gradient(90deg, rgba(167,32,208,1) 0%, rgba(46,3,74,1) 86%)";
  const legendary =
    "linear-gradient(90deg, rgba(208,178,32,1) 0%, rgba(74,72,3,1) 86%)";

  const { userData } = useSelector((state) => state.userState);

  const burgers = userData?.nftTemporales ? userData?.nftTemporales.filter((element) => element.type === "burger"): [];

  const [remainBurgers, setRemainBurgers] = useState([]);

  useEffect(() => {
    //console.log("triggered Filter")
    //console.log("burgerBag", props.burgerBag)
    let filteredBurgers = [];
    for (let i = 0; i < burgers.length; i++) {
      if (!props.burgerBag.includes(burgers[i])) {
        filteredBurgers.push(burgers[i]);
      }
    }
    filteredBurgers.filter((item) => item.progressBar > 0);
    //console.log("filteredBurgers", filteredBurgers)
    setRemainBurgers(filteredBurgers);

    return () => {
      setRemainBurgers([]);
    };
  }, [burgers, props.burgerBag, props.showBurger]); 

  /* const close = (burger) => {
    props.selectBurger(burger);
    props.close();
  }; */

  //console.log("remainBurgers", remainBurgers)

  return (
    <AnimatePresence>
      {props.showBurger && (
        <motion.div
          className="invetoryOpen"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ type: "spring", stiffness: 80, duration: 0.2 }}
        >
          <div className="closeButton" onClick={() => props.close()}>
            X
          </div>
          <h3>Burger Inventory</h3>
          <div className="inventory-select">
            {remainBurgers.map((burger, index) => (
              <div
                className="invetory-item"
                key={index}
                style={{
                  height:"300px",
                  background: {
                    1: common,
                    2: uncommon,
                    3: rare,
                    4: legendary,
                  }[burger.rarity],
                }}
              >
                <div className="item-header">
                  <div className="item-status">
                    <p>{burger.state}</p>
                  </div>

                  <div className="progress-box">
                    <div className="inventory-item-progressBar">
                      <div
                        className="inventory-item-progressBar-fill"
                        style={{
                          width: `${
                            (burger.progressBar / burger.progressBarMax) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="id" style={{display:"flex", justifyContent:"center"}}>
                    <p style={{width:"160px", fontSize:"10px"}}>ID:{burger._id}</p>
                  </div>
                  <div className="stars">
                    <p>{burger.name} </p>
                  </div>
                </div>
                <div className="item-body">
                  <div className="item-img">
                    <img
                      src={
                        {
                          1: Common,
                          2: Rare,
                          3: Uncommon,
                          4: Legendary,
                        }[burger.rarity]
                      }
                      alt={burger.rarity}
                    />
                  </div>
                </div>
                <div className="item-footer">
                  <Timer
                    selectBurger={props.selectBurger}
                    close={props.close}
                    eventTime={0}
                    interval={0}
                    burger={burger}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
