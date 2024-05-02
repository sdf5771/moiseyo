import React from 'react';
import Head from 'next/head';
import metaTag from "@/metaTag.json";

function HeadLayout(){
    return (
        <Head>
            <title>{metaTag.title}</title>
            <meta name="title" content={metaTag.title} />
            <meta name="robots" content={metaTag.robots} />
            <meta name="description" content={metaTag.description} />
            <meta property="og:url" content={metaTag.url} />
            <meta property="og:type" content={metaTag.type} />
            <meta property="og:title" content={metaTag.title} />
            <meta property="og:description" content={metaTag.description} />
            <meta property="og:image" content={metaTag.imageSrc} />
            <meta name="twitter:card" content={metaTag.twitterCard} />
            <meta name="twitter:title" content={metaTag.title} />
            <meta name="twitter:url" content={metaTag.url} />
            <meta name="twitter:description" content={metaTag.description} />
            <meta name="twitter:image" content={metaTag.imageSrc} />
            <meta name="naver-site-verification" content="0a985644cfee12d7c186e8b6748b939560109aa5" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default HeadLayout;