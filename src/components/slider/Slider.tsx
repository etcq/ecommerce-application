import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styles from './slider.module.scss';
import { X } from 'lucide-react';

interface ISliderProps {
  slides: string[];
  name: string;
}

const ImageSlider: React.FC<ISliderProps> = ({ slides, name }) => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    const closeModal = (event: MouseEvent): void => {
      if (modalSliderRef.current && event.target instanceof Node && !modalSliderRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    const timeout = setTimeout(() => {
      document.addEventListener('click', closeModal);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', closeModal);
    };
  }, [isModalOpen]);
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div>
        <Swiper
          className={styles.slider}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={1}
          slidesPerView={1}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={image}>
              <div className={styles['image-wrapper']}>
                {loading && <div className={styles.loader}>Loading...</div>}
                <img
                  src={image}
                  alt={name}
                  onClick={() => openModal(index)}
                  onLoad={handleImageLoad}
                  style={{ display: loading ? 'none' : 'block' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div ref={modalSliderRef}>
            <Swiper
              className={styles['slider-large']}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              initialSlide={modalIndex!}
            >
              <button className={styles.close} type="button" onClick={closeModal}>
                <X />
              </button>
              {slides.map((image, index) => (
                <SwiperSlide key={image}>
                  <div className={styles['image-wrapper']}>
                    {loading && <div className={styles.loader}>Loading...</div>}
                    <img
                      className={styles['image-large']}
                      src={image}
                      alt={name}
                      onClick={() => openModal(index)}
                      onLoad={handleImageLoad}
                      style={{ display: loading ? 'none' : 'block' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
