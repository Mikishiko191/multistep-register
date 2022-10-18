import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import { FormProvider } from '../context/form'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  )
}

export default MyApp
