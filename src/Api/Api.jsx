import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const SerchImage = async (value, page = 1) => {
  const response = await axios({
    params: {
      per_page: 12,
      key: '33676510-60d9800a173eb3eec07b521d4',
      q: value,
      page: page,
    },
  });
  return response.data;
};

SerchImage.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
