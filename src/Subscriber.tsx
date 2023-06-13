import React, { useEffect, useRef } from 'react';

const SubscriberDirective = () => {
    const ngUnsubscribeRef = useRef(null);

    // useEffect(() => {
    //     ngUnsubscribeRef.current = new Map();
    //
    //     return () => {
    //         ngUnsubscribeRef.current.forEach((unsubscribe) => unsubscribe());
    //         ngUnsubscribeRef.current.clear();
    //     };
    // }, []);
    //
    // const ngOnDestroy = () => {
    //     ngUnsubscribeRef.current.forEach((unsubscribe) => unsubscribe());
    //     ngUnsubscribeRef.current.clear();
    // };
    //
    // return null;
};

export default SubscriberDirective;
