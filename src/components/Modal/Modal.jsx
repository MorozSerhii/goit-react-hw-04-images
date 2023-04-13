import 'index.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImCancelCircle } from 'react-icons/im';
import { motion } from 'framer-motion';

export const Modal = ({ modalShown, value }) => {
  useEffect(() => {
    const handelKeyDown = e => {
      if (e.code === 'Escape') {
        modalShown();
      }
    };
    window.addEventListener('keydown', handelKeyDown);

    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  });

  return (
    <div className="Overlay">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeIn', duration: 0.5 }}
        className="Modal"
      >
        <button
          className="modalCloseBtn"
          type="button"
          onClick={() => {
            modalShown();
          }}
        >
          <ImCancelCircle className="iconX" />
        </button>
        <img className="modalImg" src={value} alt="" />
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  value: PropTypes.string.isRequired,
  modalShown: PropTypes.func.isRequired,
};
