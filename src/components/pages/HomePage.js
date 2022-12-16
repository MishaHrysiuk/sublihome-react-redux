import { Carousel } from "react-bootstrap"

import Cup1 from '../../resources/img/cup_1.PNG';
import Cup2 from '../../resources/img/cup_2.PNG';
import Cup3 from '../../resources/img/cup_3.PNG';
import Cup4 from '../../resources/img/cup_4.PNG';
import Shirt1 from '../../resources/img/shirt_1.PNG';
import Shirt2 from '../../resources/img/shirt_2.PNG';
import Shirt3 from '../../resources/img/shirt_3.PNG';
import Hoody1 from '../../resources/img/hoody_1.PNG';
import Hoody2 from '../../resources/img/hoody_2.PNG';

import Car2 from '../../resources/img/carousel2.jpg';
import Car3 from '../../resources/img/carousel3.jpg';

const HomePage = () => {
    return (
        <>
            <div className='block'>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="carousel__image"
                        src={Car2}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Sublihome</h3>
                        <p>Сублімація на чашках, футболках та інших речах</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="carousel__image"
                        src={Car3}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Sublihome</h3>
                        <p>Товари з власним дизайном</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="block block__bg__lazur">
                <div className="container">
                    <div className="block__title block__title__white title">Галерея</div>
                        <div className="block__row">
                            <img src={Cup1} alt="" className="block__image" />
                            <img src={Shirt1} alt="" className="block__image" />
                            <img src={Hoody1} alt="" className="block__image" />
                            <img src={Cup2} alt="" className="block__image" />
                            <img src={Shirt2} alt="" className="block__image" />
                            <img src={Shirt3} alt="" className="block__image" />
                            <img src={Cup3} alt="" className="block__image" />
                            <img src={Cup4} alt="" className="block__image"/>
                            <img src={Hoody2} alt="" className="block__image" />
                        </div>
                </div>
            </div>
        </>
    )
}

export default HomePage