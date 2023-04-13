import 'index.css';
import { useState, useEffect } from 'react';
import { SearchBar } from './SerchBar/SerchBar';
import SerchImageApi from '../Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [largeImg, setlargeImg] = useState('');
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (value === '') {
      return;
    }
    const searchImages = async () => {
      try {
        setIsDisabled(true);
        setIsLoading(true);
        const { totalHits, hits } = await SerchImageApi(value, page);
        const totalHitsRes = Math.ceil(totalHits / 12);
        setTotalHits(totalHitsRes);

        if (totalHits === 0) {
          toast.error('write something normal 😵‍💫', {
            duration: 1000,
            position: 'top-right',
          });

          return;
        }
        setImages(prevState => [...prevState, ...hits]);

        setIsLoading(false);
        if (page > 1) {
          setTimeout(() => {
            window.scrollBy({
              top: 600,
              behavior: 'smooth',
            });
          });
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [value, page]);

  const setSearchQuery = query => {
    if (query === value) {
      setValue('');

      return;
    }
    setImages([]);
    setPage(1);
    setValue(query);
  };

  const openModal = img => {
    setModalShown(modalShown => (modalShown = !modalShown));
    setlargeImg(img);
  };
  const loadMorePage = () => {
    setPage(prevStates => prevStates + 1);
  };

  return (
    <div className="App">
      <SearchBar setQuery={setSearchQuery} />
      {images.length > 0 && (
        <ImageGallery images={images} modalShown={openModal} />
      )}
      {isLoading && <Loader />}
      {modalShown && <Modal value={largeImg} modalShown={openModal} />}
      {isDisabled && totalHits !== page && images.length > 0 && (
        <Button loadMore={loadMorePage} />
      )}
      <Toaster />
    </div>
  );
};
