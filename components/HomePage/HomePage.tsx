import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SongList from '../SongList'
import CustomConnectButton from '../CustomConnectButton'
import Title from './Title'
import Description from './Description'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

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
    <div className="md:pt-[200px] flex text-white flex-col justify-center items-center h-[100vh] gap-11 md:gap-[50px] bg-black md:bg-[url('/images/landing_background.png')] bg-cover bg-center">
      <Title controls={titleControls} />
      <Description controls={descriptionControls} />
      <CustomConnectButton controls={connectControls} />
      {account && <SongList />}
    </div>
  )
}

export default HomePage
