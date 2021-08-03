import { useState, useEffect } from 'react';
import styles from './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './api';

import ImageGallery from './ImageGallery-ui/ImageGallery';
import Searchbar from './Searchbar-ui/Searchbar';
import Button from './Button-ui/Button';
import Modal from './Modal-ui/Modal';
import Loader from 'react-loader-spinner';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    setLoader(true);
    fetchImages(searchQuery, page)
      .then(res => {
        const { hits } = res;
        if (hits.length === 0) {
          toast.error('Nothing was found for your query.');
        }
        setImages(prevState => [...prevState, ...hits]);
        setStatus('resolved');
      })
      .catch(() => {
        setStatus('rejected');
      })
      .finally(() => {
        setLoader(false);
        scroll();
      });
  }, [page, searchQuery]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleBtnClick = () => {
    setPage(state => state + 1);
    setLoader(true);
  };

  const showModal = () => {
    setOpenModal(!openModal);
  };

  const onImgClick = id => {
    const imgForModal = images.find(image => image.id === id);
    setModalImg(imgForModal);
    showModal();
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && null}
      {status === 'resolved' ? (
        <div>
          <ImageGallery images={images} onImgClick={onImgClick} />
          {images.length > 11 && loader === false ? (
            <Button onClick={handleBtnClick} />
          ) : null}
        </div>
      ) : null}
      {loader && (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#FF0000"
          height={100}
          width={100}
        />
      )}
      {status === 'rejected' && toast.error('Some proplems with server')}
      {openModal && <Modal openModal={showModal} modalImg={modalImg} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
