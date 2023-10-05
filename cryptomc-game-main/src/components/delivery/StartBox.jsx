import React from "react";
import plus from "../../images/svg/pluschoice.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_BYKE } from "../../redux/constanst";

export default function StartBox(props) {
  const { showByke } = useSelector((state) => state.userState);
  const dispatch = useDispatch()
  console.log("Holaaa2", props.choiceEmpty );
  return (
    <AnimatePresence>
      {props.choiceEmpty && (
        <motion.div
          className="select-box"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            duration: 0,
            delay: 0.2,
          }}
          exit={{ scale: 0 }}
        >
          <h2>Start Delivery</h2>
          <div
            className="imgbox"
            onClick={() => {
              props.openBykes();
            }}
          >
            <img src={plus} alt={plus} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
