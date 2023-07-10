import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SongList from '../../SongList'
import CustomConnectButton from '../../CustomConnectButton'
import Title from './Title'
import Description from './Description'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import CoverPage from '../CoverPage'
import ConnectWalletPage from '../ConnectWalletPage'

const HomePage = () => {
  const { data: account } = useAccount()
  const titleControls = useAnimation()
  const descriptionControls = useAnimation()
  const connectControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await titleControls.start('show')
      await descriptionControls.start('show')
      await connectControls.start('show')
    }
    sequence()
  }, [titleControls, descriptionControls, connectControls])

  return (
    <>
      {!account && <ConnectWalletPage />}
      {account && <CoverPage />}
    </>
  )
}

export default HomePage
