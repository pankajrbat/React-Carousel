import React, { useEffect } from 'react';

/*
    @notations
    x : pageX,
    t : time
    w : container width 
    delta(x) < delta(y) : scrolling

    if (delta(x) > 20 & delta(t) < 250ms or delta(x) > w/2) & !(delta(x) < delta(y))
    then swipe()
*/

function Swipe(props) {
    const containerRef = React.createRef();

    // calculate delta(x) & delta(y) with touch start & end point
    let start = {};
    let end = {};
    let dx = 0;
    let deltaX = 0;
    let deltaY = 0;
    let deltaT = 0;

    let containerWidth = 0;

    // to determine if user scolling or swiping 
    let isScrolling = false;

    useEffect(() => {
        const $container = containerRef.current;
        if ($container) {
            containerWidth = $container.getBoundingClientRect().width;
        }
    });

    const onTouchStart = event => {
        deltaX = 0;
        deltaY = 0;
        deltaT = 0;
        isScrolling = false;
        // capture coordinates of starting point
        const { touches = [] } = event;
        start = { x: touches[0].pageX, y: touches[0].pageY, time: Number(new Date()) };
    }

    const onTouchMove = event => {
        // ensure event is swiping & not pinching
        if (event.touches.length > 1 || event.scale && event.scale !== 1) {
            return;
        }
        // capture coordinates of end point
        const { touches = [] } = event;
        end = { x: touches[0].pageX, y: touches[0].pageY, time: Number(new Date()) };
        // caculate delta(x) & delta(y) & delta(t)
        dx = end.x - start.x;
        deltaX = Math.abs(dx);
        deltaY = Math.abs(end.y - start.y);
        deltaT = Math.abs(end.time - start.time);
        // determine scroll
        isScrolling = deltaX < deltaY;
    }

    const onTouchEnd = () => {
        // if ((delta(x) > 20 & delta(t) < 250ms or delta(x) > w/2)) & !scrolling
        // then swipe()
        if (((deltaX > 20 && deltaT < 250) || (deltaX > containerWidth / 2)) && !isScrolling) {
            const fn = dx > 0 ? props.previous : props.next;
            fn();
        }
    }


    return (
        <div className="swipe-container" ref={containerRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
            {props.children}
        </div>
    );
}

export default Swipe;

Swipe.defaultProps = {
    next: () => {},
    previous: () => {}
};
