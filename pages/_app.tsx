'use client';
import { HeadLayout } from "@/components/layout";
import { ReactQueryProvider, RecoilRootWrapper } from "@/components/public";
import ModalRenderWrapper from "@/components/public/ModalRenderWrapper";
import ValidateTokenWrapper from "@/components/public/ValidateTokenWrapper";
import "@/styles/globals.css";
import "@/styles/initialize.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <RecoilRootWrapper>
        <ValidateTokenWrapper>
          <HeadLayout />
          <ModalRenderWrapper>
            <Component {...pageProps} />
          </ModalRenderWrapper>
        </ValidateTokenWrapper>
      </RecoilRootWrapper>
    </ReactQueryProvider>
  );
}
