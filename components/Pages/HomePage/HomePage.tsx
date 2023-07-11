import { useSigner } from 'wagmi'
import CoverPage from '../CoverPage'
import ConnectWalletPage from '../ConnectWalletPage'

const HomePage = () => {
  const { data: signer } = useSigner()
  return <>{signer ? <CoverPage /> : <ConnectWalletPage />}</>
}

export default HomePage
