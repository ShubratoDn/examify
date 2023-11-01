import React, { useEffect, useRef } from 'react';

export const useMountedEffect = (callback) => {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            callback();
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
};
