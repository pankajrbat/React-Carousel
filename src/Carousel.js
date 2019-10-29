import React, { useState, useEffect } from 'react';
import Swipe from './Swipe';

import './carousel.css';

function Carousel(props) {
    const containerRef = React.createRef();
    const slidesCount = React.Children.count(props.children);

    const [activeSlide, setActiveSlide] = useState(0);

    // forced width
    const [slideWidth, setSlideWidth] = useState(props.width / props.slidesInView);

    useEffect(() => {
        if (props.width != null) return;

        const $container = containerRef.current;
        if ($container) {
            const { width } = $container.getBoundingClientRect();
            setSlideWidth(width / props.slidesInView);
        }
    }, []);

    const previous = () => {
        const slide = activeSlide - 1;
        if (slide < 0) return;
        setActiveSlide(slide);
    }

    const next = () => {
        const count = props.slidesInView - 1;
        const slide = activeSlide + 1;
        if (slide >= slidesCount - count) return;
        setActiveSlide(slide);
    }

    const getDots = (count) => {
        const dots = [];
        for (let i = 0; i < count; i++) {
            dots.push(<span className={`nav-dot ${activeSlide === i ? 'active' : ''}`} key={i}></span>);
        }
        return dots;
    }

    return (
        <div className="carousel" style={{ width: `${props.width}${props.unit}` }}>
            <button onClick={previous} type="button" className="carousel-btn previous" aria-label="carousel-prev" />
            <Swipe previous={previous} next={next}>
                <div ref={containerRef} className="carousel-track-container" style={{ height: `${props.height}${props.unit}` }}>
                    <div className="carousel-track" style={{ transform: `translateX(-${slideWidth * activeSlide}${props.unit})` }}>
                        {React.Children.map(props.children, (node, index) => <div className={`carousel-slide ${activeSlide === index ? 'active-slide' : ''}`} style={{ left: index * slideWidth }} key={index}>{node}</div>)}
                    </div>
                </div>
            </Swipe>
            <button onClick={next} type="button" className="carousel-btn next" aria-label="carousel-next" />
            <div className="nav-dots-container">
                {getDots(slidesCount - (props.slidesInView - 1))}
            </div>
        </div>
    );
}

export default Carousel;

Carousel.defaultProps = {
    width: undefined,
    height: undefined,
    unit: 'px',
    slidesInView: 1
}
