// глобальный макет
import React from 'react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

interface Props extends AppProps {
  Component: AppProps['Component'] & {
    // перерисов.ток.изменения
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

export default function App({ Component, pageProps }: Props) {
  // перерисов.ток.изменения
  // const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  // return <Component {...pageProps} />;
  // настр.для Next под TS
  return getLayout(<Component {...pageProps} />);
}
