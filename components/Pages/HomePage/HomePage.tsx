import { useAccount } from 'wagmi'
import CoverPage from '../CoverPage'
import ConnectWalletPage from '../ConnectWalletPage'

const HomePage = () => {
  const { data: account } = useAccount()
  console.log('SWEETS ACCOUNT', account)

  return <>{account ? <CoverPage /> : <ConnectWalletPage />}</>
  // return <CoverPage />
}

export default HomePage
