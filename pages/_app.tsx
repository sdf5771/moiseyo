'use client';
import { HeadLayout } from "@/components/layout";
import { ReactQueryProvider, RecoilRootWrapper } from "@/components/public";
import "@/styles/globals.css";
import "@/styles/initialize.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <RecoilRootWrapper>
        <HeadLayout />
        <Component {...pageProps} />
      </RecoilRootWrapper>
    </ReactQueryProvider>
  );
}
