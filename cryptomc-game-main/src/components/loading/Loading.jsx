import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import "../../style/style_loading.css";
import loading2 from "../../images/svg/spinning-circles.svg";

export default function Loading() {
  const { loading } = useSelector((state) => state.userState);
  console.log("desde loading", loading)
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="black-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loading-container">
            <div className="loading-text">
              <img src={loading2} alt="loading" />
              <h3>Loading...</h3>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
