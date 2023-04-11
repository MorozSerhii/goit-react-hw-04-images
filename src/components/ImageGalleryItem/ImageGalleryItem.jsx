import 'index.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  images: { id, largeImageURL, webformatURL },
  modalShown,
}) => {
  return (
    <>
      <li className="ImageGalleryItem">
        <img
          onClick={() => {
            modalShown(largeImageURL);
          }}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt=""
        />
      </li>
    </>
  );
};
ImageGalleryItem.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),

  modalShown: PropTypes.func,
};
