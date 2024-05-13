'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, {useEffect} from 'react';

function ValidateTokenWrapper({children}: {children: React.ReactNode}){
    const router = useRouter();
    const {validationAccessToken} = useAuth();
  
    useEffect(() => {
      validationAccessToken();
    },[router.pathname])
    return(
        <>
        {children}
        </>
    )
}

export default ValidateTokenWrapper;