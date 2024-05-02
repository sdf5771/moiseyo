'use client'
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type Tchildren = {
    children: React.ReactNode
}

/**
 * Hydration이 되었으며, max-width 768이하 모바일 사이즈일 경우 자식 component를 렌더링하는 Wrapping Component
 * @param {React.ReactNode} children Wrapping 될 자식 Component
 * @returns React.JSX.Element
 */
export const ResponsiveMobile = ({children}: Tchildren) => {
    const [isHydrate, setIsHydrate] = useState(false);
    const isMobile = useMediaQuery({
        query : "(max-width: 768px)"
    });

    useEffect(() => {
        setIsHydrate(isMobile);
    }, [isMobile])

    return <>{isHydrate && isMobile && children}</>
}

/**
 * Hydration이 되었으며, min-width 769이하 max-width 1023이상 타블렛PC 사이즈일 경우 자식 component를 렌더링하는 Wrapping Component
 * @param {React.ReactNode} children Wrapping 될 자식 Component
 * @returns React.JSX.Element
 */
export const ResponsiveTabletPC = ({children}: Tchildren) => {
    const [isHydrate, setIsHydrate] = useState(false);
    const isTabletPC = useMediaQuery({
    query : "(min-width: 769px) and (max-width: 1023px)"
    })

    useEffect(() => {
        setIsHydrate(isTabletPC);
    }, [isTabletPC])

     return <>{isHydrate && isTabletPC && children}</>
}

/**
 * Hydration이 되었으며, max-width 1024이상 PC 사이즈일 경우 자식 component를 렌더링하는 Wrapping Component
 * @param {React.ReactNode} children Wrapping 될 자식 Component
 * @returns React.JSX.Element
 */
export const ResponsivePC = ({children}: Tchildren) => {
    const [isHydrate, setIsHydrate] = useState(false);
    const isPC = useMediaQuery({
        query : "(min-width: 1024px)"
    })

    useEffect(() => {
        setIsHydrate(isPC);
    }, [isPC])

    return <>{isHydrate && isPC && children}</>
}