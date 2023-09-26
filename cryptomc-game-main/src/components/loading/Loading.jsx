import { useSelector } from "react-redux";
import { motion, AnimatePresence } from 'framer-motion';
import "../../style/style_loading.css";
import loading from '../../images/svg/spinning-circles.svg';

export default function Loading() {
    const inventory = useSelector(state => state.inventory);

  return (
    <AnimatePresence>
        {inventory.loading && (
    <motion.div 
    className="black-background"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
        <div className="loading-container">
            <div className="loading-text">
                <img src={loading} alt="loading" />
                <h3>Loading...</h3>
            </div>
        </div>
    </motion.div>
        )}
    </AnimatePresence>
  )
}
