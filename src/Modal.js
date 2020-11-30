import React, { useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';



const Modal = ({ children }) => {
    // useRef is needed because we need to create a div and clean it up as well when it is closed

    // useRef returns a mutable ref object whose .current property is initialized to the
    // passed argument (initialValue). The returned object will persist for the full
    // lifetime of the component. So in this case, elRef.current = null
    const elRef = useRef(null);
    if(!elRef.current) {
        const div = document.createElement('div');
        // elRef is an object and current will always point at this div, so we have a hook
        // which will always render that div correctly
        elRef.current = div;
    }


    // useEffect has a special fn, if you return a fn, that is the clean up fn.
    // it will run this when it unmounts, the component will unmount of hooks
    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(elRef.current);

        // it will run this only when the modal is closed
        return () => modalRoot.removeChild(elRef.current);
        //empty array because we want this effect to run only once. It has no dependencies, 
        // just need it to run once.
    }, [])

    // wrapping with a div becasue we styled it with a div
    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;

// grab modal
// append div
// inside the div we have all the children
// at the end, we remove it