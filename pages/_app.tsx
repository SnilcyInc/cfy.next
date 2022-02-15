import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetcher from '@/fetcher'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryCount: 0,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
