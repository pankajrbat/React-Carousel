import React from 'react';
import Carousel from '../src/Carousel';

import './example.css';

function Example() {
    return (
        <div className="example">
            <div className="header">Light weight react carousel library with ssr support.</div>
            <div className="header">Carousel with single slide</div>
            <Carousel height="480" width="608" slidesInView="1">
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_2.jpeg" />
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_2.jpeg" />
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_1.jpg" />
            </Carousel>
            <div className="header">Carousel with multiple slide</div>
            <Carousel height="200" width="610" slidesInView="3">
                <img src="/assets/model1.jpg" />
                <img src="/assets/model2.jpg" />
                <img src="/assets/model3.jpg" />
                <img src="/assets/model4.jpg" />
                <img src="/assets/model5.jpg" />
                <img src="/assets/model7.jpg" />
                <img src="/assets/model8.jpg" />
            </Carousel>
            {/* <div className="header">Carousel with no default width</div>
            <Carousel height="480" slidesInView="2">
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_2.jpeg" />
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_2.jpeg" />
                <img src="/assets/image_1.jpg" />
            </Carousel> */}
        </div>
    )
}

export default Example;
