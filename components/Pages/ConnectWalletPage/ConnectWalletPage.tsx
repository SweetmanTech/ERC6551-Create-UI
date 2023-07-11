import { useAccount } from 'wagmi'
import SongList from '../../SongList'
import CustomConnectButton from '../../CustomConnectButton'
import Title from './Title'
import Description from './Description'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from '@components/Navbar'

const ConnectWalletPage = () => {
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
    <div className="md:bg-[url('/images/landing_background.png')] bg-black bg-cover bg-center h-[100vh]">
      <Navbar />
      <div
        className={`md:pt-[175px] flex text-white flex-col justify-center items-center gap-11 md:gap-[50px] `}
      >
        <Title controls={titleControls} />
        <Description controls={descriptionControls} />
        <CustomConnectButton controls={connectControls} />
        {account && <SongList />}
      </div>
    </div>
  )
}

export default ConnectWalletPage
