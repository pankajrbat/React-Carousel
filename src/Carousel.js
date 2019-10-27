import React, { useState, useEffect } from 'react';
import Swipe from './Swipe';

import './carousel.css';

function Carousel(props) {
    const containerRef = React.createRef();
    const slidesCount = React.Children.count(props.children);

    const [activeSlide, setActiveSlide] = useState(0);
    
    // forced width
    let w = parseInt(props.width); 
    if (isNaN(w)) w = 0;
    const [slideWidth, setSlideWidth] = useState(w);

    useEffect(() => {
        if (props.width != null || props.width !== '') return;

        const $container = containerRef.current;
        if ($container) {
            const { width } = $container.getBoundingClientRect();
            setSlideWidth(width);
        }
    });
    
    const previous = () => {
        const slide = activeSlide - 1;
        if (slide < 0) return;
        setActiveSlide(slide);
    }

    const next = () => {
        const slide = activeSlide + 1;
        if (slide >= slidesCount) return;
        setActiveSlide(slide);
    }

    return (
        <div className="carousel" style={{ width: props.width }}>
            {/* <button type="button" className="" aria-label="carousel-prev">prev</button> */}
            <Swipe previous={previous} next={next}>
                <div ref={containerRef} className="carousel-track-container" style={{ height: props.height }}>
                    <div className="carousel-track" style={{ transform: `translateX(-${slideWidth * activeSlide}px)`}}>
                        {React.Children.map(props.children, (node, index) => <div className={`carousel-slide ${activeSlide === index ? 'active-slide' : ''}`} style={{ left: index * slideWidth }} key={index}>{node}</div>)}
                    </div>
                </div>
            </Swipe>
            {/* <button type="button" className="" aria-label="carousel-next">next</button> */}
            {/* <div className="nav-dots-container">
                {React.Children.map(props.children, (node, index) => <span className={`nav-dots ${activeSlide === index ? 'active' : ''}`} key={index}></span>)}
            </div> */}
        </div>
    );
}

export default Carousel;

Carousel.defaultProps = {
    width: undefined,
    height: ''
}
