import 'index.css';
import { Component } from 'react';
import { SearchBar } from './SerchBar/SerchBar';
import * as Api from '../Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import toast, { Toaster } from 'react-hot-toast';
export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    modalShown: false,
    largeImg: '',
    isDisabled: false,
    value: '',
    page: 1,
    TotalHits: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, value } = this.state;
    if (prevState.page !== page || prevState.value !== value) {
      this.searchImages(value, page);
    }
  }

  setSearchQuery = query => {
    const { page, value } = this.state;
    this.setState({ value: query, page: 1 });
    if (query === value) {
      this.searchImages(query, page);
    }
  };

  searchImages = async (values, page) => {
    try {
      this.setState({ isLoading: true, isDisabled: false });
      const data = await Api.SerchImage(values, page);
      const totalHits = Math.ceil(data.totalHits / 12);
      if (totalHits === 0) {
        toast.error('write something normal 😵‍💫', {
          duration: 1000,
          position: 'top-right',
        });
        return;
      }
      this.setState({ TotalHits: totalHits });
      this.loadMoreBtnShown(totalHits);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      throw new Error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  openModal = img => {
    this.setState(({ modalShown }) => ({
      modalShown: !modalShown,
      largeImg: img,
    }));
  };
  loadMoreBtnShown = value => {
    if (value > 1) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };
  loadMorePage = () => {
    this.setState(prevStates => ({ page: prevStates.page + 1 }));
    this.onScroll(this.state.page);
    this.onScroll();
  };
  onScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: 560,
        behavior: 'smooth',
      });
    }, 100);
  };
  onReset = () => {
    this.setState({ images: [] });
  };

  render() {
    const {
      images,
      isLoading,
      modalShown,
      largeImg,
      isDisabled,
      page,
      TotalHits,
    } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.setSearchQuery} onReset={this.onReset} />
        {images.length > 0 && (
          <ImageGallery images={images} modalShown={this.openModal} />
        )}
        {isLoading && <Loader />}
        {modalShown && <Modal value={largeImg} modalShown={this.openModal} />}
        {isDisabled && TotalHits !== page && (
          <Button loadMore={this.loadMorePage} />
        )}
        <Toaster />
      </div>
    );
  }
}
