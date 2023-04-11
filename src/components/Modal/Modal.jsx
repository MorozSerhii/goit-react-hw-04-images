import 'index.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImCancelCircle } from 'react-icons/im';
import { motion } from 'framer-motion';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }
  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalShown();
    }
  };

  render() {
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
              this.props.modalShown();
            }}
          >
            <ImCancelCircle className="iconX" />
          </button>
          <img className="modalImg" src={this.props.value} alt="" />
        </motion.div>
      </div>
    );
  }
}

Modal.propTypes = {
  ModalShown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
