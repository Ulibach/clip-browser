import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import '../styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return(
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"/>
    <QueryClientProvider client={queryClient}>

          <ChakraProvider resetCSS theme={theme}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </ChakraProvider>
    </QueryClientProvider>
    </>
  )
}

export default MyApp
