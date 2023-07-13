import { useAccount, useWalletClient } from 'wagmi'
import CoverPage from '../CoverPage'
import ConnectWalletPage from '../ConnectWalletPage'

const HomePage = () => {
  const { data: signer } = useWalletClient()
  const { address } = useAccount()

  return <>{signer && address ? <CoverPage /> : <ConnectWalletPage />}</>
}

export default HomePage
