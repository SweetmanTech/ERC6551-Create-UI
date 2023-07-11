import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import 'styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import 'degen/styles'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from 'degen'
import { ToastContainer } from 'react-toastify'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
)

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
