import React from 'react';
import slide1 from '../assets/images/slide4.jpg'
import slide2 from '../assets/images/slide5.jpg'
import slide3 from '../assets/images/slide6.png'

// https://en.spec-zone.ru/react_bootstrap/components/carousel/index
import Carousel from 'react-bootstrap/Carousel';

const HomeScreen = () => {
  return (
    <div>
      <Carousel pause='hover' interval='2000'>
        <Carousel.Item>
          <img className="d-block w-auto" src={slide1} alt="First slide" />
          <Carousel.Caption><h5>Хранилище всего на свете</h5></Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-auto" src={slide3} alt="Second slide" />
          <Carousel.Caption><h5>Доступ к файлам</h5></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-auto" src={slide2} alt="Third slide" />
          <Carousel.Caption><h5>Создано для всего</h5></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeScreen;
