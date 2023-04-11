import 'index.css';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <button
      className="Button"
      onClick={() => {
        loadMore();
      }}
      type="button"
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
