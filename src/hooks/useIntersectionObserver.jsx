import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (callback) => {
    const [observedElement, setObservedElement] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        });

        if (observedElement) observer.current.observe(observedElement);

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [observedElement, callback]);

    return setObservedElement;
};

export default useIntersectionObserver;
