import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import 'styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import 'degen/styles'

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, allChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from 'degen'
import { ToastContainer } from 'react-toastify'

const { chains, provider } = configureChains([...allChains], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_TITLE as string,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function App({ Component, pageProps }: any) {
  return (
    <ThemeProvider defaultMode="dark" defaultAccent="yellow">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: 'black',
            borderRadius: 'small',
          })}
        >
          <link
            href="https://fonts.cdnfonts.com/css/cerebri-sans"
            rel="stylesheet"
          ></link>
          <Component {...pageProps} />
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default App
