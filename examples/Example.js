import React from 'react';
import Carousel from '../src/Carousel';

import './example.css';

function Example() {
    return (
        <div className="example">
            <div className="header">Light weight react carousel library with ssr support.</div>
            <Carousel height="480px">
                <img src="/assets/image_1.jpg" />
                <img src="/assets/image_2.jpeg" />
            </Carousel>
        </div>
    )
}

export default Example;
