import { useAccount, useSigner } from 'wagmi'
import CoverPage from '../CoverPage'
import ConnectWalletPage from '../ConnectWalletPage'

const HomePage = () => {
  const { data: signer } = useSigner()
  console.log('SWEETS ACCOUNT', signer)

  return <>{signer ? <CoverPage /> : <ConnectWalletPage />}</>
  // return <CoverPage />
}

export default HomePage
