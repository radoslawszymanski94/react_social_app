import React from "react";
import { motion } from "framer-motion";

const ValidationInfo = ({ animation, children }) => {
  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="show"
      className="validationInfo"
    >
      {children}
    </motion.div>
  );
};

export default ValidationInfo;
